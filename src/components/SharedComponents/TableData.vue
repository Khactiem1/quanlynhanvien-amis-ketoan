<template>
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th>
          <!-- :checkbox="checkAllRecord" -->
          <input-checkbox
            :checked="checkAllRecord"
            @custom-handle-click-checkbox="handleClickCheckbox(true)"
          ></input-checkbox>
        </th>
        <th
          v-for="(item, index) in columns"
          :style="{
            'text-align': item.textAlign,
            'min-width': item.width,
            width: item.width,
          }"
          :key="index"
        >
          {{ item.header }}
        </th>
        <th style="width: 120px; min-width: 120px" class="text-center">
          Chức năng
        </th>
      </tr>
    </thead>
    <table-loader v-if="isShowLoaderTable" :columns="columns"></table-loader>
    <tbody v-if="!isShowLoaderTable">
      <!-- Vòng lặp các user -->
      <tr
        v-for="(row, index) in tableList"
        :class="{ active: row['Check'] }"
        :key="index"
      >
        <td>
          <!-- :checkbox="row.Check" -->
          <input-checkbox
            :checked="row.Check"
            @custom-handle-click-checkbox="handleClickCheckbox(index)"
          ></input-checkbox>
        </td>
        <!-- Vòng lặp các columns sao cho đúng với các vị trí của header -->
        <td
          v-for="(col, index) in columns"
          :style="{ 'text-align': col.textAlign }"
          :key="index"
          @dblclick="
            handleClickActionColumTable(
              actionTable.actionDefault,
              row[actionTable.fieldId]
            )
          "
        >
          <!-- khi render các trường kiểm tra xem có yêu cầu cần thêm dấu phẩy thì sẽ thêm  -->
          {{
            col.fractionSize === true
              ? Comma(row[col.field])
              : col.formatDate === true
              ? formatDateDDMMYYYY(row[col.field])
              : col.isGender === true
              ? formatGender(row[col.field])
              : row[col.field]
          }}
        </td>
        <td class="text-center">
          <div class="action-colum_table">
            <!-- Phần render action mặc định -->
            <button class="action-table action-table_left">
              <div
                class="action-default"
                @click="
                  handleCloseAction;
                  handleClickActionColumTable(
                    actionTable.actionDefault,
                    row[actionTable.fieldId]
                  );
                "
              >
                {{ actionTable.actionDefault }}
              </div>
            </button>
            <button
              @click="handleShowAction($event, row)"
              class="action-table action-table_right"
            >
              <div class="border-icon_table">
                <div class="action-icon"></div>
              </div>
            </button>
          </div>
        </td>
      </tr>
    </tbody>

    <teleport to="#app">
      <table-list-action
        :actionTable="actionTable"
        :positionAction="positionAction"
        :row="rowColumn"
        :handleCloseAction="handleCloseAction"
        :handleClickActionColumTable="handleClickActionColumTable"
      ></table-list-action>
    </teleport>
  </table>
</template>

<script>
import InputCheckbox from "../InputComponents/InputCheckbox.vue";
import TableLoader from "../SharedComponents/TableLoader.vue";
import TableListAction from "../SharedComponents/TableListAction.vue";
import eNum from "../../utils/eNum";
import utilEnum from "../../utils/index";
import { ref } from "vue";
export default {
  components: {
    InputCheckbox,
    TableLoader,
    TableListAction,
  },
  props: {
    tableList: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    checkAllRecord: {
      type: Boolean,
    },
    actionTable: {
      type: Object,
    },
    handleClickCheckbox: {
      type: Function,
    },
    handleClickActionColumTable: {
      type: Function,
    },
    isShowLoaderTable: {
      type: Boolean,
    },
  },
  setup() {
    const rowColumn = ref(null);
    const positionAction = ref({ top: 0, right: 0 });
    const { MALE, FEMALE, OTHER } = eNum;
    const { formatDateDDMMYYYY } = utilEnum;
    //(Khắc Tiềm - 15.09.2022) Hàm xử lý table với những cột cần thêm dấu phẩy vào đơn vị tiền tệ
    function Comma(number) {
      number = "" + number;
      if (number.length > 3) {
        var mod = number.length % 3;
        var output = mod > 0 ? number.substring(0, mod) : "";
        for (let i = 0; i < Math.floor(number.length / 3); i++) {
          if (mod == 0 && i == 0)
            output += number.substring(mod + 3 * i, mod + 3 * i + 3);
          else output += "," + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return output;
      } else return number;
    }
    //(Khắc Tiềm - 15.09.2022) hàm xử lý hiển thị giới tính dựa trên enum
    function formatGender(gender) {
      if(MALE == gender){
        return "Nam";
      }
      else if(FEMALE == gender){
        return "Nữ";
      }
      else if(OTHER == gender){
        return "Khác";
      }
    }
    //(Khắc Tiềm - 15.09.2022) Hàm xử lý ẩn hiện các action
    function handleShowAction(event, row) {
      if (JSON.stringify(rowColumn.value) === JSON.stringify(row)) {
        rowColumn.value = null;
      } else {
        if (JSON.stringify(rowColumn.value) !== JSON.stringify(row)) {
          setTimeout(() => {
            setPositionActionTable(event);
            rowColumn.value = row;
          }, 0);
        }
      }
    }
    //(Khắc Tiềm - 15.09.2022) Hàm xử lý ẩn action
    function handleCloseAction() {
      rowColumn.value = null;
    }
    //(Khắc Tiềm - 15.09.2022) Hàm xử lý vị trí ẩn hiện các action
    function setPositionActionTable(event) {
      event.path.forEach((item) => {
        try {
          if (item.className.includes("action-colum_table")) {
            const rect = item.getBoundingClientRect();
            positionAction.value.top = rect.top + window.scrollY + 32;
            positionAction.value.right =
              rect.right + window.scrollX - rect.left + window.scrollX - 55;
          }
        } catch {
          return;
        }
      });
    }
    return {
      rowColumn,
      formatDateDDMMYYYY,
      formatGender,
      positionAction,
      Comma,
      handleShowAction,
      handleCloseAction,
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  background-color: var(--while__color);
}
.table .thead-light th {
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  min-height: 34px;
  padding: 0 10px;
  height: 34px;
  position: sticky;
  top: 66px;
  background-color: #e5e8ec;
  text-transform: uppercase;
  vertical-align: middle;
  white-space: nowrap;
}
.table .thead-light th:last-child {
  border-right: none;
}
tbody tr:hover,
.table tbody tr:hover th:last-child,
.table tbody tr:hover th:first-child,
.table tbody tr:hover td:last-child,
.table tbody tr:hover td:first-child {
  background-color: #f2f9ff;
}
tbody tr.active,
.table tbody tr.active th:last-child,
.table tbody tr.active th:first-child,
.table tbody tr.active td:last-child,
.table tbody tr.active td:first-child {
  background-color: #e5f3ff;
}
.table tbody th,
.table tbody td {
  padding: 0 10px;
  min-height: 44px;
  height: 44px;
  border-right: 1px dotted #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
}
.table .thead-light th:last-child,
.table .thead-light th:first-child {
  background-color: #e5e8ec;
  z-index: 1;
}
.table .thead-light th:last-child,
.table tbody th:last-child,
.table tbody td:last-child {
  right: 16px !important;
}
.table .thead-light th:last-child::before,
.table tbody th:last-child::before,
.table tbody td:last-child::before {
  content: "";
  right: -16px;
  top: 0;
  width: 16px;
  height: 110%;
  position: absolute;
  background-color: var(--while__color);
}
.table .thead-light th:first-child,
.table tbody th:first-child,
.table tbody td:first-child {
  left: 16px;
}
.table .thead-light th:first-child::before,
.table tbody th:first-child::before,
.table tbody td:first-child::before {
  content: "";
  left: -16px;
  top: 0;
  width: 16px;
  height: 110%;
  position: absolute;
  background-color: var(--while__color);
}
.table .thead-light th:last-child,
.table .thead-light th:first-child,
.table tbody th:last-child,
.table tbody th:first-child,
.table tbody td:last-child,
.table tbody td:first-child {
  position: -webkit-sticky;
  position: sticky;
}
.table tbody th:last-child,
.table tbody th:first-child,
.table tbody td:last-child,
.table tbody td:first-child {
  background-color: aliceblue;
}
.table tbody td:last-child {
  border-right: none;
}
.table .thead-light th:first-child,
.table tbody th:first-child {
  width: 40px;
  max-width: 40px;
}
/* Nút bấm action */
.action-colum_table {
  display: flex;
  height: 36px;
  position: relative;
}
.action-table_left {
  padding: 6px 1px 6px 16px;
}
.action-table_right {
  padding: 8px 10px;
  width: 46px;
}
.action-table {
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
  z-index: 0;
}
.action-default {
  color: #0075c0;
  font-family: "notosans-bold";
  border: solid 1px transparent;
  line-height: 14px;
  position: relative;
  padding-left: 1px;
}
.action-default::before {
  content: "";
  height: 120%;
  position: absolute;
  width: 1px;
  background-color: var(--while__color);
  top: -1px;
  right: -3px;
  /* background-color: #000; */
}
.border-icon_table {
  border: solid 1px transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.action-icon {
  background: var(--url__icon) no-repeat -900px -365px;
  width: 8px;
  height: 5px;
  margin: 0 auto;
}
.action-table:active .border-icon_table,
.action-table:active .action-default {
  border: solid 1px #0075c0;
}
</style>

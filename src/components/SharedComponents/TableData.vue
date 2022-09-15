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
          :style="{ 'text-align': item.textAlign, 'width': item.width }"
          :key="index"
        >
          {{ item.header }}
        </th>
        <th style="width: 120px" class="text-center">Chức năng</th>
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
              ? formatDate(row[col.field])
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
                  handleCloseAction();
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
              @click="handleShowAction"
              class="action-table action-table_right"
            >
              <div class="border-icon_table">
                <div class="action-icon"></div>
              </div>
            </button>
            <div class="table-list_action">
              <!-- Phần render danh sách action ẩn -->
              <div
                v-for="(actionItem, index) in actionTable.actionList"
                :key="index"
                class="list_action-item"
                @click="
                  handleCloseAction();
                  handleClickActionColumTable(
                    actionItem,
                    row[actionTable.fieldId],
                    row[actionTable.fieldCode]
                  );
                "
              >
                {{ actionItem }}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import InputCheckbox from "../InputComponents/InputCheckbox.vue";
import TableLoader from "../SharedComponents/TableLoader.vue";
export default {
  components: {
    InputCheckbox,
    TableLoader,
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
    }
  },
  setup() {
    // Hàm xử lý table với những cột cần thêm dấu phẩy vào đơn vị tiền tệ
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
    function formatDate(date) {
      const d = new Date(date);
      return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join("/");
    }
    // Hàm xử lý ẩn hiện các action
    let elmClose = null;
    function handleShowAction(event) {
      event.path.forEach((item) => {
        try {
          if (item.className.includes("action-colum_table")) {
            if (item.className.includes("action-colum_table active")) {
              item.classList.remove("active");
              elmClose = null;
            } else {
              if (elmClose) {
                elmClose.classList.remove("active");
              }
              item.classList.add("active");
              elmClose = item;
            }
            return;
          }
        } catch {
          return;
        }
      });
    }
    // Hàm xử lý ẩn action
    function handleCloseAction() {
      if (elmClose) {
        elmClose.classList.remove("active");
      }
    }
    return {
      formatDate,
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
}
.table .thead-light th {
  border-right: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  min-height: 34px;
  padding: 0 10px;
  height: 34px;
  top: 0;
  background-color: #e5e8ec;
  text-transform: uppercase;
  vertical-align: middle;
  font-size: 12px;
  /* white-space: nowrap; */
}
.table .thead-light th:last-child {
  border-right: none;
}
tbody tr:hover {
  background-color: #f2f9ff;
}
tbody tr.active {
  background-color: #e5f3ff;
}
.table tbody th,
.table tbody td {
  padding: 0 10px;
  min-height: 44px;
  height: 44px;
  border-right: 1px dotted #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  /* white-space: nowrap; */
}
.table tbody td:last-child {
  border-right: none;
}
.table .thead-light th:first-child,
.table tbody th:first-child {
  width: 40px;
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
/* Phần action ẩn */
.table-list_action {
  position: absolute;
  border: solid 1px var(--border__input);
  background-color: var(--while__color);
  border-radius: 2px;
  padding: 5px 0;
  top: 0;
  right: 5px;
  top: 110%;
  opacity: 0;
  visibility: hidden;
  z-index: 5;
  transition: all ease 0.15s;
}
.action-colum_table.active .table-list_action {
  opacity: 1;
  visibility: visible;
  top: 90%;
}
.list_action-item {
  white-space: nowrap;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  transition: all ease 0.15s;
  color: inherit;
}
.list_action-item:hover {
  background-color: #f5f5f5;
  color: var(--primary__color);
}
</style>

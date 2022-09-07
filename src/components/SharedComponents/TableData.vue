<template>
  <table class="table">
    <thead class="thead-light">
      <tr>
        <th>
          <input-checkbox
            @custom-handle-click-ckeckbox="handleClickCheckbox(true)"
            :checkbox="checkAllRecord"
          ></input-checkbox>
        </th>
        <!-- :style="{'width': item.width}" -->
        <th v-for="(item, index) in columns" :key="index">
          {{ item.header }}
        </th>
        <th style="width: 120px" class="text-center">Chức năng</th>
      </tr>
    </thead>
    <tbody>
      <!-- Vòng lặp các user -->
      <tr v-for="(row, index) in userList" :key="index">
        <td>
          <input-checkbox
            @custom-handle-click-ckeckbox="handleClickCheckbox(index)"
            :checkbox="row.Check"
          ></input-checkbox>
        </td>
        <!-- Vòng lặp các columns sao cho đúng với các vị trí của header -->
        <td v-for="(col, index) in columns" :key="index">
          {{ row[col.field] }}
        </td>
        <td class="text-center">
          <div class="action-colum_table">
            <button class="action-table action-table_left">
              <div class="action-default">{{ actionDefault }}</div>
            </button>
            <button @click="showAction" class="action-table action-table_right">
              <div class="border-icon_table">
                <div class="action-icon"></div>
              </div>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import InputCheckbox from "../InputComponents/InputCheckbox.vue";
import { useStore } from "vuex";
export default {
  components: {
    InputCheckbox,
  },
  props: {
    userList: {
      type: Array,
    },
    columns: {
      type: Array,
    },
    checkAllRecord: {
      type: Boolean,
    },
    actionDefault: {
      type: String,
    },
    handleClickCheckbox: {
      type: Function,
    },
  },
  setup() {
    const store = useStore();
    function showAction(event) {
      event.path.forEach((item) => {
        if (item.className === "action-colum_table") {
          store.dispatch("config/setPositionActionTableAction", {
            top: item.getBoundingClientRect().top,
            right: item.getBoundingClientRect().right,
            heightElement: item.clientHeight,
          });
          return;
        }
      });
    }

    return {
      showAction,
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
  white-space: nowrap;
}
.table .thead-light th:last-child {
  border-right: none;
}
tbody tr:hover {
  background-color: #f2f9ff;
}
.table tbody th,
.table tbody td {
  padding: 0 10px;
  min-height: 44px;
  height: 44px;
  border-right: 1px dotted #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  white-space: nowrap;
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
  background: url("../../../public/asset/logo/Sprites.64af8f61.svg") no-repeat -900px -365px;
  width: 8px;
  height: 5px;
  margin: 0 auto;
}
.action-table:active .border-icon_table,
.action-table:active .action-default {
  border: solid 1px #0075c0;
}
</style>

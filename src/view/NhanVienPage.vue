<template>
  <div class="container-table">
    <div class="container-table_header">
      <div class="name-table">
        <h1>Nhân viên</h1>
      </div>
      <div class="action-table">
        <button class="btn btn-success btn-add">Thêm một nhân viên</button>
      </div>
    </div>
    <div class="table-content">
      <div class="table-function">
        <div class="table-function_search">
          <div class="search-table">
            <input
              class="input input-table_search"
              type="text"
              placeholder="Tìm theo mã, tên nhân viên"
            />
            <div class="icon-search"></div>
          </div>
          <div class="reload-table"></div>
        </div>
      </div>
      <div class="table-container">
        <!-- Table -->
        <table-data
          :userList="userList"
          :checkAllRecord="checkAllRecord"
          :columns="columns"
          :handleClickCheckbox="handleClickCheckbox"
          :actionDefault="actionDefault"
        >
        </table-data>
        <!-- các action table ở đây đưa ra thẻ có id là app-->
        <teleport to="#app">
          <action-table :actionList="actionList"></action-table>
        </teleport>
        <!-- End Table -->
      </div>
      <div class="paging-container">
        <div class="total-record">Tổng số: <strong>1</strong> bản ghi</div>
        <div class="paging">
          <!-- Thêm 'active' là sẽ chạy -->
          <div class="combobox-select">
            <input
              class="input disabled-input"
              disabled
              value="20 bản ghi trên 1 trang"
              type="text"
            />
            <div class="combobox-select_icon">
              <div class="select_icon-combobox"></div>
            </div>
            <div class="combobox-combobox_select">
              <div class="combobox-combobox_item">20 bản ghi trên 1 trang</div>
              <div class="combobox-combobox_item active">
                30 bản ghi trên 1 trang
              </div>
              <div class="combobox-combobox_item">40 bản ghi trên 1 trang</div>
            </div>
          </div>
          <div class="show-paging">
            <div class="show-paging_item disabled">Trước</div>
            <div class="show-paging_item show-paging_text active">1</div>
            <div class="show-paging_item show-paging_text">2</div>
            <div class="show-paging_item show-paging_text">...</div>
            <div class="show-paging_item show-paging_text">52</div>
            <div class="show-paging_item">Sau</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableData from "../components/SharedComponents/TableData.vue";
import ActionTable from "../components/SharedComponents/ActionTable.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TableData,
    ActionTable,
  },
  setup() {
    const store = useStore();
    const userList = computed(() => store.state.user.userList); //Lấy danh sách ng dùng
    const columns = computed(() => store.state.user.columns); //Lấy danh sách columns hiển thị
    const actionDefault = computed(() => store.state.user.actionTable.actionDefault); //Lấy chức năng table hiển thị mặc định
    const actionList = computed(() => store.state.user.actionTable.actionList); //Lấy danh sách chức năng table hiển thị ẩn
    const checkAllRecord = computed(() => store.state.user.CheckAll); //Lấy danh sách ng dùng
    //Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
    function handleClickCheckbox(value) {
      if (value === true) {
        store.dispatch("user/setAllCheckboxUserAction");
      } else {
        store.dispatch("user/setCheckboxUserAction", value);
      }
    }
    return {
      userList,
      columns,
      checkAllRecord,
      actionDefault,
      actionList,
      handleClickCheckbox,
    };
  },
};
</script>

<style scoped>
/* Phần về table
 ------------------- 
*/
/* Phần header table */
.container-table {
  padding: 0 16px;
}
.container-table_header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
/* Phần table */
.table-content {
  background-color: var(--while__color);
  padding: 0 16px;
  margin-bottom: 16px;
  overflow-y: hidden;
  overflow-x: auto;
}
.table-function {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 0;
}
/* Phần search */
.search-table {
  position: relative;
}
.icon-search {
  background: url("../../public/asset/logo/Sprites.64af8f61.svg") no-repeat;
  background-position: -992px -360px;
  width: 16px;
  height: 16px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.reload-table {
  background: url("../../public/asset/logo/Sprites.64af8f61.svg") no-repeat;
  background-position: -423px -201px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 12px;
  position: relative;
}
.reload-table::before {
  display: none;
  content: "Lấy lại dữ liệu";
  width: 80px;
  position: absolute;
  left: -52px;
  background-color: var(--menu__color);
  color: var(--text__while-color);
  text-align: center;
  padding: 6px 6px;
  border-radius: 3px;
  top: 120%;
  font-size: 12px;
}
.reload-table:hover:before {
  display: block;
}
.reload-table:hover {
  background-position: -1097px -88px;
}
.table-function_search {
  display: flex;
  align-items: center;
}
.input.input-table_search {
  padding-left: 10px;
  padding-right: 2.75rem;
}

/* Phần phân trang */
.paging-container {
  margin-right: 35px;
}
.paging {
  display: flex;
  align-items: center;
  justify-content: center;
}
.paging-container {
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.show-paging {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
}
.show-paging_item {
  cursor: pointer;
}
.show-paging_item.disabled {
  color: #9e9e9e;
  cursor: context-menu;
}
.show-paging_text {
  margin: 0 6px;
}
.show-paging_text.active {
  border: solid 1px var(--border__input);
  padding: 0 0.5rem;
  font-weight: bold;
}
.show-paging_item:last-child {
  margin-left: 6px;
}
.show-paging_item:first-child {
  margin-right: 6px;
}
</style>

<template>
  <div class="container-table">
    <div class="container-table_header">
      <div class="name-table">
        <h1>Nhân viên</h1>
      </div>
      <div class="action-table">
        <button @click="handleOpenModal()" class="btn btn-success btn-add">
          Thêm một nhân viên
        </button>
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
          <div @click="loadData" class="reload-table"></div>
        </div>
      </div>
      <div class="table-container">
        <!-- Table -->
        <table-data
          :tableList="userList"
          :checkAllRecord="checkAllRecord"
          :handleClickCheckbox="handleClickCheckbox"
          :columns="columns"
          :actionTable="actionTable"
          :handleClickActionColumTable="handleClickActionColumTable"
        >
        </table-data>
        <!-- End Table -->
      </div>
      <div class="paging-container">
        <div class="total-record">
          Tổng số: <strong>{{ userList.length }}</strong> bản ghi
        </div>
        <div class="paging">
          <!-- Thêm 'active' là sẽ chạy -->
          <input-combobox
            :options="[
              { value: 10, header: '10 bản ghi trên 1 trang' },
              { value: 20, header: '20 bản ghi trên 1 trang' },
              { value: 30, header: '30 bản ghi trên 1 trang' },
              { value: 50, header: '50 bản ghi trên 1 trang' },
              { value: 100, header: '100 bản ghi trên 1 trang' },
            ]"
            :value="'value'"
            :header="'header'"
            v-model="recordPage"
          ></input-combobox>
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
    <!-- Đưa modal ra nằm trong thẻ #app -->
    <teleport to="#app">
      <modal-form v-if="isShowModal" :class="{ active: isShowModalAnimation }">
        <form-user
          @handle-click-close-modal="handleCloseModal"
          :userEdit="userEdit"
        ></form-user>
      </modal-form>
      <modal-notification v-if="isShowNotification">
        <notification-wanning
          :cancelAction="cancelAction"
          :agreeAction="agreeAction"
          :messageAction="messageAction"
        ></notification-wanning>
      </modal-notification>
    </teleport>
  </div>
</template>

<script>
import TableData from "../components/SharedComponents/TableData.vue";
import ModalNotification from "../components/SharedComponents/ModalNotification.vue";
import NotificationWanning from "../components/SharedComponents/NotificationWanning.vue";
import ModalForm from "../components/EmployeeComponents/ModalForm.vue";
import FormUser from "../components/EmployeeComponents/FormUser.vue";
import InputCombobox from "../components/InputComponents/InputCombobox.vue";
import { computed, ref, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import actionTableStore from "../utils/actionTable";
import notification from "../utils/notification";
export default {
  components: {
    TableData,
    ModalForm,
    InputCombobox,
    FormUser,
    ModalNotification,
    NotificationWanning,
  },
  setup() {
    const { EDIT, DELETE } = actionTableStore;
    const { WANNING_DELETE } = notification;
    const store = useStore();
    const userList = computed(() => store.state.user.userList); //Lấy danh sách ng dùng
    const columns = computed(() => store.state.user.columns); //Lấy danh sách columns hiển thị
    const checkAllRecord = computed(() => store.state.user.CheckAll); //Lấy ra biến check all những ng dùng đc click
    const actionTable = computed(() => store.state.user.actionTable); //Lấy danh sách các chức năng
    const isShowModal = ref(false);
    const isShowModalAnimation = ref(false);
    const recordPage = ref(20);
    const cancelAction = ref({}); // hành động đóng notification
    const agreeAction = ref({}); // hành hoàn tác và đóng notification
    const messageAction = ref({}); // Thông báo hiển thị lên notification
    const userEdit = ref(null); // Chứa thông tin người cần sửa
    const isShowNotification = ref(false); // biến kích hoạt đóng mở thông báo
    watch(recordPage, (newValue) => {
      console.log("Loading: " + newValue);
    });
    async function loadData() {
      console.log('loading');
      await store.dispatch("user/getUserListAction");
      console.log('end load');
    }
    onBeforeMount(()=>{
      loadData();
    })
    // Hàm xử lý đóng mở thông báo
    function handleToggleNotification() {
      isShowNotification.value = !isShowNotification.value;
    }
    // Hàm xử lý xoá một bản ghi
    async function deleteUser(id) {
      handleToggleNotification();
      //Loading
      store.dispatch("config/setToggleShowLoaderAction");
      await store.dispatch("user/deleteUserAction", id);
      store.dispatch("config/setToggleShowLoaderAction");
      //End Loading
    }
    //Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
    async function handleClickActionColumTable(
      action,
      employeeId,
      employeeCode
    ) {
      if (action == EDIT) {
        store.dispatch("config/setToggleShowLoaderAction");
        userEdit.value = await store.dispatch("user/getUserAction", employeeId);
        store.dispatch("config/setToggleShowLoaderAction");
        isShowModal.value = !isShowModal.value;
        // Khi mounted modal xong thì mới thêm class active để có hiệu ứng đẹp
        setTimeout(() => {
          isShowModalAnimation.value = !isShowModalAnimation.value;
        }, 0);
      } else if (action == DELETE) {
        cancelAction.value = {
          display: "Không",
          action: handleToggleNotification,
        };
        agreeAction.value = {
          display: "Có",
          action: deleteUser,
        };
        messageAction.value = {
          display: WANNING_DELETE + `<${employeeCode}>`,
          id: employeeId,
        };
        handleToggleNotification();
      }
    }
    //Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
    function handleClickCheckbox(value) {
      if (value === true) {
        store.dispatch("user/setAllCheckboxUserAction");
      } else {
        store.dispatch("user/setCheckboxUserAction", value);
      }
    }
    //Hàm xử lý mở modal với state là trạng thái thêm hay sửa
    function handleOpenModal() {
      if (userEdit.value) {
        userEdit.value = null; // Nếu tồn tại user cần sửa thì sẽ xoá user cần sửa đi khi mở chức năng thêm
      }
      isShowModal.value = !isShowModal.value;
      // Khi mounted modal xong thì mới thêm class active để có hiệu ứng đẹp
      setTimeout(() => {
        isShowModalAnimation.value = !isShowModalAnimation.value;
      }, 0);
    }
    //Hàm xử lý đóng modal
    function handleCloseModal() {
      isShowModalAnimation.value = !isShowModalAnimation.value;
      isShowModal.value = !isShowModal.value;
    }
    return {
      userList,
      columns,
      checkAllRecord,
      actionTable,
      isShowModal,
      isShowModalAnimation,
      recordPage,
      userEdit,
      cancelAction,
      agreeAction,
      isShowNotification,
      messageAction,
      handleOpenModal,
      handleClickCheckbox,
      handleCloseModal,
      handleClickActionColumTable,
      loadData,
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
  background: var(--url__icon) no-repeat;
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
  background: var(--url__icon) no-repeat;
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

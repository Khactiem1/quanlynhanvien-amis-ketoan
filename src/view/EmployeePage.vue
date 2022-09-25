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
      <div class="table-function sticky">
        <div class="table-function_series">
          <button
            v-if="checkShowActionSeries.length > 0"
            @click="handleDeleteAll"
            class="btn"
          >
            Xoá hàng loạt
          </button>
        </div>
        <div class="table-function_search">
          <div class="search-table">
            <input
              class="input input-table_search"
              type="text"
              @input="handleSearchData"
              placeholder="Tìm theo mã, tên nhân viên"
            />
            <div class="icon-search"></div>
          </div>
          <div @click="loadData" class="action-render_table reload-table"></div>
          <div
            @click="handleShowSettingTable"
            class="action-render_table setting-table"
          ></div>
        </div>
      </div>
      <div class="table-scroll">
        <div class="table-container">
          <!-- Table -->
          <table-data
            :tableList="userList"
            :checkAllRecord="
              checkShowActionSeries.length === userList.length &&
              checkShowActionSeries.length > 0
            "
            :handleClickCheckbox="handleClickCheckbox"
            :columns="columns"
            :actionTable="actionTable"
            :handleClickActionColumTable="handleClickActionColumTable"
            :isShowLoaderTable="isShowLoaderTable"
          >
          </table-data>
          <!-- End Table -->
        </div>
      </div>
      <div class="paging-container sticky">
        <div class="total-record">
          Tổng số: <strong>{{ totalCount }}</strong> bản ghi
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
            v-model="countRecordPageUser"
          ></input-combobox>
          <paging-page
            :totalCount="totalCount"
            :countRecordPageUser="countRecordPageUser"
            v-model="recordSelectPaging"
          ></paging-page>
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
      <setting-table
        v-if="isShowSettingTable"
        :columns="columnSetting"
        :handleShowSettingTable="handleShowSettingTable"
        :class="{ active: isShowSettingTableAnimation }"
        :handleClickCheckbox="handleClickToggleSettingTable"
      ></setting-table>
    </teleport>
  </div>
</template>

<script>
import TableData from "../components/SharedComponents/TableData.vue";
import ModalNotification from "../components/SharedComponents/ModalNotification.vue";
import NotificationWanning from "../components/SharedComponents/NotificationWanning.vue";
import PagingPage from "../components/SharedComponents/PagingPage.vue";
import SettingTable from "../components/SharedComponents/SettingTable.vue";
import ModalForm from "../components/EmployeeComponents/ModalForm.vue";
import FormUser from "../components/EmployeeComponents/FormUser.vue";
import InputCombobox from "../components/InputComponents/InputCombobox.vue";
import { computed, ref, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";
import actionTableStore from "../utils/actionTable";
import notification from "../utils/notification";
import index from "../utils/index";
export default {
  components: {
    TableData,
    ModalForm,
    InputCombobox,
    FormUser,
    ModalNotification,
    NotificationWanning,
    SettingTable,
    PagingPage,
  },
  setup() {
    /**
     * hàm lấy và lưu số lượng bản ghi của page
     * Khắc Tiềm - 15.09.2022
     */
    const { getCountRecordPageUser, setCountRecordPageUser } = index;

    /**
     * Các hành động của table
     * Khắc Tiềm - 15.09.2022
     */
    const { EDIT, DELETE } = actionTableStore;

    /**
     * Các thông báo của cảnh báo khi xoá bản ghi
     * Khắc Tiềm - 15.09.2022
     */
    const { WANNING_DELETE, WANNING_DELETE_ALL } = notification;

    /**
     * Sử dụng store của vuex
     * Khắc Tiềm - 15.09.2022
     */
    const store = useStore();

    /**
     * Lấy danh sách ng dùng
     * Khắc Tiềm - 15.09.2022
     */
    const userList = computed(() => store.state.user.userList);

    /**
     * Lấy ra tổng số lượng bản ghi
     * Khắc Tiềm - 15.09.2022
     */
    const totalCount = computed(() => store.state.user.totalCount);

    /**
     * Lấy danh sách ng dùng được check để thực hiện chức năng như xoá hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    const checkShowActionSeries = computed(() =>
      userList.value.filter((value) => value.Check).map((value) => value.id)
    );

    /**
     * Lấy danh sách columns hiển thị, lọc ra cái cần được hiển thị
     * Khắc Tiềm - 15.09.2022
     */
    const columns = computed(() =>
      store.state.user.columns.filter(function (value) {
        return value.isShow;
      })
    );

    /**
     * Lấy danh sách columns hiển thị cài đặt
     * Khắc Tiềm - 15.09.2022
     */
    const columnSetting = computed(() => store.state.user.columns);

    /**
     * Lấy danh sách các chức năng
     * Khắc Tiềm - 15.09.2022
     */
    const actionTable = computed(() => store.state.user.actionTable);

    /**
     * hành động đóng notification
     * Khắc Tiềm - 15.09.2022
     */
    const cancelAction = ref({});

    /**
     * hành hoàn tác và đóng notification
     * Khắc Tiềm - 15.09.2022
     */
    const agreeAction = ref({});

    /**
     * Thông báo hiển thị lên notification
     * Khắc Tiềm - 15.09.2022
     */
    const messageAction = ref({});

    /**
     * Chứa thông tin người cần sửa
     * Khắc Tiềm - 15.09.2022
     */
    const userEdit = ref(null);

    /**
     * Biến trạng thái ẩn hiện modal thêm sửa
     * Khắc Tiềm - 15.09.2022
     */
    const isShowModal = ref(false);

    /**
     * Biến trạng thái khi mounted modal có hiệu ứng hiện từ từ
     * Khắc Tiềm - 15.09.2022
     */
    const isShowModalAnimation = ref(false);

    /**
     * biến kích hoạt đóng mở thông báo
     * Khắc Tiềm - 15.09.2022
     */
    const isShowNotification = ref(false);

    /**
     * Biến chứa trạng thái ẩn hiện loader table
     * Khắc Tiềm - 15.09.2022
     */
    const isShowLoaderTable = ref(false);

    /**
     * Biến chứa trạng thái ẩn hiện setting table
     * Khắc Tiềm - 15.09.2022
     */
    const isShowSettingTable = ref(false);

    /**
     * Biến chứa trạng thái ẩn hiện setting table
     * Khắc Tiềm - 15.09.2022
     */
    const isShowSettingTableAnimation = ref(false);

    /**
     * lấy ra số lượng bản ghi của page
     * Khắc Tiềm - 15.09.2022
     */
    const countRecordPageUser = ref(getCountRecordPageUser());

    /**
     * biến theo dõi số bản ghi muốn lấy chuyển trang mặc định lấy từ bản ghi số 0
     * Khắc Tiềm - 15.09.2022
     */
    const recordSelectPaging = ref(0);

    /**
     * Kiểm tra sự thay đổi của biến số lượng bản ghi trên 1 trang và thực hiện reload lại dữ liệu đúng số lượng
     * Khắc Tiềm - 15.09.2022
     */
    watch(countRecordPageUser, (newValue) => {
      setCountRecordPageUser(newValue);
      console.log(
        "Load lấy bản ghi bắt đầu từ bản ghi số: " +
          newValue +
          " và lấy " +
          countRecordPageUser.value +
          " bản ghi"
      );
      loadData();
    });

    /**
     * Kiểm tra lấy số trang dữ liệu nếu có sự thay đỔi số trag sẽ call api lấy dữ liệu
     * Khắc Tiềm - 15.09.2022
     */
    watch(recordSelectPaging, (newValue) => {
      console.log(
        "Load lấy bản ghi bắt đầu từ bản ghi số: " +
          newValue +
          " và lấy " +
          countRecordPageUser.value +
          " bản ghi"
      );
      loadData();
    });

    /**
     * Hàm Load danh sách người dùng
     * Khắc Tiềm - 15.09.2022
     */
    async function loadData() {
      //Kích hoạt hiệu ứng loader table
      isShowLoaderTable.value = true;
      await store.dispatch("user/getUserListAction");
      //Dừng hiệu ứng loader table
      isShowLoaderTable.value = false;
    }

    /**
     * Trước khi mounted sẽ load dữ liệu 1 lần
     * Khắc Tiềm - 15.09.2022
     */
    onBeforeMount(() => {
      loadData();
    });

    /**
     * Hàm xử lý xoá toàn bộ user
     * Khắc Tiềm - 15.09.2022
     */
    function DeleteAll() {
      console.log("Đây là những thằng sẽ bị xoá hehe");
      console.log(checkShowActionSeries.value);
      handleToggleNotification();
      console.log(
        "chưa xoá đâu khi nào có api 1 lần xoá cho tiện chứ giờ xoá k tiện hehe"
      );
    }

    /**
     *Hàm xử lý hỏi xoá hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    function handleDeleteAll() {
      cancelAction.value = {
        display: "Không",
        action: handleToggleNotification,
      };
      agreeAction.value = {
        display: "Có",
        action: DeleteAll,
      };
      messageAction.value = {
        display: WANNING_DELETE_ALL,
      };
      handleToggleNotification();
    }

    /**
     * Hàm xử lý đóng mở setting table
     * Khắc Tiềm - 15.09.2022
     */
    function handleShowSettingTable() {
      if (isShowSettingTable.value === false) {
        isShowSettingTable.value = true;
        setTimeout(() => {
          isShowSettingTableAnimation.value = true;
        }, 0);
      } else {
        isShowSettingTableAnimation.value = false;
        setTimeout(() => {
          isShowSettingTable.value = false;
        }, 150);
      }
    }

    /**
     * Hàm xử lý toggle hiển thị các trường dữ liệu của bảng
     * Tham số đầu vào là vị trí cột cần ẩn hiện
     * Khắc Tiềm - 15.09.2022
     */
    function handleClickToggleSettingTable(fieldIndex) {
      store.dispatch("user/setToggleShowColumnTableAction", fieldIndex);
    }

    /**
     * Hàm xử lý đóng mở thông báo
     * Khắc Tiềm - 15.09.2022
     */
    function handleToggleNotification() {
      isShowNotification.value = !isShowNotification.value;
    }

    /**
     * Hàm xử lý xoá một bản ghi
     * Tham số đầu vào là ID bản ghi cần xoá
     * Khắc Tiềm - 15.09.2022
     */
    async function deleteUser(id) {
      handleToggleNotification();
      //Loading
      store.dispatch("config/setToggleShowLoaderAction");
      await store.dispatch("user/deleteUserAction", id);
      store.dispatch("config/setToggleShowLoaderAction");
      //End Loading
    }

    /**
     * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
     * Tham số đầu vào là
     * action: Hành động VD: Nhân bản, sửa, xoá
     * employeeId: ID record sẽ thay đổi dữ liệu sau khi thực hiện record
     * employeeCode: Mã nhân viên
     * Khắc Tiềm - 15.09.2022
     */
    async function handleClickActionColumTable(
      action,
      employeeId,
      employeeCode
    ) {
      if (action == EDIT) {
        store.dispatch("config/setToggleShowLoaderAction");
        userEdit.value = await store.dispatch("user/getUserAction", employeeId);
        store.dispatch("config/setToggleShowLoaderAction");
        handleOpenModal(userEdit.value);
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

    /**
     * Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
     * Tham số đầu vào là vị trí record cần check true là check tất cả
     * Khắc Tiềm - 15.09.2022
     */
    function handleClickCheckbox(value) {
      if (value === true) {
        store.dispatch("user/setAllCheckboxUserAction");
      } else {
        store.dispatch("user/setCheckboxUserAction", value);
      }
    }

    /**
     * Hàm xử lý tìm kiếm dữ liệu
     * Tham số đầu vào là event để lấy giá trị nhập
     * Khắc Tiềm - 15.09.2022
     */
    async function handleSearchData(event) {
      setTimeout(() => {
        console.log(
          "Key tìm kiếm: " +
            event.target.value +
            ", Khi nào có api sẽ call api tìm kiếm sau"
        );
        loadData();
      }, 200);
    }

    /**
     * Hàm xử lý mở modal với state là trạng thái thêm hay sửa
     * Tham số đầu vào nếu không có user thì sẽ set userEdit = null để mở modal thêm và ngược lại
     * Khắc Tiềm - 15.09.2022
     */
    function handleOpenModal(user) {
      if (!user) {
        // Nếu tồn tại user cần sửa thì sẽ xoá user cần sửa đi khi mở chức năng thêm
        userEdit.value = null;
      }
      // Khi mounted modal xong thì mới thêm class active để có hiệu ứng đẹp
      isShowModal.value = !isShowModal.value;
      setTimeout(() => {
        isShowModalAnimation.value = !isShowModalAnimation.value;
      }, 0);
    }

    /**
     * Hàm xử lý đóng modal
     * Khắc Tiềm - 15.09.2022
     */
    function handleCloseModal() {
      isShowModalAnimation.value = !isShowModalAnimation.value;
      isShowModal.value = !isShowModal.value;
    }
    return {
      userList,
      totalCount,
      columns,
      actionTable,
      isShowModal,
      isShowModalAnimation,
      countRecordPageUser,
      userEdit,
      cancelAction,
      agreeAction,
      isShowNotification,
      columnSetting,
      messageAction,
      isShowLoaderTable,
      isShowSettingTable,
      recordSelectPaging,
      isShowSettingTableAnimation,
      checkShowActionSeries,
      handleShowSettingTable,
      handleDeleteAll,
      handleClickToggleSettingTable,
      handleOpenModal,
      handleClickCheckbox,
      handleCloseModal,
      handleClickActionColumTable,
      handleSearchData,
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

::-webkit-scrollbar-track {
  border-radius: 0;
  background: #eeeeee;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #b0b0b0;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 0;
  background: #808080;
}
::-webkit-scrollbar {
  height: 10px; /* height of horizontal scrollbar ← You're missing this */
  width: 8px;
  border: 1px solid #d5d5d5;
}
.container-table {
  padding: 0 16px 16px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.table-scroll {
  padding: 0 16px;
  background-color: var(--while__color);
}
.container-table_header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
/* Phần table */
.table-content {
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  flex-grow: 1;
}
.table-scroll {
  display: table;
  table-layout: fixed;
  width: 100%;
}
.table-container {
  display: table-cell;
  width: 100%;
}

.table-function {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px;
  z-index: 5;
  height: 66px;
  background-color: var(--while__color);
}
.table-container {
  background-color: var(--while__color);
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
.action-render_table {
  background: var(--url__icon) no-repeat;
  cursor: pointer;
  margin-left: 12px;
  position: relative;
}
.action-render_table::before {
  display: none;
  position: absolute;
  background-color: var(--menu__color);
  color: var(--text__while-color);
  text-align: center;
  padding: 6px 6px;
  border-radius: 3px;
  top: 120%;
  font-size: 12px;
}
.action-render_table:hover:before {
  display: block;
}
.reload-table:hover {
  background-position: -1097px -88px;
}
.reload-table {
  background-position: -423px -201px;
  width: 24px;
  height: 24px;
}
.reload-table::before {
  content: "Lấy lại dữ liệu";
  width: 80px;
  left: -40px;
}
.setting-table:hover {
  background-position: -88px -256px;
}
.setting-table {
  background-position: -88px -200px;
  width: 24px;
  height: 24px;
}
.setting-table::before {
  content: "Tuỳ chỉnh giao diện";
  width: 110px;
  left: -98px;
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
.paging {
  display: flex;
  align-items: center;
  justify-content: center;
}
.paging-container {
  padding: 12px 51px 12px 16px;
  background-color: var(--while__color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

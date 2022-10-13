<template>
  <div class="container-table">
    <div class="container-table_header">
      <div class="name-table">
        <h1>Nhân viên</h1>
      </div>
      <div class="action-table">
        <button @click="handleOpenModal(true)" class="btn btn-success btn-add">
          Thêm một nhân viên
        </button>
      </div>
    </div>
    <div class="table-content">
      <div class="table-function sticky">
        <div
          ref="templateActionAll"
          @click="handleToggleActionAll"
          class="table-function_series"
        >
          <span>Thực hiện hàng loạt</span>
          <div class="table-function_series-icon"></div>
          <div
            v-show="showActionAll && checkShowActionSeries.length > 0"
            class="table-list_action"
          >
            <div class="list_action-item" @click="handleDeleteAll()">Xoá</div>
          </div>
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
          <div
            @click="
              loadData({
                offset: recordSelectPaging,
                limit: countRecordPageEmployee,
                keyword: keyword,
              })
            "
            class="action-render_table reload-table"
          ></div>
          <a target="_blank" :href="configs.baseUrl + '/Employees/export_data?keyword=' + keyword" class="action-render_table export-data"></a>
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
            :tableList="employeeList"
            :checkAllRecord="
              checkShowActionSeries.length === employeeList.length &&
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
      <div v-if="employeeList.length !== 0" class="paging-container sticky">
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
            :disabled="true"
            :value="'value'"
            :header="'header'"
            :noAnimation="true"
            v-model="countRecordPageEmployee"
          ></input-combobox>
          <paging-page
            :totalCount="totalCount"
            :countRecordPageEmployee="countRecordPageEmployee"
            v-model="recordSelectPaging"
            :key="countRecordPageEmployee || keyword"
          ></paging-page>
        </div>
      </div>
    </div>
    <!-- Đưa modal ra nằm trong thẻ #app -->
    <teleport to="#app">
      <modal-form v-if="isShowModal">
        <form-employee
          @handle-click-close-modal="handleCloseModal"
          :employeeEdit="employeeEdit"
          :employeeAdd="employeeAdd"
        ></form-employee>
      </modal-form>
      <modal-notification v-if="isShowNotification">
        <notification-wanning
          :cancelAction="cancelAction"
          :agreeAction="agreeAction"
          :messageAction="messageAction"
        ></notification-wanning>
      </modal-notification>
      <modal-notification v-if="isShowNotificationError">
        <notification-error
          :agreeAction="agreeAction"
          :messageAction="messageAction"
        ></notification-error>
      </modal-notification>
      <setting-table
        v-if="isShowSettingTable"
        :columns="columnSetting"
        :handleShowSettingTable="handleShowSettingTable"
        :handleClickCheckbox="handleClickToggleSettingTable"
      ></setting-table>
    </teleport>
  </div>
</template>

<script>
import TableData from "../../components/TableComponents/BaseTable.vue";
import ModalNotification from "../../components/NotificationComponent/NotificationModal.vue";
import NotificationWanning from "../../components/NotificationComponent/NotificationWanning.vue";
import NotificationError from "../../components/NotificationComponent/NotificationError.vue";
import PagingPage from "../../components/TableComponents/BasePaging.vue";
import SettingTable from "../../components/TableComponents/BaseSetting.vue";
import ModalForm from "./ModalForm.vue";
import FormEmployee from "./FormEmployee.vue";
import InputCombobox from "../../components/InputComponents/BaseCombobox.vue";
import { computed, ref, watch, onBeforeMount, onUnmounted, onMounted} from "vue";
import { useStore } from "vuex";
import actionTableStore from "../../utils/actionTable";
import notification from "../../utils/notification";
import index from "../../utils/index";
import configs from "../../configs/index";
import eNum from "../../utils/eNum.js";
import {
  getEmployeeApi,
  deleteEmployeeApi,
  deleteMultipleApi,
  nextValue,
} from "../../api/employee";
export default {
  components: {
    TableData,
    ModalForm,
    InputCombobox,
    FormEmployee,
    ModalNotification,
    NotificationWanning,
    SettingTable,
    PagingPage,
    NotificationError,
  },
  setup() {
    /**
     * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
     * NK Tiềm 28/10/2022
     */
    const { CTRL, ALT, A, TypeSuccess, TypeError, MessageErrorInternet, MessageSuccessDelete } = eNum;
    
    /**
     * hàm lấy và lưu số lượng bản ghi của page
     * Khắc Tiềm - 15.09.2022
     */
    const { getCountRecordPageEmployee, setCountRecordPageEmployee } = index;

    /**
     * Các hành động của table
     * Khắc Tiềm - 15.09.2022
     */
    const { EDIT, DELETE, REPLICATION } = actionTableStore;

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
    const employeeList = computed(() => store.state.employee.employeeList);

    /**
     * Lấy ra tổng số lượng bản ghi
     * Khắc Tiềm - 15.09.2022
     */
    const totalCount = computed(() => store.state.employee.totalCount);

    /**
     * Lấy danh sách ng dùng được check để thực hiện chức năng như xoá hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    const checkShowActionSeries = computed(() =>
      employeeList.value
        .filter((value) => value.Check)
        .map((value) => value.employeeID)
    );

    /**
     * Lấy danh sách columns hiển thị, lọc ra cái cần được hiển thị
     * Khắc Tiềm - 15.09.2022
     */
    const columns = computed(() =>
      store.state.employee.columns.filter(function (value) {
        return value.isShow;
      })
    );

    /**
     * Lấy danh sách columns hiển thị cài đặt
     * Khắc Tiềm - 15.09.2022
     */
    const columnSetting = computed(() => store.state.employee.columns);

    /**
     * Lấy danh sách các chức năng
     * Khắc Tiềm - 15.09.2022
     */
    const actionTable = computed(() => store.state.employee.actionTable);

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
    const employeeEdit = ref(null);

    /**
     * chứa các thông tin người cần nhân bản
     * Khắc Tiềm - 5.10.2022
     */
    const employeeAdd = ref(null);

    /**
     * Biến trạng thái ẩn hiện modal thêm sửa
     * Khắc Tiềm - 15.09.2022
     */
    const isShowModal = ref(false);

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
     * lấy ra số lượng bản ghi của page
     * Khắc Tiềm - 15.09.2022
     */
    const countRecordPageEmployee = ref(getCountRecordPageEmployee());

    /**
     * biến theo dõi số bản ghi muốn lấy chuyển trang mặc định lấy từ bản ghi số 0
     * Khắc Tiềm - 15.09.2022
     */
    const recordSelectPaging = ref(0);

    /**
     * biến theo dõi từ khoá tìm kiếm, mặc định là chuỗi rỗng
     * Khắc Tiềm - 15.09.2022
     */
    const keyword = ref("");

    /**
     * Biến trạng thái thông báo lỗi
     * Khắc Tiềm - 15.09.2022
     */
    const isShowNotificationError = ref("");

    /**
     * Kiểm tra sự thay đổi của biến số lượng bản ghi trên 1 trang và thực hiện reload lại dữ liệu đúng số lượng
     * Khắc Tiềm - 15.09.2022
     */
    watch(countRecordPageEmployee, (newValue) => {
      setCountRecordPageEmployee(newValue);
      loadData({
        offset: recordSelectPaging.value,
        limit: countRecordPageEmployee.value,
        keyword: keyword.value,
      });
    });

    /**
     * Kiểm tra lấy số trang dữ liệu nếu có sự thay đỔi số trag sẽ call api lấy dữ liệu
     * Khắc Tiềm - 15.09.2022
     */
    watch(recordSelectPaging, () => {
      loadData({
        offset: recordSelectPaging.value,
        limit: countRecordPageEmployee.value,
        keyword: keyword.value,
      });
    });

    /**
     * Hàm Load danh sách người dùng
     * Khắc Tiềm - 15.09.2022
     */
    async function loadData(filter) {
      if (filter) {
        //Kích hoạt hiệu ứng loader table
        isShowLoaderTable.value = true;
      }
      await store.dispatch("employee/getEmployeeListAction", filter);
      if (filter) {
        //Dừng hiệu ứng loader table
        isShowLoaderTable.value = false;
      }
    }

    /**
     * Trước khi mounted sẽ load dữ liệu 1 lần
     * Khắc Tiềm - 15.09.2022
     */
    onBeforeMount(() => {
      loadData({
        offset: recordSelectPaging.value,
        limit: countRecordPageEmployee.value,
        keyword: keyword.value,
      });
    });

    /**
     * Hàm xử lý xoá toàn bộ Employee
     * Khắc Tiềm - 15.09.2022
     */
    async function DeleteAll() {
      handleToggleNotification();
      store.dispatch("config/setToggleShowLoaderAction");
      await deleteMultipleApi(checkShowActionSeries.value)
        .then(function () {
          loadData();
          store.dispatch("config/setToggleShowLoaderAction");
          store.dispatch("config/addNotification", {
            type: TypeSuccess,
            message: MessageSuccessDelete
          });
        })
        .catch(function (error) {
          store.dispatch("config/setToggleShowLoaderAction");
          showNotificationError(error);
        });
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
      isShowSettingTable.value = !isShowSettingTable.value;
    }

    /**
     * Hàm xử lý toggle hiển thị các trường dữ liệu của bảng
     * Tham số đầu vào là vị trí cột cần ẩn hiện
     * @param {vị trí muốn ẩn hiện header column table} fieldIndex 
     * Khắc Tiềm - 15.09.2022
     */
    function handleClickToggleSettingTable(fieldIndex) {
      store.dispatch("employee/setToggleShowColumnTableAction", fieldIndex);
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
     * @param {ID bản ghi cần xoá} id 
     * Khắc Tiềm - 15.09.2022
     */
    async function deleteEmployee(id) {
      handleToggleNotification();
      //Loading
      store.dispatch("config/setToggleShowLoaderAction");
      await deleteEmployeeApi(id)
        .then(function () {
          store.dispatch("config/setToggleShowLoaderAction");
          store.dispatch("config/addNotification", {
            type: TypeSuccess,
            message: MessageSuccessDelete
          });
          loadData();
        })
        .catch(function (error) {
          store.dispatch("config/setToggleShowLoaderAction");
          showNotificationError(error);
        });
      //End Loading
    }

    /**
     * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
     * @param {Hành động VD: Nhân bản, sửa, xoá} action 
     * @param {ID record sẽ thay đổi dữ liệu sau khi thực hiện record} employeeId 
     * @param {Mã nhân viên} employeeCode 
     * Khắc Tiềm - 15.09.2022
     */
    async function handleClickActionColumTable(
      action,
      employeeId,
      employeeCode
    ) {
      if (action == EDIT) {
        employeeEditApi(employeeId);
      } else if (action == DELETE) {
        employeeDeleteApi(employeeId, employeeCode)
      } else if (action == REPLICATION) {
        employeeReplicationApi(employeeId)
      }
    }

    /**
     * Hàm thực hiện call api lấy chi tiết nhân viên với trạng thái sửa
     * @param {ID nhân viên cần sửa} employeeId 
     * Khắc Tiềm - 15.09.2022
     */
    async function employeeEditApi(employeeId){
      store.dispatch("config/setToggleShowLoaderAction");
        await getEmployeeApi(employeeId)
          .then(function (response) {
            store.dispatch("config/setToggleShowLoaderAction");
            employeeEdit.value = response;
            handleOpenModal(EDIT);
          })
          .catch(function (error) {
            store.dispatch("config/setToggleShowLoaderAction");
            showNotificationError(error);
          });
    }

    /**
     * Hàm thực hiện hỏi xoá nhân viên
     * @param {ID nhân viên cần xoá} employeeId 
     * @param {mã nhân viên cần xoá} employeeCode 
     * Khắc Tiềm - 15.09.2022
     */
    async function employeeDeleteApi(employeeId, employeeCode){
      cancelAction.value = {
          display: "Không",
          action: handleToggleNotification,
        };
        agreeAction.value = {
          display: "Có",
          action: deleteEmployee,
        };
        messageAction.value = {
          display: WANNING_DELETE + `<${employeeCode}> không?`,
          id: employeeId,
        };
        handleToggleNotification();
    }

    /**
     * Hàm thực hiện call api lấy chi tiết nhân viên với trạng thái thêm để nhân bản
     * @param {ID nhân viên} employeeId 
     * Khắc Tiềm - 15.09.2022
     */
    async function employeeReplicationApi(employeeId){
      store.dispatch("config/setToggleShowLoaderAction");
        await getEmployeeApi(employeeId)
          .then(function (response) {
            store.dispatch("config/setToggleShowLoaderAction");
            employeeAdd.value = { ...response };
          })
          .catch(function (error) {
            store.dispatch("config/setToggleShowLoaderAction");
            showNotificationError(error);
          }),
          await nextValue()
            .then(function (response) {
              employeeAdd.value.employeeCode = response;
            })
            .catch(function (error) {
              showNotificationError(error);
            }),
          handleOpenModal(REPLICATION);
    }

    /**
     * Hàm xử lý hiển thị thông báo lỗi khi call api bị lỗi
     * @param {Lỗi từ sever trả về } error 
     * Khắc Tiềm - 15.09.2022
     */
    function showNotificationError(error) {
      try{
        agreeAction.value = {
          display: "Đóng",
          action: () => {
            isShowNotificationError.value = false;
          },
        };
        messageAction.value = {
          display: error.response.data.userMsg,
        };
        isShowNotificationError.value = true;
        console.log(error.response.data);
      }
      catch{
        store.dispatch("config/addNotification", {
          type: TypeError,
          message: MessageErrorInternet
        });
      }
    }

    /**
     * Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
     * @param {vị trí record cần check true là check tất cả} value 
     * Khắc Tiềm - 15.09.2022
     */
    function handleClickCheckbox(value) {
      if (value === true) {
        store.dispatch("employee/setAllCheckboxEmployeeAction");
      } else {
        store.dispatch("employee/setCheckboxEmployeeAction", value);
      }
    }

    /**
     * Chứa hàm setTimeOut sẽ thực hiện tìm kiếm khi tìm kiếm
     * Khắc Tiềm - 15.09.2022
     */
    const eventSearchInput = [];

    /**
     * Hàm xử lý tìm kiếm dữ liệu
     * @param {event để lấy giá trị nhập} event 
     * Khắc Tiềm - 15.09.2022
     */
    const handleSearchData = (event) => {
      eventSearchInput.forEach((item) => {
        clearTimeout(item);
      });
      eventSearchInput.length = 0;
      eventSearchInput.push(
        setTimeout(() => {
          keyword.value = event.target.value;
          recordSelectPaging.value = 0;
          loadData({
            offset: recordSelectPaging.value,
            limit: countRecordPageEmployee.value,
            keyword: keyword.value,
          });
        }, 600)
      );
    };

    /**
     * Hàm xử lý mở modal với state là trạng thái thêm hay sửa
     * @param {Tham số đầu vào nếu không có Employee thì sẽ set EmployeeEdit = null để mở modal thêm và ngược lại} stateForm 
     * Khắc Tiềm - 15.09.2022
     */
    function handleOpenModal(stateForm) {
      if (stateForm === true) {
        // Nếu tồn tại Employee cần sửa, cần nhân bản thì sẽ xoá đi
        employeeEdit.value = null;
        employeeAdd.value = null;
      } else if (stateForm === EDIT) {
        // Nếu tồn tại Employee cần nhân bản thì sẽ xoá đi
        employeeAdd.value = null;
      } else if (stateForm === REPLICATION) {
        // Nếu tồn tại Employee cần sửa thì sẽ xoá đi
        employeeEdit.value = null;
      }
      // Khi mounted modal xong thì mới thêm class active để có hiệu ứng đẹp
      isShowModal.value = !isShowModal.value;
    }

    /**
     * Hàm xử lý đóng modal
     * Khắc Tiềm - 15.09.2022
     */
    function handleCloseModal() {
      isShowModal.value = !isShowModal.value;
    }

    /**
     * Biến lưu trạng thái ẩn hiện hành động hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    const showActionAll = ref(false);

    /**
     * Biến chứa template thực hiện hành động hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    const templateActionAll = ref(null);

    /**
     * Hàm xử lý sự kiện click không trúng templateActionAll thì sẽ ẩn hành động hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    const handleClickActionAll = () => {
      const isClick = templateActionAll.value.contains(event.target);
      if (!isClick) {
        handleToggleActionAll();
      }
    };

    /**
     * Hàm xử lý ẩn hành động thực hiện hàng loạt
     * Khắc Tiềm - 15.09.2022
     */
    function handleToggleActionAll() {
      if (!showActionAll.value && checkShowActionSeries.value.length > 0) {
        showActionAll.value = true;
        window.addEventListener("click", handleClickActionAll);
      } else {
        window.removeEventListener("click", handleClickActionAll);
        showActionAll.value = false;
      }
    }

    /**
     * khi unmounted thì sẽ xoá bỏ sự kiện lắng nghe xử lý ẩn hành động thực hiện hàng loạt
     */
    onUnmounted(() =>
      window.removeEventListener("click", handleClickActionAll)
    );

    /**
     * Khi mounted component thì sẽ lắng nghe sự kiện các phím tắt
     * NK Tiềm 28/10/2022
     */
    onMounted(() => window.addEventListener("keydown", handleEvent));
    onMounted(() => window.addEventListener("keyup", handleEventInterrupt));

    /**
     * Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
     * NK Tiềm 28/10/2022
     */
    onUnmounted(() => window.removeEventListener("keydown", handleEvent));
    onUnmounted(() => window.removeEventListener("keyup", handleEventInterrupt));

    /**
     * lưu lại giá trị các phím bấm tắt không ngắt quãng
     * NK Tiềm 28/10/2022
     */
     const eventCtrlAltA = [];

    /**
     * Hàm xử lý các event nút bấm tắt
     * NK Tiềm 28/10/2022
     */
     const handleEvent = function (event) {
      if (
        event.keyCode === CTRL ||
        event.keyCode === ALT ||
        event.keyCode === A
      ) {
        if (!eventCtrlAltA.includes(event.keyCode)) {
          eventCtrlAltA.push(event.keyCode);
          if (eventCtrlAltA.length === 3) {
            // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
            eventCtrlAltA.length = 0;
            handleOpenModal(true);
          }
        }
      }
    };

    /**
     * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện
     * NK Tiềm 28/10/2022
     */
    const handleEventInterrupt = function (event) {
      if (
        event.keyCode === CTRL ||
        event.keyCode === ALT ||
        event.keyCode === A
      ) {
        if (eventCtrlAltA.includes(event.keyCode)) {
          eventCtrlAltA.length = 0;
        }
      }
    };
    return {
      employeeList,
      totalCount,
      columns,
      actionTable,
      isShowModal,
      templateActionAll,
      countRecordPageEmployee,
      employeeEdit,
      employeeAdd,
      cancelAction,
      agreeAction,
      isShowNotification,
      columnSetting,
      messageAction,
      isShowLoaderTable,
      isShowSettingTable,
      recordSelectPaging,
      checkShowActionSeries,
      keyword,
      configs,
      isShowNotificationError,
      showActionAll,
      handleShowSettingTable,
      handleDeleteAll,
      handleClickToggleSettingTable,
      handleOpenModal,
      handleClickCheckbox,
      handleCloseModal,
      handleClickActionColumTable,
      handleSearchData,
      handleToggleActionAll,
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
  background: #fff;
  margin-top: 113px;
  margin-bottom: 55px;
  direction: rtl;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #b0b0b0;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 0;
  background: #808080;
  border-radius: 4px;
}
::-webkit-scrollbar {
  height: 10px; /* height of horizontal scrollbar ← You're missing this */
  width: 8px;
  border-radius: 4px;
}
.container-table {
  padding: 0 24px;
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
  padding: 24px 0 20px 0px;
}
/* Phần table */
.table-content {
  position: relative;
  overflow: auto;
  scroll-behavior: smooth;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--while__color);
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

/* Phần thực hiện nhiều chức năng */
.table-function_series {
  border: 2px solid #3b3c3f;
  padding: 0 16px;
  border-radius: 30px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}
.table-function_series:hover {
  background-color: #d2d3d6;
}
.table-function_series:active {
  background-color: #bbbcbc;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.table-function_series span {
  font-family: "notosans-semibold";
  padding-right: 4px;
}
.table-function_series-icon {
  background: var(--url__icon);
  background-position: -560px -359px;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
}
.table-list_action {
  border: solid 1px var(--border__input);
  background-color: var(--while__color);
  border-radius: 2px;
  padding: 3px 0;
  min-width: 100px;
  top: calc(100% + 2px);
  right: 5px;
  position: absolute;
  z-index: 5;
  transition: all ease 0.15s;
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
  width: 24px;
  height: 24px;
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
}
.setting-table::before {
  content: "Tuỳ chỉnh giao diện";
  width: 110px;
  left: -98px;
}
.export-data:hover {
  background-position: -704px -256px;
}
.export-data {
  background-position: -704px -200px;
}
.export-data::before {
  content: "Xuất ra Excel";
  width: 110px;
  left: -55px;
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
  align-items: flex-end;
  justify-content: space-between;
  flex-grow: 1;
}
</style>

<template>
  <div class="container-table">
    <div class="container-table_header">
      <div class="name-table">
        <h1>Đơn vị tính</h1>
        <router-link to="/warehouse" class="prev_page">
          <div class="prev_page-icon"></div>
          <div class="prev_page-text">Tất cả danh mục</div>
        </router-link>
      </div>
      <div class="action-table">
        <button @click="handleOpenModal(true)" class="btn btn-success btn-add">
          Thêm
        </button>
      </div>
    </div>
    <div class="table-content">
      <div class="table-function sticky">
        <div class="search-table">
          <input
            class="input input-table_search"
            type="text"
            @input="handleSearchData"
            placeholder="Tìm theo đơn vị tính"
          />
          <div class="icon-search"></div>
        </div>
        <div class="table-function_search">
          <div
            @click="
              loadData({
                v_Offset: recordSelectPaging,
                v_Limit: countRecordPageRecord,
                v_Where: keyword,
              })
            "
            class="action-render_table reload-table"
          ></div>
          <a target="_blank" :href="configs.baseUrl + '/UnitCalculations/export_data?keyword=' + keyword" class="action-render_table export-data"></a>
        </div>
      </div>
      <div class="table-scroll">
        <div class="table-container">
          <!-- Table -->
          <table-data
            :tableList="recordList"
            :columns="columns"
            :actionTable="actionTable"
            :handleClickActionColumTable="handleClickActionColumTable"
            :isShowLoaderTable="isShowLoaderTable"
          >
          </table-data>
          <!-- End Table -->
        </div>
      </div>
      <div v-if="recordList.length !== 0" class="paging-container sticky">
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
            v-model="countRecordPageRecord"
            :autoPosition="true"
          ></input-combobox>
          <paging-page
            :totalCount="totalCount"
            :countRecordPageRecord="countRecordPageRecord"
            v-model="recordSelectPaging"
            :key="countRecordPageRecord || keyword"
          ></paging-page>
        </div>
      </div>
    </div>
    <!-- Đưa modal ra nằm trong thẻ #app -->
    <teleport to="#app">
      <modal-form v-if="isShowModal">
        <form-unit
          @handle-click-close-modal="handleCloseModal"
          :recordEdit="recordEdit"
          :recordAdd="recordAdd"
        ></form-unit>
      </modal-form>
    </teleport>
  </div>
</template>

<script>
import TableData from "../../../components/TableComponents/BaseTable.vue";
import PagingPage from "../../../components/TableComponents/BasePaging.vue";
import ModalForm from "../../../components/BaseModalForm.vue";
import FormUnit from "./FormUnit.vue";
import eventCtrlAltA from '../../../utils/event/eventCtrlAltA';
import handleDebounce from '../../../utils/event/debounce';
import InputCombobox from "../../../components/InputComponents/BaseCombobox.vue";
import { computed, ref, watch, onBeforeMount, onUnmounted, onMounted } from "vue";
import { useStore } from "vuex";
import actionTableStore from "../../../utils/actionTable";
import notification from "../../../utils/notification";
import index from "../../../utils/index";
import configs from "../../../configs/index";
import eNum from "../../../utils/eNum.js";
import callApi from '../../../api/callApi';//record
import apiUnitCalculation from "../../../api/unitCalculation";
export default {
  components: {
    TableData,
    ModalForm,
    InputCombobox,
    FormUnit,
    PagingPage,
  },
  setup() {
    const { getRecordList, getRecordApi, deleteRecordApi, toggleActiveApi } = apiUnitCalculation;
    /**
     * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
     * NK Tiềm 28/10/2022
     */
    const { TypeSuccess, MessageSuccessDelete } = eNum;
    
    /**
     * hàm lấy và lưu số lượng bản ghi của page
     * Khắc Tiềm - 15.09.2022
     */
    const { getCountRecordPageRecord, setCountRecordPageRecord } = index;

    /**
     * Lấy danh sách columns hiển thị, lọc ra cái cần được hiển thị
     * Khắc Tiềm - 15.09.2022
     */
    const columns = computed(() => store.state.unitCalculation.columns.filter(function (value) { return value.isShow; }));

    /**
     * Các hành động của table
     * Khắc Tiềm - 15.09.2022
     */
    const { EDIT, DELETE, REPLICATION, STOP_USING } = actionTableStore;

    /**
     * Các thông báo của cảnh báo khi xoá bản ghi
     * Khắc Tiềm - 15.09.2022
     */
    const { WANNING_DELETE } = notification;

    /**
     * Sử dụng store của vuex
     * Khắc Tiềm - 15.09.2022
     */
    const store = useStore();

    /**
     * Lấy danh sách ng dùng
     * Khắc Tiềm - 15.09.2022
     */
    const recordList = computed(() => store.state.unitCalculation.recordList);

    /**
     * Lấy ra tổng số lượng bản ghi
     * Khắc Tiềm - 15.09.2022
     */
    const totalCount = computed(() => store.state.unitCalculation.totalCount);

    /**
     * Lấy danh sách các chức năng
     * Khắc Tiềm - 15.09.2022
     */
    const actionTable = computed(() => store.state.unitCalculation.actionTable);

    /**
     * Chứa thông tin người cần sửa
     * Khắc Tiềm - 15.09.2022
     */
    const recordEdit = ref(null);

    /**
     * chứa các thông tin người cần nhân bản
     * Khắc Tiềm - 5.10.2022
     */
    const recordAdd = ref(null);

    /**
     * Biến trạng thái ẩn hiện modal thêm sửa
     * Khắc Tiềm - 15.09.2022
     */
    const isShowModal = ref(false);

    /**
     * Biến chứa trạng thái ẩn hiện loader table
     * Khắc Tiềm - 15.09.2022
     */
    const isShowLoaderTable = ref(false);

    /**
     * lấy ra số lượng bản ghi của page
     * Khắc Tiềm - 15.09.2022
     */
    const countRecordPageRecord = ref(getCountRecordPageRecord());

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
     * Kiểm tra sự thay đổi của biến số lượng bản ghi trên 1 trang và thực hiện reload lại dữ liệu đúng số lượng
     * Khắc Tiềm - 15.09.2022
     */
    watch(countRecordPageRecord, (newValue) => {
      setCountRecordPageRecord(newValue);
      loadData({ v_Offset: 0, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
    });

    /**
     * Kiểm tra lấy số trang dữ liệu nếu có sự thay đỔi số trag sẽ call api lấy dữ liệu
     * Khắc Tiềm - 15.09.2022
     */
    watch(recordSelectPaging, () => {
      loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
    });

    /**
     * Hàm Load danh sách người dùng
     * Khắc Tiềm - 15.09.2022
     */
    async function loadData(filter) {
      if (filter) {
        await store.dispatch("unitCalculation/setFilterAction", filter);
        //Kích hoạt hiệu ứng loader table
        isShowLoaderTable.value = true;
      }
      const find = store.state.unitCalculation.filter;
      await callApi(getRecordList, find, (response) => { store.dispatch("unitCalculation/getRecordListAction", response); }, store, true);
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
      loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
    });

    /**
     * Hàm xử lý xoá một bản ghi
     * @param {ID bản ghi cần xoá} id 
     * Khắc Tiềm - 15.09.2022
     */
    async function deleteRecord(id) {
      await callApi(deleteRecordApi, id, () => { 
        store.dispatch("config/addNotification", { type: TypeSuccess, message: MessageSuccessDelete }); 
        loadData(); 
      }, store);
    }

    /**
     * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
     * @param {Hành động VD: Nhân bản, sửa, xoá} action 
     * @param {ID record sẽ thay đổi dữ liệu sau khi thực hiện record}  
     * @param {Mã nhân viên}  
     * Khắc Tiềm - 15.09.2022
     */
    async function handleClickActionColumTable(action, recordId, recordCode) {
      try{
        if (action == EDIT) {
          recordEditApi(recordId);
        } else if (action == DELETE) {
          recordDeleteApi(recordId, recordCode)
        } else if (action == REPLICATION) {
          recordReplicationApi(recordId)
        } else if(action === STOP_USING){
          toggleRecordActiveApi(recordId);
        }
      }
      catch(e){
        console.log(e);
      }
    }

    /**
     * Hàm thực hiện call api lấy toggle active record
     * Khắc Tiềm - 15.09.2022
     */
    async function toggleRecordActiveApi(recordId){
      await callApi(toggleActiveApi, recordId, () => { 
        store.dispatch("unitCalculation/setToggleActiveAction", recordId);
       }, store, true);
    }

    /**
     * Hàm thực hiện call api lấy chi tiết nhân viên với trạng thái sửa
     * @param {ID nhân viên cần sửa}  
     * Khắc Tiềm - 15.09.2022
     */
    async function recordEditApi(recordId){
      await callApi(getRecordApi, recordId, (response) => { recordEdit.value = response; handleOpenModal(EDIT); }, store);
    }

    /**
     * Hàm thực hiện hỏi xoá nhân viên
     * Khắc Tiềm - 15.09.2022
     */
    async function recordDeleteApi(recordId, recordCode){
      store.dispatch("config/setToggleShowNotificationWanningAction", { action: deleteRecord, message: WANNING_DELETE + `<${recordCode}> không?`, id: recordId });
    }

    /**
     * Hàm thực hiện call api lấy chi tiết nhân viên với trạng thái thêm để nhân bản
     * @param {ID nhân viên}  
     * Khắc Tiềm - 15.09.2022
     */
    async function recordReplicationApi(recordId){
      await callApi(getRecordApi, recordId, async (response) => { recordAdd.value = { ...response }; handleOpenModal(REPLICATION); }, store);
    }

    /**
     * Hàm xử lý tìm kiếm dữ liệu
     * @param {event để lấy giá trị nhập} event 
     * Khắc Tiềm - 15.09.2022
     */
    function handleSearchData(event){
      try {
        handleDebounce(600, searchData, event);
      } catch (e) {
        console.log(e);
      }
    }
    /**
     * Tìm kiếm
     * Khắc Tiềm - 15.09.2022
     */
    function searchData(event){
      keyword.value = event.target.value;
      recordSelectPaging.value = 0;
      loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
    }

    /**
     * Hàm xử lý mở modal với state là trạng thái thêm hay sửa
     * @param {Tham số đầu vào nếu không có record thì sẽ set recordEdit = null để mở modal thêm và ngược lại} stateForm 
     * Khắc Tiềm - 15.09.2022
     */
    function handleOpenModal(stateForm) {
      try {
        if (stateForm === true) {
        // Nếu tồn tại record cần sửa, cần nhân bản thì sẽ xoá đi
        recordEdit.value = null;
        recordAdd.value = null;
      } else if (stateForm === EDIT) {
        // Nếu tồn tại record cần nhân bản thì sẽ xoá đi
        recordAdd.value = null;
      } else if (stateForm === REPLICATION) {
        // Nếu tồn tại record cần sửa thì sẽ xoá đi
        recordEdit.value = null;
      }
      // Khi mounted modal xong thì mới thêm class active để có hiệu ứng đẹp
      isShowModal.value = !isShowModal.value;
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Hàm xử lý đóng modal
     * Khắc Tiềm - 15.09.2022
     */
    function handleCloseModal() {
      try {
        isShowModal.value = !isShowModal.value;
      } catch (e) {
        console.log(e);
      }
    }
    /**
     * Lấy ra các sự kiện nút bấm
     * Khắc Tiềm - 15.09.2022
     */
    const { handleEventCtrlAltA, handleEventInterruptCtrlAltA } = eventCtrlAltA;

    function handleKey(event){
      try {
        handleEventCtrlAltA(event, handleOpenModal, true)
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Khi mounted component thì sẽ lắng nghe sự kiện các phím tắt
     * NK Tiềm 28/10/2022
     */
    onMounted(() => window.addEventListener("keydown", handleKey)); 
    onMounted(() => window.addEventListener("keyup", handleEventInterruptCtrlAltA));
    
    /**
     * Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
     * NK Tiềm 28/10/2022
     */
    onUnmounted(() => window.removeEventListener("keydown", handleKey));
    onUnmounted(() => window.removeEventListener("keyup", handleEventInterruptCtrlAltA));

    return {
      recordList,
      totalCount,
      columns,
      actionTable,
      isShowModal,
      countRecordPageRecord,
      recordEdit,
      recordAdd,
      isShowLoaderTable,
      recordSelectPaging,
      keyword,
      configs,
      handleOpenModal,
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
  margin-top: 100px;
  margin-bottom: 55px;
  direction: rtl;
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
  min-height: 66px;
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
  width: 300px;
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
  left: -96px;
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
}
.prev_page{
  display: flex;
  align-items: center;
  color: #0075c0;
  margin-top: 4px;
}
.prev_page-icon{
  background: var(--url__icon) no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -224px -360px;
}
</style>

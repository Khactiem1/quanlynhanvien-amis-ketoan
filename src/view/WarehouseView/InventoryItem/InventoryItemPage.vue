<template>
    <div class="container-table">
      <div class="container-table_header">
        <div class="name-table">
          <h1>Danh sách hàng hóa, dịch vụ</h1>
          <router-link to="/warehouse" class="prev_page">
            <div class="prev_page-icon"></div>
            <div class="prev_page-text">Tất cả danh mục</div>
          </router-link>
        </div>
        <div class="action-table">
          <!-- {{$t('common.language')}} -->
          <button class="btn btn-action btn-radius btn-add">
            Tiện ích
          </button>
          <router-link to="/DIInventoryItemCategory" class="btn btn-action btn-radius btn-add">
            Nhóm hàng hoá dịch vụ
          </router-link>
          <button @click="handleOpenModal(true)" class="btn btn-radius btn-success btn-add">
            Thêm
          </button>
        </div>
      </div>
      <form-overview v-if="isShowOverview"></form-overview>
      <div class="table-content">
        <div class="table-function sticky">  
          <div class="collapse-overview" @click="handleToggleShowOverView()" :class="{ 'mi-chevron-down--primary' : !isShowOverview }"></div>
          <div class="table-function-search">
            <div class="form-fix">
              <div class="mi-arrow-check-all"></div>
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
              <div class="table-function_series not-css">
                <form-inventory-item-search @handle-filter-data="loadData">
                </form-inventory-item-search>
              </div>
            </div>
            <base-form-key-search :loadData="loadData" :moduleFilter="'inventoryItem'"></base-form-key-search>
          </div>
          <div class="table-function_search">
            <div class="search-table">
              <input
                class="input input-table_search"
                type="text"
                @input="handleSearchData"
                placeholder="Tìm theo mã, tên hàng hoá, dịch vụ"
              />
              <div class="icon-search"></div>
            </div>
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
            <a target="_blank" :href="configs.baseUrl + '/InventoryItems/export_data?keyword=' + keyword" class="action-render_table export-data"></a>
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
              :tableList="recordList"
              :handleClickCheckbox="handleClickCheckbox"
              :columns="columns"
              :actionTable="actionTable"
              :handleClickActionColumTable="handleClickActionColumTable"
              :isShowLoaderTable="isShowLoaderTable"
              :checkShowActionSeries="checkShowActionSeries"
              :loadData="loadData"
              :module="'inventoryItem'"
              :showTotalColumn="true"
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
              :autoPosition="true"
              v-model.number="countRecordPageRecord"
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
          <form-inventory-item
            @handle-click-close-modal="handleCloseModal"
            @handle-change-type-nature="handleChangeNature"
            :recordEdit="recordEdit"
            :recordAdd="recordAdd"
            :typeNature="typeNature"
          ></form-inventory-item>
        </modal-form>
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
  import TableData from "../../../components/TableComponents/BaseTable.vue";
  import PagingPage from "../../../components/TableComponents/BasePaging.vue";
  import SettingTable from "../../../components/TableComponents/BaseSetting.vue";
  import BaseFormKeySearch from '../../../components/TableComponents/BaseFormKeySearch.vue';
  import ModalForm from "../../../components/BaseModalForm.vue";
  import FormInventoryItem from "./FormInventoryItem.vue";
  import eventCtrlAltA from '../../../utils/event/eventCtrlAltA';
  import handleDebounce from '../../../utils/event/debounce';
  import FormInventoryItemSearch from './FormInventoryItemSearch';
  import FormOverview from "./FormOverview.vue";
  import InputCombobox from "../../../components/InputComponents/BaseCombobox.vue";
  import { computed, ref, watch, onBeforeMount, onUnmounted, onMounted } from "vue";
  import { useStore } from "vuex";
  import actionTableStore from "../../../utils/actionTable";
  import notification from "../../../utils/notification";
  import index from "../../../utils/index";
  import configs from "../../../configs/index";
  import eNum from "../../../utils/eNum.js";
  import callApi from '../../../api/callApi';//record
  import apiInventoryItem from "../../../api/inventoryItem";
  export default {
    components: {
      TableData,
      ModalForm,
      InputCombobox,
      FormInventoryItem,
      SettingTable,
      FormOverview,
      PagingPage,
      BaseFormKeySearch,
      FormInventoryItemSearch,
    },
    setup() {
      /**
       * Biến lưu trạng thái tính chất khi thêm hàng hoá
       * NK Tiềm 28/10/2022
       */
      const typeNature = ref(null);
      function handleChangeNature(nature){
        typeNature.value = nature;
      }
      /**
       * Biến lưu trạng thái show overview
       * NK Tiềm 28/10/2022
       */
      const isShowOverview = ref(localStorage.getItem("isShowOverview") === "false" ? false : true);
      /**
       * Hàm xử lý toggle show overview
       * NK Tiềm 28/10/2022
       */
      function handleToggleShowOverView(){
        isShowOverview.value = !isShowOverview.value;
        localStorage.setItem("isShowOverview", isShowOverview.value);
      }
      /**
       * Lấy ra api cần thiết
       * NK Tiềm 28/10/2022
       */
      const { getRecordList, getRecordApi, deleteRecordApi, deleteMultipleApi, toggleActiveApi } = apiInventoryItem;
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
       * Các hành động của table
       * Khắc Tiềm - 15.09.2022
       */
      const { EDIT, DELETE, REPLICATION, STOP_USING } = actionTableStore;
  
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
      const recordList = computed(() => store.state.inventoryItem.recordList);
  
      /**
       * Lấy ra tổng số lượng bản ghi
       * Khắc Tiềm - 15.09.2022
       */
      const totalCount = computed(() => store.state.inventoryItem.totalCount);
  
      /**
       * Lấy danh sách ng dùng được check để thực hiện chức năng như xoá hàng loạt
       * Khắc Tiềm - 15.09.2022
       */
      const checkShowActionSeries = computed(() =>store.state.inventoryItem.recordCheck);
  
      /**
       * Lấy danh sách columns hiển thị, lọc ra cái cần được hiển thị
       * Khắc Tiềm - 15.09.2022
       */
      const columns = computed(() => store.state.inventoryItem.columns.filter(function (value) { return value.isShow; })
      );
  
      /**
       * Lấy danh sách columns hiển thị cài đặt
       * Khắc Tiềm - 15.09.2022
       */
      const columnSetting = computed(() => store.state.inventoryItem.columns);
  
      /**
       * Lấy danh sách các chức năng
       * Khắc Tiềm - 15.09.2022
       */
      const actionTable = computed(() => store.state.inventoryItem.actionTable);
  
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
       * Biến chứa trạng thái ẩn hiện setting table
       * Khắc Tiềm - 15.09.2022
       */
      const isShowSettingTable = ref(false);
  
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
        recordSelectPaging.value = 0;
        loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
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
        if(filter && filter.resetPage){
          recordSelectPaging.value = 0;
          filter.v_Offset = recordSelectPaging.value;
        }
        if (filter) {
          if(filter !== true){
            await store.dispatch("inventoryItem/setFilterAction", filter);
          }
          //Kích hoạt hiệu ứng loader table
          isShowLoaderTable.value = true;
        }
        const find = store.state.inventoryItem.filter;
        await callApi(getRecordList, find, (response) => { store.dispatch("inventoryItem/getRecordListAction", response); }, store, true);
        if (filter) {
          //Dừng hiệu ứng loader table
          isShowLoaderTable.value = false;
        }
      }

      /**
       * Hàm xử lý filter
       * @param {Cột cần xoá k filetr} column 
       * Khắc Tiềm - 15.09.2022
       */
  
      /**
       * Trước khi mounted sẽ load dữ liệu 1 lần
       * Khắc Tiềm - 15.09.2022
       */
      onBeforeMount(() => {
        loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
      });
  
      /**
       *Hàm xử lý hỏi xoá hàng loạt
       * Khắc Tiềm - 15.09.2022
       */
      function handleDeleteAll() {
        try {
          store.dispatch("config/setToggleShowNotificationWanningAction", { action: DeleteAll, message: WANNING_DELETE_ALL});
        } catch (e) {
          console.log(e);
        }
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
        try {
          store.dispatch("inventoryItem/setToggleShowColumnTableAction", fieldIndex);
        } catch (e) {
          console.log(e);
        }
      }
  
      /**
       * Hàm xử lý xoá một bản ghi
       * @param {ID bản ghi cần xoá} id 
       * Khắc Tiềm - 15.09.2022
       */
      async function deleteRecord(id) {
        await callApi(deleteRecordApi, id, async () => { 
          store.dispatch("config/addNotification", { type: TypeSuccess, message: MessageSuccessDelete }); 
          await store.dispatch("inventoryItem/setCheckboxUnCheckRecordAction", id);
          if(recordList.value.length === 0){
            recordSelectPaging.value = 0;
            loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
          }
        }, store);
      }
  
      /**
       * Hàm xử lý xoá toàn bộ danh sách
       * Khắc Tiềm - 15.09.2022
       */
      async function DeleteAll() {
        await callApi(deleteMultipleApi, checkShowActionSeries.value, async () => { 
          store.dispatch("inventoryItem/setEmptyCheckBoxRecordAction");
          await store.dispatch("config/addNotification", { type: TypeSuccess, message: MessageSuccessDelete });
          if(recordList.value.length === 0){
            recordSelectPaging.value = 0;
            loadData({ v_Offset: recordSelectPaging.value, v_Limit: countRecordPageRecord.value, v_Where: keyword.value, });
          }
        }, store);
      }
  
      /**
       * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
       * @param {Hành động VD: Nhân bản, sửa, xoá} action 
       * @param {ID record sẽ thay đổi dữ liệu sau khi thực hiện record}  
       * @param {Mã nhân viên}  
       * Khắc Tiềm - 15.09.2022
       */
      async function handleClickActionColumTable( action, recordId, recordCode) {
        try {
          if (action == EDIT) {
          recordEditApi(recordId);
        } else if (action == DELETE) {
          recordDeleteApi(recordId, recordCode)
        } else if (action == REPLICATION) {
          recordReplicationApi(recordId)
        }else if(action === STOP_USING){
          toggleRecordActiveApi(recordId);
        }
        } catch (e) {
          console.log(e);
        }
      }

      /**
       * Hàm thực hiện call api lấy toggle active record
       * Khắc Tiềm - 15.09.2022
       */
      async function toggleRecordActiveApi(recordId){
        await callApi(toggleActiveApi, recordId, () => { 
          store.dispatch("inventoryItem/setToggleActiveAction", recordId);
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
       * @param {ID nhân viên cần xoá}  
       * @param {mã nhân viên cần xoá}  
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
       * Hàm xử lý checkbox value true thì là check ô tất cả check, value là 0,1,2 là xử lý các phần tử được check
       * @param {vị trí record cần check true là check tất cả} value 
       * Khắc Tiềm - 15.09.2022
       */
      function handleClickCheckbox(value, listID) {
        try {
          if (value === true) {
            store.dispatch("inventoryItem/setAllCheckboxRecordAction", listID);
          } else {
            store.dispatch("inventoryItem/setCheckboxRecordAction", value);
          }
        } catch (e) {
         console.log(e); 
        }
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
        try {
          if (!showActionAll.value && checkShowActionSeries.value.length > 0) {
          showActionAll.value = true;
          window.addEventListener("click", handleClickActionAll);
        } else {
          window.removeEventListener("click", handleClickActionAll);
          showActionAll.value = false;
        }
        } catch (e) {
          console.log(e);
        }
      }
  
      /**
       * khi unmounted thì sẽ xoá bỏ sự kiện lắng nghe xử lý ẩn hành động thực hiện hàng loạt
       * Khắc Tiềm - 15.09.2022
       */
      onUnmounted(() => window.removeEventListener("click", handleClickActionAll) );
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
        typeNature,
        actionTable,
        isShowModal,
        templateActionAll,
        countRecordPageRecord,
        recordEdit,
        recordAdd,
        columnSetting,
        isShowLoaderTable,
        isShowSettingTable,
        isShowOverview,
        recordSelectPaging,
        checkShowActionSeries,
        keyword,
        configs,
        showActionAll,
        handleChangeNature,
        handleShowSettingTable,
        handleDeleteAll,
        handleClickToggleSettingTable,
        handleOpenModal,
        handleClickCheckbox,
        handleCloseModal,
        handleClickActionColumTable,
        handleSearchData,
        handleToggleActionAll,
        handleToggleShowOverView,
        loadData,
      };
    },
  };
  </script>
  
  <style scoped>
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
    background-color: var(--while__color);
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
  .action-table .btn + .btn{
    margin-left: 12px;
  }
  .btn-action{
    background-color: unset;
    border: 2px solid #3b3c3f;
    display: flex;
    align-items: center;
    transition: all ease .15s;
  }
  .btn-action:hover{
    background-color: #d2d3d6;
  }
  .action-table{
    display: flex;
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
    margin-left: 12px;
  }
  .not-css{
    border: none;
    padding: unset;
    border-radius: unset;
    margin-left: 0px;
    cursor: context-menu;
  }
  .table-function_series:hover:not(.not-css) {
    background-color: #d2d3d6;
  }
  .table-function_series:active:not(.not-css) {
    background-color: #bbbcbc;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .table-function_series:not(.not-css) span {
    font-family: "notosans-bold";
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
    width: 280px;
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

.mi-chevron-down--primary{
  background-position: -173px -362px;
}
.table-function-search{
  display: flex;
  align-items: center;
}
.mi-arrow-check-all{
  background: var(--url__icon) no-repeat;
  cursor: pointer;
  background-position: -256px -143px;
  width: 24px;
    height: 24px;
    min-width: 24px;
    margin-top: 12px;
    margin-left: 7px;
    min-height: 24px;
}
  .form-fix{
    min-width: 316px;
    display: flex;
    align-items: center;
  }
</style>
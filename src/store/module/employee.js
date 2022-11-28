import eNum from "../../utils/eNum";
import actionTable from "../../utils/actionTable";
const employees = {
  namespaced: true,
  state: () => {
    return {
      /**
       * Các hành động của table
       * Khắc Tiềm - 15.09.2022
       */
      actionTable: {
        actionDefault: actionTable.EDIT,
        actionList: [actionTable.REPLICATION, actionTable.DELETE, actionTable.STOP_USING],
        fieldId: "employeeID",
        fieldCode: "employeeCode",
        fieldActive: "isActive",
      },

      /**
       * Các column của table
       * Khắc Tiềm - 15.09.2022
       */
      columns: [
        {
          field: "employeeCode",
          isShow: true,
          header: "Mã nhân viên",
          filter: { typeSearch: "text", columnSearch: "EmployeeCode" , typeFilter: "text", module: "employee", headerSearch: "Mã nhân viên"},
          width: "150px",
        },
        {
          field: "employeeName",
          isShow: true,
          header: "Tên nhân viên",
          filter: { typeSearch: "text", columnSearch: "EmployeeName" , typeFilter: "text", module: "employee", headerSearch: "Tên nhân viên"},
          width: "200px",
        },
        {
          field: "gender",
          isShow: true,
          header: "Giới tính",
          filter: { typeSearch: "number", columnSearch: "Gender" , typeFilter: "combobox", module: "employee", headerSearch: "Giới tính", data: [
            { value: '', header: 'Tất cả' },
            { value: eNum.MALE, header: 'Nam' },
            { value: eNum.FEMALE, header: 'Nữ' },
            { value: eNum.OTHER, header: 'Khác' },
          ], comparisonType: '=' },
          width: "120px",
          isGender: true,
        },
        {
          field: "dateOfBirth",
          isShow: true,
          header: "Ngày sinh",
          filter: { typeSearch: "date", columnSearch: "DateOfBirth" , typeFilter: "date", module: "employee", headerSearch: "Ngày sinh"},
          textAlign: "center",
          formatDate: true,
          width: "130px",
        }, //(Khắc Tiềm - 15.09.2022)formatDate Định dạng hiển thị ngày/tháng/năm
        {
          field: "branchBank",
          isShow: true,
          filter: { typeSearch: "text", columnSearch: "BranchBank" , typeFilter: "text", module: "employee", headerSearch: "Chi nhánh ngân hàng"},
          header: "Chi nhánh ngân hàng",
          width: "230px",
        },
        {
          field: "identityCard",
          isShow: true,
          header: "Số chứng minh",
          filter: { typeSearch: "text", columnSearch: "IdentityCard" , typeFilter: "text", module: "employee", headerSearch: "Số chứng minh"},
          width: "200px",
        },
        {
          field: "employeeTitle",
          isShow: true,
          header: "Chức danh",
          filter: { typeSearch: "text", columnSearch: "EmployeeTitle" , typeFilter: "text", module: "employee", headerSearch: "Chức danh"},
          width: "150px",
        },
        {
          field: "unitName",
          isShow: true,
          header: "Tên đơn vị",
          filter: { typeSearch: "text", columnSearch: "UnitName" , typeFilter: "text", module: "employee", headerSearch: "Tên đơn vị"},
          width: "200px",
        },
        {
          field: "bankAccount",
          isShow: true,
          header: "Số tài khoản",
          filter: { typeSearch: "text", columnSearch: "BankAccount" , typeFilter: "text", module: "employee", headerSearch: "Số tài khoản"},
          width: "150px",
        }, //(Khắc Tiềm - 15.09.2022)fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
        {
          field: "nameBank",
          isShow: true,
          header: "Tên ngân hàng",
          filter: { typeSearch: "text", columnSearch: "NameBank" , typeFilter: "text", module: "employee", headerSearch: "Tên ngân hàng"},
          width: "180px",
        },
        {
          field: "dayForIdentity",
          isShow: true,
          header: "Ngày cấp chứng minh",
          filter: { typeSearch: "date", columnSearch: "DayForIdentity" , typeFilter: "date", module: "employee", headerSearch: "Ngày cấp chứng minh"},
          textAlign: "center",
          width: "220px",
          formatDate: true,
        },
        {
          field: "grantAddressIdentity",
          isShow: true,
          header: "Nơi cấp chứng minh",
          filter: { typeSearch: "text", columnSearch: "GrantAddressIdentity" , typeFilter: "text", module: "employee", headerSearch: "Nơi cấp chứng minh"},
          width: "230px",
        },
        {
          field: "phoneNumber",
          isShow: true,
          header: "Số điện thoại",
          filter: { typeSearch: "text", columnSearch: "PhoneNumber" , typeFilter: "text", module: "employee", headerSearch: "Số điện thoại"},
          width: "230px",
        },
        {
          field: "landlinePhone",
          isShow: true,
          header: "Điện thoại cố định",
          filter: { typeSearch: "text", columnSearch: "LandlinePhone" , typeFilter: "text", module: "employee", headerSearch: "Điện thoại cố định"},
          width: "230px",
        },
        {
          field: "employeeEmail",
          isShow: true,
          header: "Địa chỉ email",
          filter: { typeSearch: "text", columnSearch: "EmployeeEmail" , typeFilter: "text", module: "employee", headerSearch: "Địa chỉ email"},
          width: "230px",
        },
        {
          field: "employeeAddress",
          isShow: true,
          header: "Địa chỉ",
          filter: { typeSearch: "text", columnSearch: "EmployeeAddress" , typeFilter: "text", module: "employee", headerSearch: "Địa chỉ"},
          width: "200px",
        },
        {
          field: "isActive",
          isShow: true,
          header: "Trạng thái",
          filter: { typeSearch: "number", columnSearch: "IsActive" , typeFilter: "combobox", data: [
            { value: '', header: 'Tất cả' },
            { value: 'true', header: 'Đang sử dụng' },
            { value: 'false', header: 'Ngừng sử dụng' },
          ], module: "inventoryItem", headerSearch: "Trạng thái ", comparisonType: '=' },
          isActive: true,
          width: "150px",
        },
      ],

      /**
       * Các Danh sách
       * Khắc Tiềm - 15.09.2022
       */
       recordList: [],

      /**
       * Danh sách các record được check
       * Khắc Tiềm - 15.09.2022
       */
       recordCheck: [],

      /**
       * Tổng số lượng bản ghi
       * Khắc Tiềm - 15.09.2022
       */
      totalCount: 0,

      /**
       * Mặc định tìm kiếm và phân trang với key hiện tại
       * Khắc Tiềm - 15.09.2022
       */
      filter: {
        v_Offset: 0,
        v_Limit: 0,
        v_Where: "",
        v_Sort: "",
        customSearch: [],
      },
    };
  },
  mutations: {
    /**
     * Xét toggle các trường được hiển thị lên giao diện table
     * @param {index được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowColumnTableMutation(state, payload) {
      state.columns[payload].isShow = !state.columns[payload].isShow;
    },

    /**
     * Set danh sách Employee
     * @param {danh sách} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setRecordListMutation(state, payload) {
      state.recordList = [...payload.recordList];
      state.totalCount = payload.totalCount;
    },

    /**
     * Xét toggle checkbox phần tử được check
     * @param {index các nhân viên được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setCheckboxRecordMutation(state, payload) {
      if(state.recordCheck.includes(payload)){
        state.recordCheck = state.recordCheck.filter(item => item !== payload);
      }
      else{
        state.recordCheck.push(payload);
      }
    },

    /**
     * Xét toggle tất cả checkbox được check
     * Khắc Tiềm - 15.09.2022
     */
    setAllCheckboxRecordMutation(state,payload) {
      let countCheck = 0;
        payload.forEach((item) => {
          if(state.recordCheck.includes(item)){
            countCheck++;
          }
        })
        if(countCheck == state.filter.v_Limit || countCheck == state.recordList.length){
          payload.forEach((item) => {
            if(state.recordCheck.includes(item)){
              state.recordCheck.splice(state.recordCheck.indexOf(item), 1);
            }
          })
        }
        else{
          payload.forEach((item) => {
            if(!state.recordCheck.includes(item)){
              state.recordCheck.push(item);
            }
          })
        }
    },

    /**
     * Xét xoá tất cả checkbox được check
     * Khắc Tiềm - 15.09.2022
     */
    setEmptyCheckBoxRecordMutation(state){
      state.recordList = state.recordList.filter((item) => !state.recordCheck.includes(item[state.actionTable.fieldId]));
      state.totalCount = state.totalCount - state.recordCheck.length;
      state.recordCheck.length = 0;
    },

    /**
     * Set các giá trị tìm kiếm và phân trang khi call apie
     * @param {giá trị set} payload 
     * Khắc Tiềm - 15.09.2022
     */
     setFilterMutation(state, payload) {
      state.filter.v_Offset = payload.v_Offset === 0 || payload.v_Offset ? payload.v_Offset : state.filter.v_Offset;
      state.filter.v_Limit = payload.v_Limit ? payload.v_Limit : state.filter.v_Limit;
      state.filter.v_Where = payload.v_Where === "" || payload.v_Where ? payload.v_Where : state.filter.v_Where;
      if(payload.resetPage){
        for(let key in payload){
          if(key != 'v_Offset' && key != 'resetPage'){
            const findIndex = state.filter.customSearch.findIndex(item => item.columnSearch === payload[key].columnSearch);
            if(findIndex != -1){
              state.filter.customSearch.splice(findIndex, 1);
            }
            state.filter.customSearch.push(payload[key]);
          }
        }
      }
    },

    /**
       * Set các giá trị tìm kiếm rỗng
       */
     setFilterCustomSearchEmptyMutation(state){
      state.filter.customSearch.length = 0;
    },

    /**
     * Set xoá giá trị tìm kiếm
     */
    setFilterCustomSearchDropMutation(state, payload){
      const findIndex = state.filter.customSearch.findIndex(item => item.columnSearch === payload);
      if(findIndex != -1){
        state.filter.customSearch.splice(findIndex, 1);
      }
    },

    /**
     * Xét xoá checkbox phần tử được check
     * @param {index các nhân viên được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
     setCheckboxUnCheckRecordMutation(state, payload) {
      if(state.recordCheck.includes(payload)){
        state.recordCheck = state.recordCheck.filter(item => item !== payload);
      }
      state.recordList = state.recordList.filter((item) => item[state.actionTable.fieldId] !== payload);
      state.totalCount--;
    },
    
    /**
     * Thêm record
     * Khắc Tiềm - 15.09.2022
     */
    addRecordMutation(state, payload) {
      state.recordList = [payload, ...state.recordList];
      state.totalCount++;
    },

    /**
     * Sửa record
     * Khắc Tiềm - 15.09.2022
     */
    editRecordMutation(state, payload) {
      state.recordList = [payload, ...state.recordList.filter(item => item[state.actionTable.fieldId] !== payload[state.actionTable.fieldId])]
    },

    /**
       * Hàm xử lý toggle active record
       * Khắc Tiềm - 15.09.2022
       */
     setToggleActiveMutation(state, payload){
      state.recordList.find((item, index) => {
        if(item[state.actionTable.fieldId] === payload){
          state.recordList[index].isActive = !state.recordList[index].isActive;
        }
      })
    },
    setFilterCustomSearchSortMutation(state, payload){
      if(state.filter.v_Sort === ''){
        state.filter.v_Sort = `${payload} DESC`;
      }
      else if(state.filter.v_Sort.slice(-4) === 'DESC'){
        state.filter.v_Sort = `${payload} ASC`;
      }
      else{
        state.filter.v_Sort = ``;
      }
    },
  },
  actions: {
    /**
       * Hàm xử lý sắp xếp theo trường
       */
    async setFilterCustomSearchSortAction(context, payload){
      await context.commit("setFilterCustomSearchSortMutation", payload);
      return context.state.filter.v_Sort;
    },
    /**
     * Hàm xử lý xoá trường tìm kiếm
     */
    setFilterCustomSearchDropAction(context, payload){
      context.commit("setFilterCustomSearchDropMutation", payload);
    }, 

    /**
     * Hàm xử lý xoá tất cả các trường tìm kiếm
     */
    setFilterCustomSearchEmptyAction(context){
      context.commit("setFilterCustomSearchEmptyMutation");
    },
    /**
     * Hàm xử lý toggle active record
     * Khắc Tiềm - 15.09.2022
     */
    setToggleActiveAction(context, payload){
      context.commit("setToggleActiveMutation", payload);
    },
    /**
     * Thêm record
     * Khắc Tiềm - 15.09.2022
     */
    addRecordAction(context, payload){
      context.commit("addRecordMutation", payload);
    },

    /**
     * Sửa record
     * Khắc Tiềm - 15.09.2022
     */
    editRecordAction(context, payload){
      context.commit("editRecordMutation", payload);
    },

    /**
     * Lấy ra dánh sách nhân viên
     * @param {Giá trị set filter} payload 
     * Khắc Tiềm - 15.09.2022
     */
    async getRecordListAction(context, payload) {
      context.commit("setRecordListMutation", payload);
    },

    /**
     * Set các giá trị tìm kiếm và phân trang
     * Khắc Tiềm - 15.09.2022
     */
    setFilterAction(context, payload){
      context.commit("setFilterMutation", payload);
    },

    /**
     * Xét toggle checkbox phần tử được check
     * @param {index các nhân viên được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setCheckboxRecordAction(context, payload) {
      context.commit("setCheckboxRecordMutation", payload);
    },

    /**
     * Xét xoá checkbox phần tử được check
     * @param {index các nhân viên được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setCheckboxUnCheckRecordAction(context, payload) {
      context.commit("setCheckboxUnCheckRecordMutation", payload);
    },

    /**
     * Xét toggle tất cả checkbox được check
     * Khắc Tiềm - 15.09.2022
     */
    setAllCheckboxRecordAction(context, payload) {
      context.commit("setAllCheckboxRecordMutation", payload);
    },

    /**
     * Xét toggle các trường được hiển thị lên giao diện table
     * @param {index được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowColumnTableAction(context, payload) {
      context.commit("setToggleShowColumnTableMutation", payload);
    },
    
    /**
     * Xét xoá tất cả checkbox được check
     * Khắc Tiềm - 15.09.2022
     */
     setEmptyCheckBoxRecordAction(context){
      context.commit("setEmptyCheckBoxRecordMutation");
    }
  },
};

export default employees;

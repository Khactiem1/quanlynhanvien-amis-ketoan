const employees = {
  namespaced: true,
  state: () => {
    return {
      /**
       * Các hành động của table
       * Khắc Tiềm - 15.09.2022
       */
      actionTable: {
        actionDefault: 'Sửa',
        actionList: ['Nhân bản', 'Xoá', 'Ngừng sử dụng'],
        fieldId: "employeeID",
        fieldCode: "employeeCode",
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
          width: "120px",
        },
        {
          field: "employeeName",
          isShow: true,
          header: "Tên nhân viên",
          width: "200px",
        },
        {
          field: "gender",
          isShow: true,
          header: "Giới tính",
          width: "120px",
          isGender: true,
        },
        {
          field: "dateOfBirth",
          isShow: true,
          header: "Ngày sinh",
          textAlign: "center",
          formatDate: true,
          width: "130px",
        }, //(Khắc Tiềm - 15.09.2022)formatDate Định dạng hiển thị ngày/tháng/năm
        {
          field: "branchBank",
          isShow: true,
          header: "Chi nhánh ngân hàng",
          width: "200px",
        },
        {
          field: "identityCard",
          isShow: true,
          header: "Số chứng minh",
          width: "200px",
        },
        {
          field: "employeeTitle",
          isShow: true,
          header: "Chức danh",
          width: "120px",
        },
        {
          field: "unitName",
          isShow: true,
          header: "Tên đơn vị",
          width: "200px",
        },
        {
          field: "bankAccount",
          isShow: true,
          header: "Số tài khoản",
          width: "150px",
        }, //(Khắc Tiềm - 15.09.2022)fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
        {
          field: "nameBank",
          isShow: true,
          header: "Tên ngân hàng",
          width: "180px",
        },
        {
          field: "dayForIdentity",
          isShow: true,
          header: "Ngày cấp chứng minh",
          textAlign: "center",
          width: "180px",
          formatDate: true,
        },
        {
          field: "grantAddressIdentity",
          isShow: true,
          header: "Nơi cấp chứng minh",
          width: "230px",
        },
        {
          field: "phoneNumber",
          isShow: true,
          header: "Số điện thoại",
          width: "230px",
        },
        {
          field: "landlinePhone",
          isShow: true,
          header: "Điện thoại cố định",
          width: "230px",
        },
        {
          field: "employeeEmail",
          isShow: true,
          header: "Địa chỉ email",
          width: "230px",
        },
        {
          field: "employeeAddress",
          isShow: true,
          header: "Địa chỉ",
          width: "200px",
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
      if(countCheck == state.filter.v_Limit){
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
  },
  actions: {
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

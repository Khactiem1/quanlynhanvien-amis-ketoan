import actionTable from "../../utils/actionTable";
const commodityGroups = {
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
          fieldId: "commodityGroupID",
          fieldCode: "commodityCode",
          fieldActive: "isActive",
        },
  
        /**
         * Các column của table
         * Khắc Tiềm - 15.09.2022
         */
        columns: [
          {
            field: "commodityCode",
            isShow: true,
            header: "MÃ NHÓM VẬT TƯ, HÀNG HÓA, DỊCH VỤ",
            width: "300px",
          },
          {
            field: "commodityName",
            isShow: true,
            header: "TÊN NHÓM VẬT TƯ, HÀNG HÓA, DỊCH VỤ",
            width: "100%",
          },
          {
            field: "isActive",
            isShow: true,
            header: "Trạng thái",
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
       * Set danh sách Employee
       * @param {danh sách} payload 
       * Khắc Tiềm - 15.09.2022
       */
      setRecordListMutation(state, payload) {
        state.recordList = [...payload.recordList];
        state.totalCount = payload.totalCount;
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
    },
    actions: {
      /**
       * Hàm xử lý toggle active record
       * Khắc Tiềm - 15.09.2022
       */
      setToggleActiveAction(context, payload){
        context.commit("setToggleActiveMutation", payload);
      },
  
      /**
       * Lấy ra dánh sách 
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
    },
  };
    
  export default commodityGroups;
    
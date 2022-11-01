const commodityGroups = {
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
            width: "120px",
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
          offset: 0,
          limit: 0,
          keyword: "",
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
        state.filter = { ...payload };
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
    
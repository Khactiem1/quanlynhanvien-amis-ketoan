const inventoryItems = {
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
          fieldId: "inventoryItemID",
          fieldCode: "inventoryItemCode",
        },
  
        /**
         * Các column của table
         * Khắc Tiềm - 15.09.2022
         */
        columns: [
          {
            field: "inventoryItemCode",
            isShow: true,
            header: "Mã",
            width: "120px",
          },
          {
            field: "inventoryItemName",
            isShow: true,
            header: "Tên hàng hoá vật tư",
            width: "200px",
          },
          {
            field: "unitCalculationName",
            isShow: true,
            header: "Tên đơn vị tính",
            width: "150px",
          },
          {
            field: "depreciatedTax",
            isShow: true,
            header: "Giảm thuế",
            width: "200px",
          }, //(Khắc Tiềm - 15.09.2022)formatDate Định dạng hiển thị ngày/tháng/năm
          {
            field: "warrantyPeriod",
            isShow: true,
            header: "Thời hạn bảo hành",
            width: "200px",
          },
          {
            field: "origin",
            isShow: true,
            header: "Nguồn gốc",
            width: "200px",
          },
          {
            field: "description",
            isShow: true,
            header: "Mô tả",
            width: "200px",
          },
          {
            field: "explanationBuy",
            isShow: true,
            header: "Diễn giải khi mua",
            width: "200px",
          }, //(Khắc Tiềm - 15.09.2022)fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
          {
            field: "explanationSell",
            isShow: true,
            header: "Diễn giải khi bán",
            width: "200px",
          },
          {
            field: "vatGroupExciceTax",
            isShow: true,
            header: "Nhóm chịu thuế tiêu thụ đặc biệt",
            width: "300px",
          },
          {
            field: "depotName",
            isShow: true,
            header: "Tên nhà kho",
            width: "200px",
          },
          {
            field: "accountDepot",
            isShow: true,
            header: "Tài khoản kho",
            width: "200px",
          },
          {
            field: "accountRevenue",
            isShow: true,
            header: "Tài khoản doanh thu",
            width: "200px",
          },
          {
            field: "accountDiscount",
            isShow: true,
            header: "Tài khoản chiết khấu",
            width: "200px",
          },
          {
            field: "accountSale",
            isShow: true,
            header: "Tài khoản giảm giá",
            width: "200px",
          },
          {
            field: "accountReturn",
            isShow: true,
            header: "Tài khoản trả lại",
            width: "200px",
          },
          {
            field: "accountCost",
            isShow: true,
            header: "Tài khoản chi phí",
            width: "200px",
          },
          {
            field: "minimumStock",
            isShow: true,
            header: "Số lượng tồn tối thiểu",
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "ratioDiscount",
            isShow: true,
            header: "Tỉ lệ chiết khấu khuyến mại",
            textAlign: "right",
            width: "250px",
            fractionSize: true,
          },
          {
            field: "vatTax",
            isShow: true,
            header: "Thuế giá trị gia tăng",
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "vatImport",
            isShow: true,
            header: "Thuế nhập khẩu",
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "vatExport",
            isShow: true,
            header: "Thuế xuất khẩu",
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "orderFix",
            isShow: true,
            header: "Đơn mua cố định",
            textAlign: "right",
            fractionSize: true,
            width: "200px",
          },
          {
            field: "orderNearest",
            isShow: true,
            header: "Đơn mua gần nhất",
            textAlign: "right",
            fractionSize: true,
            width: "200px",
          },
          {
            field: "orderSell",
            isShow: true,
            header: "Đơn giá bán",
            textAlign: "right",
            fractionSize: true,
            width: "200px",
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
          offset: 0,
          limit: 0,
          keyword: "",
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
        if(countCheck == state.filter.limit || countCheck == state.recordList.length){
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
        state.filter = { ...payload };
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
  
  export default inventoryItems;
  
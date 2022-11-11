import eNum from "../../utils/eNum";
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
          fieldActive: "isActive",
        },
  
        /**
         * Các column của table
         * Khắc Tiềm - 15.09.2022
         */
        columns: [
          {
            field: "avatar",
            isShow: true,
            header: "Hình ảnh",
            isImage: true,
            width: "120px",
          },
          {
            field: "inventoryItemCode",
            isShow: true,
            header: "Mã",
            filter: { typeSearch: "text", columnSearch: "InventoryItemCode" , typeFilter: "text", module: "inventoryItem", headerSearch: "Mã "},
            width: "180px",
          },
          {
            field: "inventoryItemName",
            isShow: true,
            header: "Tên hàng hoá vật tư",
            filter: { typeSearch: "text", columnSearch: "InventoryItemName" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tên hàng hoá vật tư "},
            width: "300px",
          },
          {
            field: "nature",
            isShow: true,
            header: "Tính chất",
            filter: { typeSearch: "number", columnSearch: "Nature" , typeFilter: "combobox", data: [
              { value: '', header: 'Tất cả' },
              { value: eNum.Goods, header: 'Hàng hoá' },
              { value: eNum.Service, header: 'Dịch vụ' },
              { value: eNum.Materials, header: 'Nguyên vật liệu' },
              { value: eNum.FinishedProduct, header: 'Thành phẩm' },
              { value: eNum.ToolTools, header: 'Công cụ, dụng cụ' },
            ], module: "inventoryItem", headerSearch: "Tính chất ", comparisonType: '=' },
            isNature: true,
            width: "180px",
          },
          {
            field: "unitCalculationName",
            isShow: true,
            header: "Tên đơn vị tính",
            filter: { typeSearch: "text", columnSearch: "UnitCalculationName" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tên đơn vị tính "},
            width: "180px",
          },
          {
            field: "quantityTock",
            isShow: true,
            header: "Số lượng tồn",
            data: "",
            filter: { typeSearch: "number", columnSearch: "QuantityTock" , typeFilter: "number", module: "inventoryItem", headerSearch: "Số lượng tồn " },
            textAlign: "right",
            width: "150px",
            fractionSize: true,
          },
          {
            field: "minimumStock",
            isShow: true,
            header: "Số lượng tồn tối thiểu",
            filter: { typeSearch: "number", columnSearch: "MinimumStock" , typeFilter: "number", module: "inventoryItem", headerSearch: "Số lượng tồn tối thiểu " },
            textAlign: "right",
            width: "220px",
            fractionSize: true,
          },
          {
            field: "commodityCode",
            isShow: true,
            header: "Nhóm vật tư hàng hoá",
            filter: { typeSearch: "text", columnSearch: "CommodityCode" , typeFilter: "text", module: "inventoryItem", headerSearch: "Nhóm vật tư hàng hoá "},
            width: "220px",
          },
          {
            field: "depreciatedTax",
            isShow: true,
            header: "Giảm thuế",
            filter: { typeSearch: "text", columnSearch: "DepreciatedTax" , typeFilter: "combobox", data: [
              { value: '', header: 'Tất cả' },
              { value: 'Chưa xác định', header: 'Chưa xác định' },
              { value: 'Không giảm thuế', header: 'Không giảm thuế' },
              { value: 'Có giảm thuế', header: 'Có giảm thuế' },
            ], module: "inventoryItem", headerSearch: "Giảm thuế ", comparisonType: '=' },
            width: "200px",
          },
          {
            field: "warrantyPeriod",
            isShow: true,
            header: "Thời hạn bảo hành",
            filter: { typeSearch: "text", columnSearch: "WarrantyPeriod" , typeFilter: "text", module: "inventoryItem", headerSearch: "Thời hạn bảo hành "},
            width: "200px",
          },
          {
            field: "origin",
            isShow: true,
            header: "Nguồn gốc",
            filter: { typeSearch: "text", columnSearch: "Origin" , typeFilter: "text", module: "inventoryItem", headerSearch: "Nguồn gốc "},
            width: "200px",
          },
          {
            field: "description",
            isShow: true,
            header: "Mô tả",
            filter: { typeSearch: "text", columnSearch: "Description" , typeFilter: "text", module: "inventoryItem", headerSearch: "Mô tả "},
            width: "200px",
          },
          {
            field: "explanationBuy",
            isShow: true,
            header: "Diễn giải khi mua",
            filter: { typeSearch: "text", columnSearch: "ExplanationBuy" , typeFilter: "text", module: "inventoryItem", headerSearch: "Diễn giải khi mua "},
            width: "200px",
          }, 
          {
            field: "explanationSell",
            isShow: true,
            header: "Diễn giải khi bán",
            filter: { typeSearch: "text", columnSearch: "ExplanationSell" , typeFilter: "text", module: "inventoryItem", headerSearch: "Diễn giải khi bán "},
            width: "200px",
          },
          {
            field: "vatGroupExciceTax",
            isShow: true,
            header: "Nhóm chịu thuế tiêu thụ đặc biệt",
            filter: { typeSearch: "text", columnSearch: "VatGroupExciceTax" , typeFilter: "text", module: "inventoryItem", headerSearch: "Nhóm chịu thuế tiêu thụ đặc biệt "},
            width: "300px",
          },
          {
            field: "depotName",
            isShow: true,
            header: "Tên nhà kho",
            filter: { typeSearch: "text", columnSearch: "DepotName" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tên nhà kho "},
            width: "200px",
          },
          {
            field: "accountDepot",
            isShow: true,
            header: "Tài khoản kho",
            filter: { typeSearch: "text", columnSearch: "AccountDepot" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tài khoản kho "},
            width: "200px",
          },
          {
            field: "accountRevenue",
            isShow: true,
            header: "Tài khoản doanh thu",
            filter: { typeSearch: "text", columnSearch: "AccountRevenue" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tài khoản doanh thu "},
            width: "200px",
          },
          {
            field: "accountDiscount",
            isShow: true,
            header: "Tài khoản chiết khấu",
            filter: { typeSearch: "text", columnSearch: "AccountDiscount" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tài khoản chiết khấu "},
            width: "200px",
          },
          {
            field: "accountSale",
            isShow: true,
            header: "Tài khoản giảm giá",
            filter: { typeSearch: "text", columnSearch: "AccountSale" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tài khoản giảm giá "},
            width: "200px",
          },
          {
            field: "accountReturn",
            isShow: true,
            header: "Tài khoản trả lại",
            filter: { typeSearch: "text", columnSearch: "AccountReturn" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tài khoản trả lại "},
            width: "200px",
          },
          {
            field: "accountCost",
            isShow: true,
            header: "Tài khoản chi phí",
            filter: { typeSearch: "text", columnSearch: "AccountCost" , typeFilter: "text", module: "inventoryItem", headerSearch: "Tài khoản chi phí "},
            width: "200px",
          },
          {
            field: "ratioDiscount",
            isShow: true,
            header: "Tỉ lệ chiết khấu khuyến mại",
            filter: { typeSearch: "number", columnSearch: "RatioDiscount" , typeFilter: "number", module: "inventoryItem", headerSearch: "Tỉ lệ chiết khấu khuyến mại " },
            textAlign: "right",
            width: "250px",
            fractionSize: true,
          },
          {
            field: "vatTax",
            isShow: true,
            header: "Thuế giá trị gia tăng",
            filter: { typeSearch: "number", columnSearch: "VatTax" , typeFilter: "number", module: "inventoryItem", headerSearch: "Thuế giá trị gia tăng " },
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "vatImport",
            isShow: true,
            header: "Thuế nhập khẩu",
            filter: { typeSearch: "number", columnSearch: "VatImport" , typeFilter: "number", module: "inventoryItem", headerSearch: "Thuế nhập khẩu " },
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "vatExport",
            isShow: true,
            header: "Thuế xuất khẩu",
            filter: { typeSearch: "number", columnSearch: "VatExport" , typeFilter: "number", module: "inventoryItem", headerSearch: "Thuế xuất khẩu " },
            textAlign: "right",
            width: "200px",
            fractionSize: true,
          },
          {
            field: "orderFix",
            isShow: true,
            header: "Đơn mua cố định",
            filter: { typeSearch: "number", columnSearch: "OrderFix" , typeFilter: "number", module: "inventoryItem", headerSearch: "Đơn mua cố định " },
            textAlign: "right",
            fractionSize: true,
            width: "200px",
          },
          {
            field: "orderNearest",
            isShow: true,
            header: "Đơn mua gần nhất",
            filter: { typeSearch: "number", columnSearch: "OrderNearest" , typeFilter: "number", module: "inventoryItem", headerSearch: "Đơn mua gần nhất " },
            textAlign: "right",
            fractionSize: true,
            width: "200px",
          },
          {
            field: "orderSell",
            isShow: true,
            header: "Đơn giá bán",
            filter: { typeSearch: "number", columnSearch: "OrderSell" , typeFilter: "number", module: "inventoryItem", headerSearch: "Đơn giá bán " },
            textAlign: "right",
            fractionSize: true,
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
        const index = state.columns.findIndex(item => item.field === "quantityTock");
        state.columns[index].data = payload.result1;
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
      setFilterCustomSearchSortAction(context, payload){
        context.commit("setFilterCustomSearchSortMutation", payload);
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
  
  export default inventoryItems;
  
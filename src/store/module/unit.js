import { getUnitList } from "../../api/unit";
const unit = {
  namespaced: true,
  state: () => {
    return {
      /**
       * Các hành động của table
       * Khắc Tiềm - 15.09.2022
       */
      actionTable: {
        actionDefault: "Sửa",
        actionList: ["Nhân bản", "Xoá", "Ngừng sử dụng"],
        fieldId: "unitID",
        fieldCode: "unitCode",
      },

      /**
       * Các column của table
       * Khắc Tiềm - 15.09.2022
       */
      columns: [
        {
          field: "unitCode",
          isShow: true,
          header: "Mã đơn vị",
          width: "120px",
        },
        {
          field: "unitName",
          isShow: true,
          header: "Tên đơn vị",
          width: "200px",
        },
      ],

      /**
       * Các Danh sách
       * Khắc Tiềm - 15.09.2022
       */
      unitList: [],

      /**
       * Tổng số lượng bản ghi
       * Khắc Tiềm - 15.09.2022
       */
      totalCount: 0,
    };
  },
  mutations: {
    /**
     * Set danh sách unit
     * @param {Giá trị set} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setUnitListMutation(state, payload) {
      state.unitList = [...payload];
    },
  },
  actions: {
    /**
     * Set danh sách unit
     * @param {Giá trị set} payload 
     * Khắc Tiềm - 15.09.2022
     */
    async getUnitListAction(context, payload) {
      const data = await getUnitList(payload);
      context.commit("setUnitListMutation", data);
    },
  },
};

export default unit;

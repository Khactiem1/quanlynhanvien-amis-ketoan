import { getUnitList } from "../../api/unit";
const unit = {
  namespaced: true,
  state: () => {
    return {
      actionTable: {
        actionDefault: "Sửa",
        actionList: ["Nhân bản", "Xoá", "Ngừng sử dụng"],
        fieldId: "unitID",
        fieldCode: "unitCode",
      },
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
      unitList: [],
      totalCount: 0,
    };
  },
  mutations: {
    //(Khắc Tiềm - 15.09.2022) lấy danh sách unit
    setUnitListMutation(state, payload) {
      state.unitList = [...payload];
    },
  },
  actions: {
    async getUnitListAction(context, payload) {
      const data = await getUnitList(payload);
      context.commit("setUnitListMutation", data);
    },
  },
};

export default unit;

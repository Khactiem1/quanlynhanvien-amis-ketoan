import {
  getUserList,
  createUserApi,
  getUserApi,
  editUserApi,
  deleteUserApi,
} from "../../api/user";
const users = {
  namespaced: true,
  state: () => {
    return {
      actionTable: {
        actionDefault: "Sửa",
        actionList: ["Nhân bản", "Xoá", "Ngừng sử dụng"],
        fieldId: "id",
        fieldCode: "userId",
      },
      columns: [
        {
          field: "userId",
          isShow: true,
          header: "Mã nhân viên",
          width: "120px",
        },
        {
          field: "name",
          isShow: true,
          header: "Tên nhân viên",
          width: "200px",
        },
        { field: "sex", isShow: true, header: "Giới tính", width: "120px" },
        {
          field: "birth",
          isShow: true,
          header: "Ngày sinh",
          textAlign: "center",
          formatDate: true,
          width: "130px",
        }, //formatDate Định dạng hiển thị ngày/tháng/năm
        {
          field: "branchBank",
          isShow: false,
          header: "Chi nhánh ngân hàng",
          width: "200px",
        },
        { field: "cmnd", isShow: true, header: "Số cmnd", width: "150px" },
        { field: "title", isShow: true, header: "Chức danh", width: "120px" },
        { field: "unit", isShow: true, header: "Tên đơn vị", width: "200px" },
        {
          field: "bankAccount",
          isShow: true,
          header: "Số tài khoản",
          width: "150px",
        }, //fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
        {
          field: "nameBank",
          isShow: true,
          header: "Tên ngân hàng",
          width: "180px",
        },
      ],
      userList: [],
      //Biến check xem tất cả các danh sách có được check hay không
      CheckAll: false,
    };
  },
  mutations: {
    // Xét toggle các trường được hiển thị lên giao diện table
    setToggleShowColumnTableMutation(state, payload) {
      state.columns[payload].isShow = !state.columns[payload].isShow;
    },
    // Xét trống mảng user
    setEmptyUserMutation(state) {
      state.userList = [];
    },
    // lấy danh sách user
    setUserListMutation(state, payload) {
      state.userList = [...payload];
    },
    //Xét toggle checkbox phần tử được check
    setCheckboxUserMutation(state, payload) {
      state.userList[payload].Check = !state.userList[payload].Check;
      //Kiểm tra xem tất cả đc check thì nút tất cả cũng sẽ được check
      let checkAllUser = true;
      state.userList.forEach((item) => {
        if (item.Check === false || !item.Check) {
          checkAllUser = false;
          return;
        }
      });
      if (checkAllUser === true) {
        state.CheckAll = true;
      } else {
        state.CheckAll = false;
      }
    },
    //Xét toggle tất cả checkbox được check
    setAllCheckboxUserMutation(state) {
      if (state.CheckAll === true) {
        state.CheckAll = false;
        state.userList.forEach((item, index) => {
          state.userList[index].Check = false;
        });
      } else {
        state.CheckAll = true;
        state.userList.forEach((item, index) => {
          state.userList[index].Check = true;
        });
      }
    },
  },
  actions: {
    async getUserListAction(context) {
      context.commit("setEmptyUserMutation");
      const data = await getUserList();
      context.commit("setUserListMutation", data);
    },
    async editUserAction(context, payload) {
      await editUserApi(payload);
      const data = await getUserList();
      context.commit("setUserListMutation", data);
    },
    async deleteUserAction(context, payload) {
      await deleteUserApi(payload);
      const data = await getUserList();
      context.commit("setUserListMutation", data);
    },
    async getUserAction(context, payload) {
      return await getUserApi(payload);
    },
    async addUserAction(context, payload) {
      await createUserApi(payload);
      const data = await getUserList();
      context.commit("setUserListMutation", data);
    },
    setCheckboxUserAction(context, payload) {
      context.commit("setCheckboxUserMutation", payload);
    },
    setAllCheckboxUserAction(context) {
      context.commit("setAllCheckboxUserMutation");
    },
    setToggleShowColumnTableAction(context, payload) {
      context.commit("setToggleShowColumnTableMutation", payload);
    },
  },
};

export default users;

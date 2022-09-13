import { getUserList, createUserApi, getUserApi, editUserApi } from "../../api/user";
const users = {
  namespaced: true,
  state: () => {
    return {
      actionTable: {
        actionDefault: "Sửa",
        actionList: ["Nhân bản", "Xoá", "Ngừng sử dụng"],
        fieldId: 'id'
      },
      columns: [
        { field: "userId", header: "Mã nhân viên" },
        { field: "name", header: "Tên nhân viên", width: "150px" },
        { field: "sex", header: "Giới tính" },
        {
          field: "birth",
          header: "Ngày sinh",
          textAlign: "center",
          formatDate: true,
        },//formatDate Định dạng hiển thị ngày/tháng/năm
        { field: "branchBank", header: "Chi nhánh ngân hàng" },
        { field: "cmnd", header: "Số cmnd", },
        { field: "title", header: "Chức danh" },
        { field: "unit", header: "Tên đơn vị" },
        { field: "bankAccount", header: "Số tài khoản", }, //fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
        { field: "nameBank", header: "Tên ngân hàng" },
      ],
      userList: [],
      //Biến check xem tất cả các danh sách có được check hay không
      CheckAll: false,
    };
  },
  mutations: {
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
      const data = await getUserList();
      context.commit("setUserListMutation", data);
    },
    async editUserAction(context,payload) {
      await editUserApi(payload);
      const data = await getUserList();
      context.commit("setUserListMutation", data);
    },
    async getUserAction(context,payload) {
      return await getUserApi(payload);
    },
    async addUserAction(context,payload) {
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
  },
};

export default users;

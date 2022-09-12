import { getUserList } from "../../api/user";
const users = {
  namespaced: true,
  state: () => {
    return {
      actionTable: {
        actionDefault: "Sửa",
        actionList: ["Nhân bản", "Xoá", "Ngừng sử dụng"],
      },
      columns: [
        { field: "Id", header: "Mã nhân viên" },
        { field: "Name", header: "Tên nhân viên", width: "150px" },
        { field: "Sex", header: "Giới tính" },
        {
          field: "Birth",
          header: "Ngày sinh",
          textAlign: "center",
          formatDate: true,
        },
        { field: "BranchBank", header: "Chi nhánh ngân hàng" },
        { field: "Cmnd", header: "Số cmnd", fractionSize: true },
        { field: "Title", header: "Chức danh" },
        { field: "Unit", header: "Tên đơn vị" },
        { field: "BankAccount", header: "Số tài khoản" },
        { field: "NameBank", header: "Tên ngân hàng" },
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
    async getUserListAction(context, payload) {
      const data = await getUserList(payload);
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

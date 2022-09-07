const users = {
  namespaced: true,
  state: () => {
    return {
      actionTable: {
        actionDefault: 'Sửa',
        actionList: [
          'Nhân bản','Xoá','Ngừng sử dụng',
        ]
      }
      ,
      columns: [
        { field: 'Id', header: 'Mã nhân viên', width: '120px' },
        { field: 'Name', header: 'Tên nhân viên', width: '120px' },
        { field: 'Sex', header: 'Giới tính', width: '120px' },
        { field: 'Birth', header: 'Ngày sinh', width: '120px' },
        { field: 'BranchBank', header: 'Chi nhánh ngân hàng', width: '120px' },
        { field: 'Cmnd', header: 'Số cmnd', width: '120px' },
        { field: 'Title', header: 'Chức danh', width: '120px' },
        { field: 'Unit', header: 'Tên đơn vị', width: '120px' },
        { field: 'BankAccount', header: 'Số tài khoản', width: '120px' },
        { field: 'NameBank', header: 'Tên ngân hàng', width: '120px' },
      ]
      ,
      userList: [
        {
          Check: false,
          Id: "NV00001",
          Name: "Nguyễn Khắc Tiềm",
          Sex: "Nam",
          Birth: "23/03/2001",
          Cmnd: "033201005206",
          Title: "Lập trình viên",
          Unit: "Misa",
          BankAccount: "19036301282015",
          NameBank: "Techcombank",
          BranchBank: "Hưng Yên",
          DateRange: "10/06/2016",
          GrantAddress: "Đại Hưng",
          PhoneNumber: "0362335462",
          LandlinePhone: "0362335462",
          Email: "nguyenkhactiem2k1@gmail.com",
          Address: "Đại Hưng - Khoái Châu - Hưng Yên",
        },
        {
          Check: false,
          Id: "NV00002",
          Name: "Đỗ Văn Mạnh",
          Sex: "Nam",
          Birth: "16/03/2001",
          Cmnd: "033201005206",
          Title: "Lập trình viên",
          Unit: "Misa",
          BankAccount: "19036301282015",
          NameBank: "Techcombank",
          BranchBank: "Hưng Yên",
          DateRange: "10/06/2016",
          GrantAddress: "Đại Hưng",
          PhoneNumber: "0362335462",
          LandlinePhone: "0362335462",
          Email: "nguyenkhactiem2k1@gmail.com",
          Address: "Đại Hưng - Khoái Châu - Hưng Yên",
        },
      ],
      //Biến check xem tất cả các danh sách có được check hay không
      CheckAll: false,
    };
  },
  mutations: {
    //Xét toggle checkbox phần tử được check
    setCheckboxUserMutation(state, payload) {
      if (state.userList[payload].Check === true) {
        state.userList[payload].Check = false;
      } else {
        state.userList[payload].Check = true;
      }
      //Kiểm tra xem tất cả đc check thì nút tất cả cũng sẽ được check
      let checkAllUser = true;
      state.userList.forEach((item) => {
        if(item.Check === false){
          checkAllUser = false;
          return;
        }
      });
      if(checkAllUser === true){
        state.CheckAll = true;
      }
      else{
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
    setCheckboxUserAction(context, payload) {
      context.commit("setCheckboxUserMutation", payload);
    },
    setAllCheckboxUserAction(context) {
      context.commit("setAllCheckboxUserMutation");
    },
  },
};

export default users;

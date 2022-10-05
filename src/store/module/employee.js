import { getEmployeeList } from "../../api/employee";
const employees = {
  namespaced: true,
  state: () => {
    return {
      actionTable: {
        actionDefault: 'Sửa',
        actionList: ['Nhân bản', 'Xoá', 'Ngừng sử dụng'],
        fieldId: "employeeID",
        fieldCode: "employeeCode",
      },
      columns: [
        {
          field: "employeeCode",
          isShow: true,
          header: "Mã nhân viên",
          width: "120px",
        },
        {
          field: "employeeName",
          isShow: true,
          header: "Tên nhân viên",
          width: "200px",
        },
        {
          field: "gender",
          isShow: true,
          header: "Giới tính",
          width: "120px",
          isGender: true,
        },
        {
          field: "dateOfBirth",
          isShow: true,
          header: "Ngày sinh",
          textAlign: "center",
          formatDate: true,
          width: "130px",
        }, //(Khắc Tiềm - 15.09.2022)formatDate Định dạng hiển thị ngày/tháng/năm
        {
          field: "branchBank",
          isShow: true,
          header: "Chi nhánh ngân hàng",
          width: "200px",
        },
        {
          field: "identityCard",
          isShow: true,
          header: "Số chứng minh",
          width: "200px",
        },
        {
          field: "employeeTitle",
          isShow: true,
          header: "Chức danh",
          width: "120px",
        },
        {
          field: "unitName",
          isShow: true,
          header: "Tên đơn vị",
          width: "200px",
        },
        {
          field: "bankAccount",
          isShow: true,
          header: "Số tài khoản",
          width: "150px",
        }, //(Khắc Tiềm - 15.09.2022)fractionSize: true ,fractionSize Thêm dấu phẩy vào đơn vị tiền tệ
        {
          field: "nameBank",
          isShow: true,
          header: "Tên ngân hàng",
          width: "180px",
        },
        {
          field: "dayForIdentity",
          isShow: true,
          header: "Ngày cấp chứng minh",
          textAlign: "center",
          width: "180px",
          formatDate: true,
        },
        {
          field: "grantAddressIdentity",
          isShow: true,
          header: "Nơi cấp chứng minh",
          width: "230px",
        },
        {
          field: "phoneNumber",
          isShow: true,
          header: "Số điện thoại",
          width: "230px",
        },
        {
          field: "landlinePhone",
          isShow: true,
          header: "Điện thoại cố định",
          width: "230px",
        },
        {
          field: "employeeEmail",
          isShow: true,
          header: "Địa chỉ email",
          width: "230px",
        },
        {
          field: "employeeAddress",
          isShow: true,
          header: "Địa chỉ",
          width: "200px",
        },
      ],
      employeeList: [],
      totalCount: 0,
      filter: {
        offset: 0,
        limit: 0,
        keyword: "",
      },
    };
  },
  mutations: {
    //(Khắc Tiềm - 15.09.2022) Xét toggle các trường được hiển thị lên giao diện table
    setToggleShowColumnTableMutation(state, payload) {
      state.columns[payload].isShow = !state.columns[payload].isShow;
    },
    //(Khắc Tiềm - 15.09.2022) lấy danh sách Employee
    setEmployeeListMutation(state, payload) {
      state.employeeList = [...payload.recordList];
      state.totalCount = payload.totalCount;
    },
    //(Khắc Tiềm - 15.09.2022)Xét toggle checkbox phần tử được check
    setCheckboxEmployeeMutation(state, payload) {
      state.employeeList[payload].Check = !state.employeeList[payload].Check;
    },
    //(Khắc Tiềm - 15.09.2022)Xét toggle tất cả checkbox được check
    setAllCheckboxEmployeeMutation(state) {
      if (
        state.employeeList.filter((value) => value.Check).length ===
        state.employeeList.length
      ) {
        state.employeeList = state.employeeList.reduce((acc, cur) => {
          return [...acc, { ...cur, Check: false }];
        }, []);
      } else {
        state.employeeList = state.employeeList.reduce((acc, cur) => {
          return [...acc, { ...cur, Check: true }];
        }, []);
      }
    },
    setFilterMutation(state, payload) {
      state.filter = { ...payload };
    },
  },
  actions: {
    async getEmployeeListAction(context, payload) {
      if (payload) {
        await context.commit("setFilterMutation", payload);
      }
      await getEmployeeList(context.state.filter)
        .then(function (response) {
          context.commit("setEmployeeListMutation", response);
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
    },
    setCheckboxEmployeeAction(context, payload) {
      context.commit("setCheckboxEmployeeMutation", payload);
    },
    setAllCheckboxEmployeeAction(context) {
      context.commit("setAllCheckboxEmployeeMutation");
    },
    setToggleShowColumnTableAction(context, payload) {
      context.commit("setToggleShowColumnTableMutation", payload);
    },
  },
};

export default employees;

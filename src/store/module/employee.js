import { getEmployeeList } from "../../api/employee";
const employees = {
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
        fieldId: "employeeID",
        fieldCode: "employeeCode",
      },

      /**
       * Các column của table
       * Khắc Tiềm - 15.09.2022
       */
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

      /**
       * Các Danh sách
       * Khắc Tiềm - 15.09.2022
       */
      employeeList: [],

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
    setEmployeeListMutation(state, payload) {
      state.employeeList = [...payload.recordList];
      state.totalCount = payload.totalCount;
    },

    /**
     * Xét toggle checkbox phần tử được check
     * @param {index các nhân viên được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setCheckboxEmployeeMutation(state, payload) {
      state.employeeList[payload].Check = !state.employeeList[payload].Check;
    },

    /**
     * Xét toggle tất cả checkbox được check
     * Khắc Tiềm - 15.09.2022
     */
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

    /**
     * Set các giá trị tìm kiếm và phân trang khi call apie
     * @param {giá trị set} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setFilterMutation(state, payload) {
      state.filter = { ...payload };
    },
  },
  actions: {
    /**
     * Lấy ra dánh sách nhân viên
     * @param {Giá trị set filter} payload 
     * Khắc Tiềm - 15.09.2022
     */
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
          context.rootState.config.notifications.push({
            ...{
              type: "error",
              message: "Đã xảy ra lỗi mạng."
            },
            id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
          })
        });
    },

    /**
     * Xét toggle checkbox phần tử được check
     * @param {index các nhân viên được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setCheckboxEmployeeAction(context, payload) {
      context.commit("setCheckboxEmployeeMutation", payload);
    },

    /**
     * Xét toggle tất cả checkbox được check
     * Khắc Tiềm - 15.09.2022
     */
    setAllCheckboxEmployeeAction(context) {
      context.commit("setAllCheckboxEmployeeMutation");
    },

    /**
     * Xét toggle các trường được hiển thị lên giao diện table
     * @param {index được toggle} payload 
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowColumnTableAction(context, payload) {
      context.commit("setToggleShowColumnTableMutation", payload);
    },
  },
};

export default employees;

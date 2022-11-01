export default {
  //Cảnh báo xoá nhân viên
  WANNING_DELETE: "Bạn có thực sự muốn xoá bản ghi ",

  // Hỏi lưu khi có dữ liệu thay đổi
  QUESTION_DATA_CHANGE: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",

  // thông báo khi dữ liệu bị để trống
  ERROR_EMPTY_DATA: "Không được để trống ",

  // thông báo khi nhập sai định dạng
  ERROR_CORRECT_DATA: "Kiểm tra nhập đúng ",

  // cảnh báo khi thực hiện xoá hàng loạt
  WANNING_DELETE_ALL: "Bạn có thực sự muốn xoá toàn bộ bản ghi được chọn?",

  // thông báo khi bị trùng mã
  DUPLICATE_CODE : "đã tồn tại trong hệ thống, vui lòng kiểm tra lại.",

  // thông báo khi nhập sai dữ liệu đầu vào
  INVALID_INPUT : "Sai dữ liệu đầu vào, vui lòng kiểm tra lại",

  // Thông báo dành cho các trường riêng khi validate thêm, sửa
  employeeNotification:{
    validateCode: 'Mã nhân viên không được để trống.',
    validateName: 'Tên nhân viên không được để trống.',
    validateUnit: 'Dữ liệu <đơn vị> không có trong danh mục.',
    validatePhoneNumber: 'Không đúng định dạng số điện thoại di động.',
    validateLandlinePhone: 'Không đúng định dạng số điện thoại cố định.',
    validateEmail: 'Không đúng định dạng Email.',
    validateDateOfBirth : 'Ngày sinh phải nhỏ hơn ngày hiện tại.',
    validateDayForIdentity : 'Ngày cấp phải nhỏ hơn ngày hiện tại.',
    nameDuplicateCode: 'Mã nhân viên',
  },
  unitCalculationNotification:{
    validateName: 'Đơn vị không được để trống',
  },
  depotNotification:{
    validateCode: 'Mã kho không được để trống',
    validateName: 'Tên kho không được để trống',
  },
  commodityGroupNotification:{
    validateCode: 'Mã nhóm nguyên vật liệu không được để trống',
    validateName: 'Tên nhóm nguyên vật liệu không được để trống',
  },
  inventoryItemNotification:{
    validateCode: 'Mã hàng hoá không được để trống.',
    validateName: 'Tên không được để trống.',
    validateUnit: 'Đơn vị không có trong danh mục.',
  },
};

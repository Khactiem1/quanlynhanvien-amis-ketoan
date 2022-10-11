import axiosAPI from ".";

/**
 * API lấy tất cả danh sách nhân viên tìm kiếm và phân trang
 * @returns Danh sách nhân viên và tổng số lượng
 * Khắc Tiềm - 15.09.2022
 */
export const getEmployeeList = (filter) => {
  return axiosAPI.get(`/Employees/fitter?offset=${filter.offset}&limit=${filter.limit}&keyword=${filter.keyword}`);
};

/**
 * API thêm nhân viên
 * @returns Guid nhân viên
 * Khắc Tiềm - 15.09.2022
 */
export const createEmployeeApi = (employee) => {
  return axiosAPI.post(`/Employees`, employee)
};

/**
 * API lấy chi tiết nhân viên theo id
 * @returns Chi tiết nhân viên
 * Khắc Tiềm - 15.09.2022
 */
export const getEmployeeApi = (id) => {
  return axiosAPI.get(`/Employees/${id}`);
};

/**
 * API Sửa nhân viên
 * @returns Guid nhân viên
 * Khắc Tiềm - 15.09.2022
 */
export const editEmployeeApi = (employee) => {
  return axiosAPI.put(`/Employees/${employee.employeeID}`, employee);
};

/**
 * API xoá nhân viên
 * @returns Guid nhân viên
 * Khắc Tiềm - 15.09.2022
 */
export const deleteEmployeeApi = (id) => {
  return axiosAPI.delete(`/Employees/${id}`)
};

/**
 * API lấy mã nhân viên mới
 * @returns Mã nhân viên
 * Khắc Tiềm - 15.09.2022
 */
export const nextValue = () => {
  return axiosAPI.get(`/Employees/next_value`);
};

/**
 * API xoá nhiều nhân viên
 * Khắc Tiềm - 15.09.2022
 */
export const deleteMultipleApi = (listID) => {
  return axiosAPI.post(`/Employees/bulk_delete`, listID);
};

/**
 * API export data 
 * @returns file nhân viên excel
 * Khắc Tiềm - 15.09.2022
 */
export const exportDataApi = () => {
  return axiosAPI.get(`/Employees/export_data`);
};

import axiosAPI from ".";

/**
 * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
 * @returns Danh sách bản ghi và tổng số lượng
 * Khắc Tiềm - 15.09.2022
 */
const getRecordList = (filter) => {
  return axiosAPI.post(`/Employees/fitter`, filter);
};

/**
 * API thêm bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const createRecordApi = (employee) => {
  return axiosAPI.post(`/Employees`, employee)
};

/**
 * API lấy chi tiết bản ghi theo id
 * @returns Chi tiết bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getRecordApi = (id) => {
  return axiosAPI.get(`/Employees/${id}`);
};

/**
 * API Sửa bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const editRecordApi = (employee) => {
  return axiosAPI.put(`/Employees/${employee.employeeID}`, employee);
};

/**
 * API xoá bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteRecordApi = (id) => {
  return axiosAPI.delete(`/Employees/${id}`)
};

/**
 * API lấy mã bản ghi mới
 * @returns Mã bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const nextValue = () => {
  return axiosAPI.get(`/Employees/next_value`);
};

/**
 * API xoá nhiều bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteMultipleApi = (listID) => {
  return axiosAPI.post(`/Employees/bulk_delete`, listID);
};

/**
 * API export data 
 * @returns file bản ghi excel
 * Khắc Tiềm - 15.09.2022
 */
const exportDataApi = () => {
  return axiosAPI.get(`/Employees/export_data`);
};

/**
 * API Active toggle sử dụng
 * Khắc Tiềm - 15.09.2022
 */
 const toggleActiveApi = (id) => {
  return axiosAPI.get(`/Employees/ToggleActive/${id}`);
};

export default {
  exportDataApi,
  deleteMultipleApi,
  nextValue,
  deleteRecordApi,
  editRecordApi,
  getRecordList,
  createRecordApi,
  getRecordApi,
  toggleActiveApi,
}
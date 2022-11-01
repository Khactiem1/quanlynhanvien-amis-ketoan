import axiosAPI from ".";

/**
 * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
 * @returns Danh sách bản ghi và tổng số lượng
 * Khắc Tiềm - 15.09.2022
 */
const getRecordList = (filter) => {
  return axiosAPI.get(`/Depots/fitter?offset=${filter.offset}&limit=${filter.limit}&keyword=${filter.keyword}`);
};

/**
 * API thêm bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const createRecordApi = (employee) => {
  return axiosAPI.post(`/Depots`, employee)
};

/**
 * API lấy chi tiết bản ghi theo id
 * @returns Chi tiết bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getRecordApi = (id) => {
  return axiosAPI.get(`/Depots/${id}`);
};

/**
 * API Sửa bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const editRecordApi = (employee) => {
  return axiosAPI.put(`/Depots/${employee.depotID}`, employee);
};

/**
 * API xoá bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteRecordApi = (id) => {
  return axiosAPI.delete(`/Depots/${id}`)
};

/**
 * API export data 
 * @returns file bản ghi excel
 * Khắc Tiềm - 15.09.2022
 */
const exportDataApi = () => {
  return axiosAPI.get(`/Depots/export_data`);
};

/**
 * API Active toggle sử dụng
 * Khắc Tiềm - 15.09.2022
 */
 const toggleActiveApi = (id) => {
  return axiosAPI.get(`/Depots/ToggleActive/${id}`);
};
 const getAllRecordList = () => {
  return axiosAPI.get(`/Depots`);
};
const getAllRecordListActive = () => {
  return axiosAPI.get(`/Depots/active`);
};

export default {
  exportDataApi,
  deleteRecordApi,
  editRecordApi,
  getRecordList,
  createRecordApi,
  getRecordApi,
  toggleActiveApi,
  getAllRecordList,
  getAllRecordListActive,
}
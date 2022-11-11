import axiosAPI from ".";

/**
 * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
 * @returns Danh sách bản ghi và tổng số lượng
 * Khắc Tiềm - 15.09.2022
 */
const getRecordList = (filter) => {
  return axiosAPI.post(`/UnitCalculations/fitter`, filter);
};

/**
 * Lấy ra tất cả bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getAllRecordList = () => {
  return axiosAPI.get(`/UnitCalculations`);
};
/**
 * API thêm bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const createRecordApi = (employee) => {
  return axiosAPI.post(`/UnitCalculations`, employee)
};

/**
 * API lấy chi tiết bản ghi theo id
 * @returns Chi tiết bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getRecordApi = (id) => {
  return axiosAPI.get(`/UnitCalculations/${id}`);
};

/**
 * API Sửa bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const editRecordApi = (employee) => {
  return axiosAPI.put(`/UnitCalculations/${employee.unitCalculationID}`, employee);
};

/**
 * API xoá bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteRecordApi = (id) => {
  return axiosAPI.delete(`/UnitCalculations/${id}`)
};

/**
 * API export data 
 * @returns file bản ghi excel
 * Khắc Tiềm - 15.09.2022
 */
const exportDataApi = () => {
  return axiosAPI.get(`/UnitCalculations/export_data`);
};

/**
 * API Active toggle sử dụng
 * Khắc Tiềm - 15.09.2022
 */
 const toggleActiveApi = (id) => {
  return axiosAPI.get(`/UnitCalculations/ToggleActive/${id}`);
};

/**
 * Lấy ra tất cả bản ghi đang hoạt động
 * Khắc Tiềm - 15.09.2022
 */
 const getAllRecordListActive = () => {
  return axiosAPI.get(`/UnitCalculations/active`);
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
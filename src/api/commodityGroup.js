import axiosAPI from ".";
/**
 * Lấy ra tất cả bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getAllRecordList = () => {
  return axiosAPI.get(`/CommodityGroups`);
};

/**
 * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
 * @returns Danh sách bản ghi và tổng số lượng
 * Khắc Tiềm - 15.09.2022
 */
const getRecordList = (filter) => {
  return axiosAPI.post(`/CommodityGroups/fitter`, filter);
};

/**
 * API thêm bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const createRecordApi = (employee) => {
  return axiosAPI.post(`/CommodityGroups`, employee)
};

/**
 * API lấy chi tiết bản ghi theo id
 * @returns Chi tiết bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getRecordApi = (id) => {
  return axiosAPI.get(`/CommodityGroups/${id}`);
};

/**
 * API Sửa bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const editRecordApi = (employee) => {
  return axiosAPI.put(`/CommodityGroups/${employee.commodityGroupID}`, employee);
};

/**
 * API xoá bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteRecordApi = (id) => {
  return axiosAPI.delete(`/CommodityGroups/${id}`)
};

/**
 * API export data 
 * @returns file bản ghi excel
 * Khắc Tiềm - 15.09.2022
 */
const exportDataApi = () => {
  return axiosAPI.get(`/CommodityGroups/export_data`);
};

/**
 * API Active toggle sử dụng
 * Khắc Tiềm - 15.09.2022
 */
 const toggleActiveApi = (id) => {
  return axiosAPI.get(`/CommodityGroups/ToggleActive/${id}`);
};

/**
 * Lấy ra tất cả bản ghi đang hoạt động
 * Khắc Tiềm - 15.09.2022
 */
 const getAllRecordListActive = () => {
  return axiosAPI.get(`/CommodityGroups/active`);
};
export default {
  exportDataApi,
  deleteRecordApi,
  editRecordApi,
  getRecordList,
  createRecordApi,
  getRecordApi,
  getAllRecordList,
  toggleActiveApi,
  getAllRecordListActive,
}
import axiosAPI from ".";

/**
 * API lấy tất cả danh sách bản ghi tìm kiếm và phân trang
 * @returns Danh sách bản ghi và tổng số lượng
 * Khắc Tiềm - 15.09.2022
 */
const getRecordList = (filter) => {
  return axiosAPI.get(`/InventoryItems/fitter?offset=${filter.offset}&limit=${filter.limit}&keyword=${filter.keyword}`);
};

/**
 * API thêm bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const createRecordApi = (employee) => {
  return axiosAPI.post(`/InventoryItems`, employee)
};

/**
 * API lấy chi tiết bản ghi theo id
 * @returns Chi tiết bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getRecordApi = (id) => {
  return axiosAPI.get(`/InventoryItems/${id}`);
};

/**
 * API Sửa bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const editRecordApi = (employee) => {
  return axiosAPI.put(`/InventoryItems/${employee.inventoryItemID}`, employee);
};

/**
 * API xoá bản ghi
 * @returns Guid bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteRecordApi = (id) => {
  return axiosAPI.delete(`/InventoryItems/${id}`)
};

/**
 * API lấy mã bản ghi mới
 * @returns Mã bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const nextValue = () => {
  return axiosAPI.get(`/InventoryItems/next_value`);
};

/**
 * API xoá nhiều bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const deleteMultipleApi = (listID) => {
  return axiosAPI.post(`/InventoryItems/bulk_delete`, listID);
};

/**
 * API export data 
 * @returns file bản ghi excel
 * Khắc Tiềm - 15.09.2022
 */
const exportDataApi = () => {
  return axiosAPI.get(`/InventoryItems/export_data`);
};

/**
 * API Active toggle sử dụng
 * Khắc Tiềm - 15.09.2022
 */
 const toggleActiveApi = (id) => {
    return axiosAPI.get(`/InventoryItems/ToggleActive/${id}`);
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
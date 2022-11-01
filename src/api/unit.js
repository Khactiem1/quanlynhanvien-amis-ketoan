import axiosAPI from ".";

/**
 * API lấy tất cả danh sách bản ghi
 * @returns Danh sách bản ghi
 * Khắc Tiềm - 15.09.2022
 */
const getRecordList = () => {
  return axiosAPI.get(`/Units`)
};

export default {
  getRecordList,
}
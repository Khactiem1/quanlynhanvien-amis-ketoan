import axiosAPI from ".";

/**
 * API lấy tất cả danh sách đơn vị
 * @returns Danh sách đơn vị
 * Khắc Tiềm - 15.09.2022
 */
export const getUnitList = () => {
  return axiosAPI.get(`/Units`).catch(function (error) {
    console.log(error.toJSON());
  });
};
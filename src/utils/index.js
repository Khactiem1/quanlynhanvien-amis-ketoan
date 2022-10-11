/**
 * hàm lấy ra số lượng bản ghi muốn hiển thị
 * @returns Số lượng bản ghi lưu trong local trước đó
 * Khắc Tiềm - 15.09.2022
 */
const getCountRecordPageEmployee = () => {
  const countRecordPageEmployee = localStorage.getItem("countRecordPageEmployee");
  if (countRecordPageEmployee) {
    return countRecordPageEmployee;
  } else {
    // nếu chưa từng lưu số lượng bản ghi thì 20 là số lượng bản ghi được lấy ra mặc định
    localStorage.setItem("countRecordPageEmployee", 20);
    return 20;
  }
};

/**
 * hàm lưu số lượng bản ghi muốn hiển thị vào local
 * @param {Số lượng bản ghi} record 
 * Khắc Tiềm - 15.09.2022
 */
const setCountRecordPageEmployee = (record) => {
  localStorage.setItem("countRecordPageEmployee", record);
};

/**
 * Hàm định dạng ngày theo kiểu dd/MM/YYYY
 * @param {Ngày cần định dạng} date 
 * @returns Dữ liệu đã định dạng
 * Khắc Tiềm - 15.09.2022
 */
const formatDateDDMMYYYY = (date) => {
  if ((date === null) | (date == "")) {
    return null;
  } else {
    const d = new Date(date);
    let getMonth = d.getMonth() + 1 + "";
    if (getMonth.length === 1) {
      getMonth = `0${getMonth}`;
    }
    let getDate = d.getDate() + "";
    if (getDate.length === 1) {
      getDate = `0${getDate}`;
    }
    return [getDate, getMonth, d.getFullYear()].join("/");
  }
};

/**
 * Hàm định dạng ngày theo kiểu YYYY/MM/dd
 * @param {Ngày cần định dạng} date 
 * @returns Dữ liệu đã định dạng
 * Khắc Tiềm - 15.09.2022
 */
const formatDateYYYYMMDD = (date) => {
  if ((date === null) | (date == "")) {
    return null;
  } else {
    const d = new Date(date);
    let getMonth = d.getMonth() + 1 + "";
    if (getMonth.length === 1) {
      getMonth = `0${getMonth}`;
    }
    let getDate = d.getDate() + "";
    if (getDate.length === 1) {
      getDate = `0${getDate}`;
    }
    return [d.getFullYear(), getMonth, getDate].join("-");
  }
};
export default {
  getCountRecordPageEmployee,
  setCountRecordPageEmployee,
  formatDateDDMMYYYY,
  formatDateYYYYMMDD,
};

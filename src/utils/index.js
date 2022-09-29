// hàm lấy ra số lượng bản ghi muốn hiển thị
const getCountRecordPageUser = () => {
  const countRecordPageUser = localStorage.getItem("countRecordPageUser");
  if (countRecordPageUser) {
    return countRecordPageUser;
  } else {
    // nếu chưa từng lưu số lượng bản ghi thì 20 là số lượng bản ghi được lấy ra mặc định
    localStorage.setItem("countRecordPageUser", 20);
    return 20;
  }
};
const setCountRecordPageUser = (record) => {
  localStorage.setItem("countRecordPageUser", record);
};
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
  getCountRecordPageUser,
  setCountRecordPageUser,
  formatDateDDMMYYYY,
  formatDateYYYYMMDD,
};

/**
 * hàm lấy ra số lượng bản ghi muốn hiển thị
 * @returns Số lượng bản ghi lưu trong local trước đó
 * Khắc Tiềm - 15.09.2022
 */
const getCountRecordPageRecord = () => {
  const countRecordPageRecord = localStorage.getItem("countRecordPageRecord");
  if (countRecordPageRecord) {
    return Number(countRecordPageRecord);
  } else {
    // nếu chưa từng lưu số lượng bản ghi thì 20 là số lượng bản ghi được lấy ra mặc định
    localStorage.setItem("countRecordPageRecord", 20);
    return 20;
  }
};

/**
 * hàm lưu số lượng bản ghi muốn hiển thị vào local
 * @param {Số lượng bản ghi} record 
 * Khắc Tiềm - 15.09.2022
 */
const setCountRecordPageRecord = (record) => {
  localStorage.setItem("countRecordPageRecord", record);
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

const Comma = (number)=> {
  if(number || number === 0){
    let intPart = Math.trunc(number); 
    const floatPart = Number((number - intPart).toFixed(10));
    intPart = "" + intPart;
    if (intPart.length > 3) {
      var mod = intPart.length % 3;
      var output = mod > 0 ? intPart.substring(0, mod) : "";
      for (let i = 0; i < Math.floor(intPart.length / 3); i++) {
        if (mod == 0 && i == 0)
          output += intPart.substring(mod + 3 * i, mod + 3 * i + 3);
        else output += "." + intPart.substring(mod + 3 * i, mod + 3 * i + 3);
      }
      return floatPart !== 0 ? output + ',' + (floatPart + '').slice( 2 ) : output;
    } else return floatPart !== 0 ? intPart + ',' + (floatPart + '').slice( 2 ) : intPart;
  }
  else return '';
};

/**
 * 
 * @param {*} array 
 * @param {*} idRecord 
 * @returns 
 */
const listToTree = (array, idRecord) => {
  array = array.sort(function() {
    return -1;
  });
  const data = [];
  function recursiveData(id,text = ''){
    for (let i = array.length - 1; i >= 0; i--){
      if(array[i].parentID == id){
        array[i].bindHTMLChild = text ;
        data.push(array[i]);
        recursiveData(array[i][idRecord], text + '&ensp;');
      }
    }
  }
  recursiveData('0');
  array.forEach(item => {
    let check = false;
    data.forEach(i => {
      if(item[idRecord] === i[idRecord]){
        check = true;
      }
    })
    if(check === false){
      data.push(item);
    }
  });
  return data;
}

export default {
  getCountRecordPageRecord,
  setCountRecordPageRecord,
  formatDateDDMMYYYY,
  formatDateYYYYMMDD,
  listToTree,
  Comma,
};

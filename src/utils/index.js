// hàm lấy ra số lượng bản ghi muốn hiển thị
const getCountRecordPageUser = () => {
  const countRecordPageUser = localStorage.getItem("countRecordPageUser");
  if(countRecordPageUser){
    return countRecordPageUser;
  }
  else{
    // nếu chưa từng lưu số lượng bản ghi thì 20 là số lượng bản ghi được lấy ra mặc định
    localStorage.setItem("countRecordPageUser", 20);
    return 20;
  }
}
const setCountRecordPageUser = (record) => {
  localStorage.setItem("countRecordPageUser", record);
}
export default {
 getCountRecordPageUser,
 setCountRecordPageUser,
};

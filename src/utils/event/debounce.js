/**
     * Chứa hàm setTimeOut sẽ thực hiện tìm kiếm khi tìm kiếm
     * Khắc Tiềm - 15.09.2022
     */
 const eventSearchInput = [];

 /**
  * Hàm xử lý tìm kiếm dữ liệu
  * @param {event để lấy giá trị nhập} event 
  * Khắc Tiềm - 15.09.2022
  */
 const handleDebounce = (timeOut, handle, data) => {
   eventSearchInput.forEach((item) => {
     clearTimeout(item);
   });
   eventSearchInput.length = 0;
   eventSearchInput.push(
     setTimeout(() => {
        handle(data);
     }, timeOut)
   );
 };

 export default handleDebounce;
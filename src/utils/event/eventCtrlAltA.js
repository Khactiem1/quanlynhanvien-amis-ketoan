import eNum from "../../utils/eNum";
/**
     * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
     * NK Tiềm 28/10/2022
     */
 const { CTRL, ALT, A } = eNum;
/**
     * lưu lại giá trị các phím bấm tắt không ngắt quãng
     * NK Tiềm 28/10/2022
     */
 const eventCtrlAltA = [];

 /**
  * Hàm xử lý các event nút bấm tắt
  * NK Tiềm 28/10/2022
  */
  const handleEventCtrlAltA = function (event, handle, dataHandle) {
   if (
     event.keyCode === CTRL ||
     event.keyCode === ALT ||
     event.keyCode === A
   ) {
     if (!eventCtrlAltA.includes(event.keyCode)) {
       eventCtrlAltA.push(event.keyCode);
       if (eventCtrlAltA.length === 3) {
         // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
         eventCtrlAltA.length = 0;
         handle(dataHandle);
       }
     }
   }
 };

 /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện
  * NK Tiềm 28/10/2022
  */
 const handleEventInterruptCtrlAltA = function (event) {
   if (
     event.keyCode === CTRL ||
     event.keyCode === ALT ||
     event.keyCode === A
   ) {
     if (eventCtrlAltA.includes(event.keyCode)) {
       eventCtrlAltA.length = 0;
     }
   }
 };

 export default {
    handleEventCtrlAltA,
    handleEventInterruptCtrlAltA,
 }
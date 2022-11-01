import eNum from "../../utils/eNum";
/**
     * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
     * NK Tiềm 28/10/2022
     */
 const { CTRL, SHIFT, ESC, S } = eNum;
/**
     * lưu lại giá trị các phím bấm tắt không ngắt quãng
     * NK Tiềm 28/10/2022
     */
 const eventCtrlShiftS = [];

 /**
  * Hàm xử lý các event nút bấm tắt
  * NK Tiềm 28/10/2022
  */
 const handleEventFormCtrlShiftS = function (event, handleEsc, dataEsc, handleCtrlShiftS, dataCtrlShiftS, handleCtrlS, dataCtrlS) {
   if (event.keyCode === ESC) {
    handleEsc(dataEsc);
   } else if (
     event.keyCode === CTRL ||
     event.keyCode === SHIFT ||
     event.keyCode === S
   ) {
     if (!eventCtrlShiftS.includes(event.keyCode)) {
       eventCtrlShiftS.push(event.keyCode);
       if (eventCtrlShiftS.length === 3) {
         // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
         eventCtrlShiftS.length = 0;
         handleCtrlShiftS(dataCtrlShiftS);
       } else if (eventCtrlShiftS.length === 2) {
         // Nếu số lượng nút bấm mà === 2 trong đó k có nút shift thì sẽ là chức năng khác
         if (!eventCtrlShiftS.includes(SHIFT)) {
           //Không cho trình duyệt mở save as khi bấm ctrl + s
           event.preventDefault(); 
           eventCtrlShiftS.length = 0;
           handleCtrlS(dataCtrlS);
         }
       }
     }
   }
 };

 /**
  * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện
  * NK Tiềm 28/10/2022
  */
 const handleEventInterruptFormCtrlShiftS = function (event) {
   if (
     event.keyCode === CTRL ||
     event.keyCode === SHIFT ||
     event.keyCode === S
   ) {
     if (eventCtrlShiftS.includes(event.keyCode)) {
       eventCtrlShiftS.length = 0;
     }
   }
 };
 export default {
    handleEventFormCtrlShiftS,
    handleEventInterruptFormCtrlShiftS,
 }
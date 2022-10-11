export default {
  /**
   * Hàm xử lý kiểm tra định dạng email
   * @param {Email cần validate} email 
   * @returns Trả về true là định dạng đúng và false là định dạng sai
   * Khắc Tiềm - 15.09.2022
   */
  validateEmail: (email) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    return regex.test(email);
  },

  /**
   * Hàm xử lý kiểm tra định dạng sdt
   * @param {sdt cần validate} sdt 
   * @returns Trả về true là định dạng đúng và false là định dạng sai
   * Khắc Tiềm - 15.09.2022
   */
  validatePhone: (sdt) => {
    var regex = /(03|02|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/; //eslint-disable-line
    return regex.test(sdt);
  },
};

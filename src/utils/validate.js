export default {
  isEmail: (email) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line
    return regex.test(email);
  },
  isPhone: (sdt) => {
    var regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/; //eslint-disable-line
    return regex.test(sdt);
  },
};

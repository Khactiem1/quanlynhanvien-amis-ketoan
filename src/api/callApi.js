import eNum from '../utils/eNum';
/**
     * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
     * NK Tiềm 28/10/2022
     */
const { MessageErrorInternet, TypeError } = eNum;

/**
 * Hàm xử lý call api
 *  NK Tiềm 28/10/2022
 * @param {*} Api api
 * @param {*} data dữ liệu gửi kèm api
 * @param {*} thenApi call back khi call api xong 
 * @param {*} store biến store kích hoạt các thông báo khi call api xong
 * @param {*} noLoaderAnimation có hiệu ứng loader api hay không
 * @param {*} catchApi call back khi xảy ra lỗi
 */
 async function callApi(Api, data, thenApi, store, noLoaderAnimation, catchApi) {
    if(!noLoaderAnimation){
      store.dispatch("config/setToggleShowLoaderAction");
    }
    await Api(data)
      .then(function(response){
        if(!noLoaderAnimation){
          store.dispatch("config/setToggleShowLoaderAction");
        }
        if(response.success){
          if(thenApi){
            thenApi(response.data)
          }
        }
        else{
          if(catchApi){
            catchApi();
          }
          if(response.errorCode === eNum.Incurred){
            store.dispatch("config/setToggleShowNotificationErrorAction", response.data.userMsg);
          }
          else{
            store.dispatch("config/addNotification", {
              type: TypeError,
              message: response.data.userMsg
            });
          }
        }
      })
      .catch(function () {
        if(catchApi){
          catchApi();
        }
        if(!noLoaderAnimation){
          store.dispatch("config/setToggleShowLoaderAction");
        }
        store.dispatch("config/addNotification", {
            type: TypeError,
            message: MessageErrorInternet
          });
      });
  }

  export default callApi;
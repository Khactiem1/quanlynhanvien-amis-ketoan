const config = {
  namespaced: true,
  state: () => {
    return {
      /**
       * Trạng thái mở rộng sidebar
       * Khắc Tiềm - 15.09.2022
       */
      showSidebar: true,

      /**
       * Trạng thái show loader 
       * Khắc Tiềm - 15.09.2022
       */
      isShowLoader: false,

      /**
       * Chứa danh sách thông báo
       * Khắc Tiềm - 15.09.2022
       */
      notifications: [],

      /**
       * Trạng thái show thông báo   
       * Khắc Tiềm - 15.09.2022
       */
       isShowNotificationWanning: false,

       /**
        * Config thông báo wanning
        * Khắc Tiềm - 15.09.2022
        */
       configNotificationWanning: {
          cancelAction: {
            display: "Không",
            action: ()=>{},
          },
          agreeAction: {
            display: "Có",
            action: ()=>{},
          },
          messageAction: {
            display: '',
            id: '',
          },
       },

       /**
       * Trạng thái show thông báo   
       * Khắc Tiềm - 15.09.2022
       */
        isShowNotificationError: false,
        
        /**
        * Config thông báo error
        * Khắc Tiềm - 15.09.2022
        */
       configNotificationError: {
        agreeAction: {
          display: "Đóng",
          action: ()=>{},
        },
        messageAction: {
          display: '',
        },
      },

      /**
       * Trạng thái show thông báo   
       * Khắc Tiềm - 15.09.2022
       */
       isShowNotificationQuestion: false,

       /**
        * Config thông báo Question
        * Khắc Tiềm - 15.09.2022
        */
        configNotificationQuestion: {
          cancelAction: {
            display: "Huỷ",
            action: ()=>{},
          },
          agreeAction: {
            display: "Có",
            refuseActionDisplay: "Không",
            refuseAction: ()=>{},
            action: ()=>{},
          },
          messageAction: {
            display: '',
          },
        },
    };
  },
  mutations: {
    /**
     * Mở thông báo wanning
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowNotificationWanningMutation(state, payload) {
      state.configNotificationWanning.cancelAction.action = ()=> {
        state.isShowNotificationWanning = false;
      }
      state.configNotificationWanning.agreeAction.action = (id)=> {
        state.isShowNotificationWanning = false;
        payload.action(id);
      }
      state.configNotificationWanning.messageAction.display = payload.message;
      if(payload.id){
        state.configNotificationWanning.messageAction.id = payload.id;
      }
      state.isShowNotificationWanning = true;
    },

    /**
     * Mở thông báo error
     * Khắc Tiềm - 15.09.2022
     */
     setToggleShowNotificationErrorMutation(state, payload) {
      state.configNotificationError.agreeAction.action = ()=> {
        state.isShowNotificationError = false;
      }
      state.configNotificationError.messageAction.display = payload;
      state.isShowNotificationError = true;
    },

    /**
     * Mở thông báo Question
     * Khắc Tiềm - 15.09.2022
     */
     setToggleShowNotificationQuestionMutation(state, payload) {
      state.configNotificationQuestion.cancelAction.action = ()=> {
        state.isShowNotificationQuestion = false;
      }
      state.configNotificationQuestion.agreeAction.action = ()=> {
        state.isShowNotificationQuestion = false;
        payload.action();
      }
      state.configNotificationQuestion.agreeAction.refuseAction = ()=> {
        state.isShowNotificationQuestion = false;
        payload.refuseAction();
      }
      state.configNotificationQuestion.messageAction.display = payload.message;
      state.isShowNotificationQuestion = true;
    },

    /**
     * Set mở rộng, thu nhỏ sidebar
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowSidebarMutation(state) {
      state.showSidebar = !state.showSidebar;
    },

    /**
     * Set ẩn hiện hiệu ứng loader
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowLoaderMutation(state) {
      state.isShowLoader = !state.isShowLoader;
    },

    /**
     * Thêm thông báo
     * Khắc Tiềm - 15.09.2022
     */
     PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
      })
    },

    /**
     * Xoá thông báo
     * Khắc Tiềm - 15.09.2022
     */
     REMOVE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
        return notification.id != notificationToRemove.id;
      })
    },
  },
  actions: {
    /**
         * Mở thông báo wanning
         * Khắc Tiềm - 15.09.2022
         */
    setToggleShowNotificationWanningAction(context, payload) {
      context.commit("setToggleShowNotificationWanningMutation", payload);
    },

    /**
         * Mở thông báo error
         * Khắc Tiềm - 15.09.2022
         */
     setToggleShowNotificationErrorAction(context, payload) {
      context.commit("setToggleShowNotificationErrorMutation", payload);
    },

    /**
         * Mở thông báo Question
         * Khắc Tiềm - 15.09.2022
         */
     setToggleShowNotificationQuestionAction(context, payload) {
      context.commit("setToggleShowNotificationQuestionMutation", payload);
    },

    /**
     * Set mở rộng, thu nhỏ sidebar
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowSidebarAction(context) {
      context.commit("setToggleShowSidebarMutation");
    },

    /**
     * Set ẩn hiện hiệu ứng loader
     * Khắc Tiềm - 15.09.2022
     */
    setToggleShowLoaderAction(context) {
      context.commit("setToggleShowLoaderMutation");
    },

    /**
     * Thêm thông báo
     * Khắc Tiềm - 15.09.2022
     */
    addNotification(context, notification){
      context.commit('PUSH_NOTIFICATION', notification);
    },

    /**
     * Xoá thông báo
     * Khắc Tiềm - 15.09.2022
     */
     removeNotification(context, notification){
      context.commit('REMOVE_NOTIFICATION', notification);
    },
  },
};
export default config;

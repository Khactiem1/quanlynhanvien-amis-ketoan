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
    };
  },
  mutations: {
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

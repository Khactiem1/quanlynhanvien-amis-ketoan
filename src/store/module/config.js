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
  },
};
export default config;

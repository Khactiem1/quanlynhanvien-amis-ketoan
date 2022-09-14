const config = {
  namespaced: true,
  state: () => {
    return {
      showSidebar: true,
      isShowLoader: false,
    };
  },
  mutations: {
    setToggleShowSidebarMutation(state) {
      state.showSidebar = !state.showSidebar;
    },
    setToggleShowLoaderMutation(state) {
      state.isShowLoader = !state.isShowLoader;
    },
  },
  actions: {
    setToggleShowSidebarAction(context) {
      context.commit("setToggleShowSidebarMutation");
    },
    setToggleShowLoaderAction(context) {
      context.commit("setToggleShowLoaderMutation");
    },
  },
};
//store.dispatch("config/setToggleShowLoaderAction");
export default config;

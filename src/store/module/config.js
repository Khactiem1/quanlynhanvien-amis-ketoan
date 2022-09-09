const config = {
  namespaced: true,
  state: () => {
    return {
      showSidebar: true,
    };
  },
  mutations: {
    setToggleShowSidebarMutation(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
  actions: {
    setToggleShowSidebarAction(context) {
      context.commit("setToggleShowSidebarMutation");
    },
  },
};

export default config;

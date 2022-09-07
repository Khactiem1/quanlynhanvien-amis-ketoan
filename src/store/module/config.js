const config = {
  namespaced: true,
  state: () => {
    return {
      showSidebar: true,
      positionActionTable: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        widthElement: 0,
        heightElement: 0,
      },
    };
  },
  mutations: {
    setToggleShowSidebarMutation(state) {
      if (state.showSidebar === true) {
        state.showSidebar = false;
      } else {
        state.showSidebar = true;
      }
    },
    setPositionActionTableMutation(state, payload) {
      state.positionActionTable.top = payload.top;
      state.positionActionTable.right = payload.right;
      state.positionActionTable.heightElement = payload.heightElement;
    },
  },
  actions: {
    setToggleShowSidebarAction(context) {
      context.commit("setToggleShowSidebarMutation");
    },
    setPositionActionTableAction(context, payload) {
      context.commit("setPositionActionTableMutation", payload);
    },
  },
};

export default config;

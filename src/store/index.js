import { createStore } from 'vuex';
import config from './module/config';
import user from './module/user';

const store = createStore({
  modules: {
    config,
    user,
  },
});

export default store;
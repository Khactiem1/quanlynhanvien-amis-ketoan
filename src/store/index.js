import { createStore } from 'vuex';
import config from './module/config';
import user from './module/user';
import unit from './module/unit';

const store = createStore({
  modules: {
    config,
    user,
    unit,
  },
});

export default store;
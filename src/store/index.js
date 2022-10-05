import { createStore } from 'vuex';
import config from './module/config';
import employee from './module/employee';
import unit from './module/unit';

const store = createStore({
  modules: {
    config,
    employee,
    unit,
  },
});

export default store;
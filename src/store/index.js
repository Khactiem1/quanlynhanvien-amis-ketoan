import { createStore } from 'vuex';
import config from './module/config';
import employee from './module/employee';
import unitCalculation from './module/unitCalculation';
import depot from './module/depot';
import commodityGroup from './module/commodityGroup';
import inventoryItem from './module/inventoryItem';

const store = createStore({
  modules: {
    config,
    employee,
    unitCalculation,
    depot,
    commodityGroup,
    inventoryItem,
  },
});

export default store;
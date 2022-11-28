import { createRouter, createWebHistory } from "vue-router";
function lazyLoad(view){
  return() => import(`@/view/${view}.vue`)
}
const routes = [
  {
    path: "/",
    component: lazyLoad('HomePage'),
    beforeEnter(to, from, next) {
      document.title = `Trang chủ`;
      next();
    },
  },
  {
    path: "/home",
    redirect: "/",
    beforeEnter(to, from, next) {
      document.title = 'Trang chủ';
      next();
    },
  },
  {
    path: "/nhanvien",
    beforeEnter(to, from, next) {
      document.title = 'Nhân viên';
      next();
    },
    component: lazyLoad('EmployeeView/EmployeePage'),
  },
  {
    path: "/warehouse",
    beforeEnter(to, from, next) {
      document.title = 'Kho';
      next();
    },
    component: lazyLoad('WarehouseView/WarehousePage'),
  },
  {
    path: "/DIInventoryItemCategory",
    beforeEnter(to, from, next) {
      document.title = 'Nhóm vật tư, hàng hoá, dịch vụ';
      next();
    },
    component: lazyLoad('WarehouseView/DIInventoryItemCategory/DIInventoryItemCategoryPage'),
  },
  {
    path: "/Unit",
    beforeEnter(to, from, next) {
      document.title = 'Đơn vị tính';
      next();
    },
    component: lazyLoad('WarehouseView/Unit/UnitPage'),
  },
  {
    path: "/Depot",
    beforeEnter(to, from, next) {
      document.title = 'Nhà kho';
      next();
    },
    component: lazyLoad('WarehouseView/Depot/DepotPage'),
  },
  {
    path: "/InventoryItem",
    beforeEnter(to, from, next) {
      document.title = 'Hàng hoá dịch vụ';
      next();
    },
    component: lazyLoad('WarehouseView/InventoryItem/InventoryItemPage'),
  },
  {
    path: "/:pathMatch(.*)*",
    component: lazyLoad('NotFoundPage'),
    beforeEnter(to, from, next) {
      document.title = 'Không tìm thấy trang';
      next();
    },
  }, //có thể dùng redirect
  // {path: '/about/:userId', component: AboutComponent},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;

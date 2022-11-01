import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../view/NotFoundPage";
import EmployeePage from "../view/EmployeeView/EmployeePage";
import DIInventoryItemCategoryPage from "../view/WarehouseView/DIInventoryItemCategory/DIInventoryItemCategoryPage";
import DepotPage from "../view/WarehouseView/Depot/DepotPage";
import UnitPage from "../view/WarehouseView/Unit/UnitPage";
import WarehousePage from "../view/WarehouseView/WarehousePage";
import InventoryItemPage from "../view/WarehouseView/InventoryItem/InventoryItemPage";
import HomePage from "../view/HomePage";
const routes = [
  {
    path: "/",
    component: HomePage,
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
    component: EmployeePage,
  },
  {
    path: "/warehouse",
    beforeEnter(to, from, next) {
      document.title = 'Kho';
      next();
    },
    component: WarehousePage,
  },
  {
    path: "/DIInventoryItemCategory",
    beforeEnter(to, from, next) {
      document.title = 'Nhóm vật tư, hàng hoá, dịch vụ';
      next();
    },
    component: DIInventoryItemCategoryPage,
  },
  {
    path: "/Unit",
    beforeEnter(to, from, next) {
      document.title = 'Đơn vị tính';
      next();
    },
    component: UnitPage,
  },
  {
    path: "/Depot",
    beforeEnter(to, from, next) {
      document.title = 'Nhà kho';
      next();
    },
    component: DepotPage,
  },
  {
    path: "/InventoryItem",
    beforeEnter(to, from, next) {
      document.title = 'Hàng hoá dịch vụ';
      next();
    },
    component: InventoryItemPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
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

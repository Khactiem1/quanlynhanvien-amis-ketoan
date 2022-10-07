import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "../view/NotFoundPage";
import EmployeePage from "../view/EmployeeView/EmployeePage";
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

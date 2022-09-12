<template>
  <div class="sidebar">
    <div class="logo-sidebar">
      <a v-if="showSidebar" class="logo-sidebar_home"></a>
      <a v-if="showSidebar" class="logo-sidebar_menu">
        <img
          src="../../public/asset/logo/logo_event_trungthu.090d014b.svg" alt=""
        />
      </a>
      <div v-if="!showSidebar" @click="handleToggleSidebar" class="logo-sidebar_active"></div>
    </div>
    <div class="menu-sidebar">
      <router-link to="/" class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tổng quan</div>
      </router-link>
      <router-link to="/nhanvien" class="menu-sidebar_item nhanvien-page">
        <div
          style="background-position: -73px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tiền mặt</div>
      </router-link>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -117px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Tiền gửi</div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -161px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Mua hàng</div>
      </a>
      <a class="menu-sidebar_item">
        <div
          style="background-position: -204px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Bán hàng</div>
      </a>
      <router-link to="/test404" class="menu-sidebar_item dashboard-page">
        <div
          style="background-position: -30px -1628px"
          class="menu-sidebar_icon"
        ></div>
        <div v-if="showSidebar" class="menu-sidebar_text">Test trang 404</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup(){
    const store = useStore();
    let showSidebar = computed(() => store.state.config.showSidebar);
    //Hàm sử lý sự kiện toggle sidebar
    function handleToggleSidebar(){
      store.dispatch("config/setToggleShowSidebarAction");
    }
    return{
      showSidebar,
      handleToggleSidebar,
    }
  }

};
</script>

<style scoped>
/* chia sidebar 
----------------------------
*/
.sidebar {
  position: relative;
  width: auto;
  background-color: var(--menu__color);
  width: auto;
  height: 100vh;
  top: 0;
  left: 0;
}

/* Phần logo sidebar */
.logo-sidebar {
  display: flex;
  align-items: center;
  padding: 10px 18px;
  height: var(--height__header);
}
.logo-sidebar_home {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  margin-left: 6px;
  background: var(--url__icon) no-repeat -424px -86px;
}
.logo-sidebar_menu {
  margin-right: 6px;
}
.logo-sidebar_menu img {
  height: 32px;
  vertical-align: middle;
  transform: scale(1.15);
}
.logo-sidebar_active {
  background: var(--url__icon) no-repeat;
  background-position: -316px -37px;
  width: 16px;
  height: 14px;
  cursor: pointer;
}

/* Phần menu */
.menu-sidebar {
  padding-top: 14px;
}
.menu-sidebar_item {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--while__color);
  height: 42px;
}
.menu-sidebar_item.active {
  background-color: var(--menu__color-active);
}
.menu-sidebar_item:hover {
  background-color: var(--menu__color-active);
}
.menu-sidebar_item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
}
.menu-sidebar_item.active::before {
  background-color: var(--primary__color);
}
.menu-sidebar_icon {
  background: var(--url__icon) no-repeat;
  width: 24px;
  height: 24px;
  margin-left: 14px;
}
.menu-sidebar_text {
  line-height: 42px;
  margin-left: 7px;
}
/* Khi được active thì sẽ dùng icon khác màu trắng */
.nhanvien-page.active .menu-sidebar_icon {
  background-position: -73px -1585px !important;
}
.dashboard-page.active .menu-sidebar_icon {
  background-position: -30px -1585px !important;
}
.menu-sidebar_item.active .menu-sidebar_text {
  font-family: "notosans-bold";
}
</style>

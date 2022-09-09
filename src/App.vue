<template>
  <div class="wrapper">
    <the-sidebar></the-sidebar>
    <div class="content">
      <the-header></the-header>
      <router-view></router-view>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
  setup(){
  }
};
</script>

<style>
@font-face {
  font-family: notosans-bold;
  src: url(../public/asset/fonts/notosans-bold.3ede5aff.woff2);
}
@font-face {
  font-family: notosans-italic;
  src: url(../public/asset/fonts/notosans-italic.1c1aaac9.woff2);
}
@font-face {
  font-family: notosans-regular;
  src: url(../public/asset/fonts/notosans-regular.2cb88a13.woff2);
}
@font-face {
  font-family: notosans-semibold;
  src: url(../public/asset/fonts/notosans-semibold.df3e6dc4.woff2);
}
@import "../public/asset/css/base.css";
@import "../public/asset/css/button.css";
@import "../public/asset/css/combobox.css";
@import "../public/asset/css/input.css";
#app {
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--background__color);
  color: var(--text__color);
  text-align: left;
  font-weight: 400;
  font-size: 13px;
  min-width: 1024px;
  min-height: 768px;
}
.content{
    flex: 1;
    height: 100vh;
    width: 100%;
    overflow: hidden;
}
</style>

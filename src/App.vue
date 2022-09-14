<template>
  <div class="wrapper">
    <the-sidebar></the-sidebar>
    <div class="content">
      <the-header></the-header>
      <router-view></router-view>
    </div>
    <teleport to="#app">
      <loader-animation v-if="isShowLoader"></loader-animation>
    </teleport>
  </div>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheHeader from "./components/TheHeader.vue";
import LoaderAnimation from "./components/SharedComponents/LoaderAnimation.vue";
import { useStore } from "vuex";
import { ref, computed } from "vue";

export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    LoaderAnimation,
  },
  setup() {
    const store = useStore();
    let isShowLoader = ref(false);
    isShowLoader = computed(() => store.state.config.isShowLoader);
    return {
      isShowLoader,
    };
  },
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
.content {
  flex: 1;
  height: 100vh;
  width: 100%;
  overflow-y:auto;
}
</style>

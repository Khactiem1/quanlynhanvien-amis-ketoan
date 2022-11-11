<template>
  <div class="wrapper">
    <the-sidebar></the-sidebar>
    <div class="content">
      <the-header></the-header>
      <router-view></router-view>
    </div>
    <teleport to="#app">
      <loader-animation v-show="isShowLoader"></loader-animation>
      <the-top-message-list />
      <notification-modal v-if="isShowNotificationWanning">
        <notification-wanning
          :cancelAction="configNotificationWanning.cancelAction"
          :agreeAction="configNotificationWanning.agreeAction"
          :messageAction="configNotificationWanning.messageAction"
        ></notification-wanning>
      </notification-modal>
      <notification-modal v-if="isShowNotificationError">
        <notification-error
          :agreeAction="configNotificationError.agreeAction"
          :messageAction="configNotificationError.messageAction"
        ></notification-error>
      </notification-modal>
      <notification-modal v-if="isShowNotificationQuestion">
          <notification-question
            :cancelAction="configNotificationQuestion.cancelAction"
            :agreeAction="configNotificationQuestion.agreeAction"
            :messageAction="configNotificationQuestion.messageAction"
          ></notification-question>
        </notification-modal>
    </teleport>
  </div>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheHeader from "./components/TheHeader.vue";
import LoaderAnimation from "./components/TheLoader.vue";
import TheTopMessageList from "./components/TheTopMessageList.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import NotificationModal from './components/NotificationComponent/NotificationModal.vue';
import NotificationQuestion from './components/NotificationComponent/NotificationQuestion.vue';
import NotificationError from './components/NotificationComponent/NotificationError.vue';
import NotificationWanning from './components/NotificationComponent/NotificationWanning.vue';

export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    LoaderAnimation,
    TheTopMessageList,
    NotificationModal,
    NotificationQuestion,
    NotificationError,
    NotificationWanning,
  },
  setup() {
    /**
     * Biến store trong vuex
     * Khắc Tiềm - 15.09.2022
     */
    const store = useStore();

    /**
     * Biến lưu trạng thái loader 
     * Khắc Tiềm - 15.09.2022
     */
    const isShowLoader = computed(() => store.state.config.isShowLoader);

    /**
     * Biến lưu trạng thái thông báo 
     * Khắc Tiềm - 15.09.2022
     */
     const isShowNotificationWanning = computed(() => store.state.config.isShowNotificationWanning);

     const configNotificationWanning = computed(() => store.state.config.configNotificationWanning);

     /**
     * Biến lưu trạng thái thông báo  
     * Khắc Tiềm - 15.09.2022
     */
    const isShowNotificationError = computed(() => store.state.config.isShowNotificationError);

    const configNotificationError = computed(() => store.state.config.configNotificationError);

    /**
     * Biến lưu trạng thái thông báo  
     * Khắc Tiềm - 15.09.2022
     */
     const isShowNotificationQuestion = computed(() => store.state.config.isShowNotificationQuestion);

     const configNotificationQuestion = computed(() => store.state.config.configNotificationQuestion);
    return {
      isShowLoader,
      isShowNotificationWanning,
      configNotificationWanning,
      isShowNotificationError,
      configNotificationError,
      isShowNotificationQuestion,
      configNotificationQuestion,
    };
  },
};
</script>

<style>
@font-face {
  font-family: notosans-semibold;
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
  font-family: notosans-bold ;
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
h1{
  font-size: 24px;
  font-family: 'notosans-bold';
}
.content {
  flex: 1;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>

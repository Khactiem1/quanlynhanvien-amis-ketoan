<template>
  <div class="notifications-list">
    <the-top-message
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import TheTopMessage from "./TheTopMessage.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    TheTopMessage,
  },
  setup(){
    /**
     * Biến store trong vuex
     * Khắc Tiềm - 15.09.2022
     */
    const store = useStore();

    /**
     * Chứa các thông báo
     * Khắc Tiềm - 15.09.2022
     */
    const notifications = computed(() => store.state.config.notifications);
    return {
      notifications,
    }
  }
};
</script>

<style>
.notifications-list {
  position: fixed;
  top: 0;
  right: 0;
  min-width: 450px;
  max-width: 450px;
  z-index: 20;
  margin-right: 10px;
  margin-top: 10px;
  transition: all ease 0.2s;
}
</style>

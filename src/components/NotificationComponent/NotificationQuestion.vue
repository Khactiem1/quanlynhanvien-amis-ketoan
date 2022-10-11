<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-question"></div>
      <div class="modal-notification_mess">{{ messageAction.display }}</div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button
          tabindex="2"
          v-if="cancelAction"
          @click="cancelAction.action"
          class="btn"
        >
          {{ cancelAction.display }}
        </button>
      </div>
      <div class="modal-notification_action-item">
        <button tabindex="1" @click="agreeAction.refuseAction" class="btn">
          {{ agreeAction.refuseActionDisplay }}
        </button>
        <button
          ref="elmAgree"
          tabindex="3"
          @click="agreeAction.action"
          class="btn btn-success"
        >
          {{ agreeAction.display }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    cancelAction: {
      type: Object,
    },
    agreeAction: {
      type: Object,
    },
    messageAction: {
      type: Object,
    },
  },
  setup() {
    /**
     * Biến chứa element nút bấm 
     * Khắc Tiềm - 15.09.2022
     */
    const elmAgree = ref(null);

    /**
     * Khi mounted thì sẽ focus vào một nút chỉ định
     * Khắc Tiềm - 15.09.2022
     */
    onMounted(() => {
      elmAgree.value.focus();
    });
    return {
      elmAgree,
    };
  },
};
</script>

<style></style>

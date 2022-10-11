<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-error"></div>
      <div v-html="messageAction.display" class="modal-notification_mess"></div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button
          ref="elmAgree"
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
    agreeAction: {
      type: Object,
    },
    messageAction: {
      type: Object,
    },
  },
  setup() {
    const elmAgree = ref(null);
    onMounted(() => {
      elmAgree.value.focus();
    });
    return {
      elmAgree,
    };
  },
};
</script>

<style scoped>
.modal-notification_action {
  justify-content: end;
}
</style>

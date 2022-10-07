<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-error"></div>
      <div class="modal-notification_mess">{{ messageAction.display }}</div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button @click="agreeAction.action" class="btn btn-success">
          {{ agreeAction.display }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    agreeAction: {
      type: Object,
    },
    messageAction: {
      type: Object,
    },
  },
};
</script>

<style scoped>
  .modal-notification_action{
    justify-content: end;
  }
</style>

<template>
  <div class="modal-notification_content">
    <div class="modal-notification_body">
      <div class="modal-notification_icon icon-wanning"></div>
      <div class="modal-notification_mess">{{ messageAction.display }}</div>
    </div>
    <div class="mess-line_notification"></div>
    <div class="modal-notification_action">
      <div class="modal-notification_action-item">
        <button v-if="cancelAction" @click="cancelAction.action" class="btn">
          {{ cancelAction.display }}
        </button>
      </div>
      <div class="modal-notification_action-item">
        <button @click="agreeAction.action(messageAction.id)" class="btn btn-success">
          {{ agreeAction.display }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style></style>

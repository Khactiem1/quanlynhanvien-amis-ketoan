<template>
  <div class="data-input" :class="{ 'is-valid': isValid }">
    <label :class="{ required: required }">{{ label }}</label>
    <input
      ref="tagInput"
      class="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :tabindex="tab"
      @input="handleInput"
    />
    <span class="message-valid">{{ messageValid }}</span>
  </div>
</template>

<script>
import { ref, onMounted, toRefs } from "vue";
export default {
  props: [
    "modelValue",
    "placeholder",
    "required",
    "type",
    "messageValid",
    "label",
    "focus",
    "tab",
  ],
  emits: ["update:modelValue"],
  setup(props, context) {
    const tagInput = ref(null);
    const { focus, required } = toRefs(props);
    const isValid = ref(false);
    //Sau khi được mounted vào dom thì nếu đc chỉ định focus ô input sẽ đc focus
    onMounted(() => {
      if (focus.value === true) {
        setTimeout(() => {
          tagInput.value.focus();
        }, 150);
      }
    });
    function handleInput(event) {
      context.emit("update:modelValue", event.target.value);
      if (required.value) {
        if (event.target.value.trim() == "") {
          isValid.value = true;
        }
      } else {
        isValid.value = false;
      }
    }

    return {
      tagInput,
      isValid,
      handleInput,
    };
  },
};
</script>

<style></style>

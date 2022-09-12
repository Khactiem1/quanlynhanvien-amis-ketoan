<template>
  <div class="data-input">
    <label :class="{ required: required }">{{ label }}</label>
    <input
      ref="tagInput"
      class="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :tabindex="tab"
      @input="$emit('update:modelValue', $event.target.value)"
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
  setup(props) {
    const tagInput = ref(null);
    //Sau khi được mounted vào dom thì nếu đc chỉ định focus ô input sẽ đc focus
    onMounted(() => {
      const { focus } = toRefs(props);
      if (focus.value === true) {
        setTimeout(() => {
          tagInput.value.focus();
        }, 150);
      }
    });

    return {
      tagInput,
    };
  },
};
</script>

<style></style>

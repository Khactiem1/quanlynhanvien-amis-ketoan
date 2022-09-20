<template>
  <div class="data-input" :class="{ 'is-valid': isValid | isValidEmailPhone }">
    <label :class="{ required: required }">{{ label }}</label>
    <span v-if="toolTip" class="tool-tip">
      {{ toolTip }}
    </span>
    <input
      ref="tagInput"
      class="input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :tabindex="tab"
      @input="handleInput"
      @blur="handleCheckEmailPhone"
    />
    <span class="message-valid">{{ messageValid }}</span>
  </div>
</template>

<script>
import { ref, onMounted, toRefs } from "vue";
import validate from "../../utils/validate.js";
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
    "toolTip",
    "isPhone",
    "isEmail",
  ],
  emits: ["update:modelValue"],
  setup(props, context) {
    const tagInput = ref(null);
    const { focus, required, isEmail, isPhone } = toRefs(props);
    const isValid = ref(false);
    const isValidEmailPhone = ref(false);
    const { validateEmail, validatePhone } = validate;
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
      isValidEmailPhone.value = false;
      if (required.value) {
        if (event.target.value == "") {
          isValid.value = true;
        } else {
          isValid.value = false;
        }
      }
    }
    function handleCheckEmailPhone(event) {
      if (event.target.value != "") {
        if (isEmail.value) {
          if (validateEmail(event.target.value) === false) {
            isValidEmailPhone.value = true;
          } else {
            isValidEmailPhone.value = false;
          }
        } else if (isPhone.value) {
          if (validatePhone(event.target.value) === false) {
            isValidEmailPhone.value = true;
          } else {
            isValidEmailPhone.value = false;
          }
        }
      }
    }

    return {
      tagInput,
      isValid,
      isValidEmailPhone,
      handleCheckEmailPhone,
      handleInput,
    };
  },
};
</script>

<style>
.data-input {
  position: relative;
}
.tool-tip {
  position: absolute;
  left: 18px;
  top: 202x;
  background-color: #505050;
  border-radius: 2px;
  padding: 2px 4px;
  z-index: 3;
  text-align: center;
  visibility: hidden;
  opacity: 0;
  color: var(--while__color);
}
.data-input label:hover ~ .tool-tip {
  visibility: visible;
  opacity: 1;
}
</style>

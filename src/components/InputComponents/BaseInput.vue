<template>
  <div class="data-input" :class="{ 'is-valid': isValid | isValidEmailPhone }">
    <label :class="{ required: required }">{{ label }}</label>
    <span v-if="toolTip" class="tool-tip">
      {{ toolTip }}
    </span>
    <input
      @keypress="isInputNumber($event)"
      ref="tagInput"
      class="input"
      :type="type"
      :value="valueHeader"
      :placeholder="placeholder"
      :tabindex="tab"
      @input="handleInput"
      @blur="handleCheckEmailPhone"
      :class="{'is-number' : isNumber}"
    />
    <span class="message-valid" :style="{left : leftMessage}">{{ messageValid }}</span>
  </div>
</template>

<script>
import { ref, onMounted, toRefs } from "vue";
import validate from "../../utils/validate.js";
export default {
  props: [
    "modelValue",
    "maxLength",
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
    "isNumber",
    "leftMessage",
  ],
  emits: ["update:modelValue"],
  setup(props, context) {
    /**
     * Element thẻ input
     * Khắc Tiềm - 15.09.2022
     */
    const tagInput = ref(null);

    /**
     * focus: có focus khi mounted
     * required: có bắt buộc hay k
     * isEmail: Là email hay k
     * isPhone: là sdt hay k
     * maxLength: độ dài max là value
     * modelValue: v-model
     * isNumber: là số hay k
     * Khắc Tiềm - 15.09.2022
     */
    const { focus, required, isEmail, isPhone, maxLength, modelValue, isNumber } = toRefs(props);

    const valueHeader = ref('');

    /**
     * Trạng thái hiển thị validate
     * Khắc Tiềm - 15.09.2022
     */
    const isValid = ref(false);

    /**
     * trạng thái hiển thị validate email, phone
     * Khắc Tiềm - 15.09.2022
     */
    const isValidEmailPhone = ref(false);

    /**
     * Lấy ra hàm validate email và phone
     * Khắc Tiềm - 15.09.2022
     */
    const { validateEmail, validatePhone } = validate;

    /**
     * Sau khi được mounted vào dom thì nếu đc chỉ định focus ô input sẽ đc focus
     * Khắc Tiềm - 15.09.2022
     */
    onMounted(() => {
      if (focus.value === true) {
        setTimeout(() => {
          tagInput.value.focus();
        }, 150);
      }
    });

    /**
     * hàm xử lý nhập input và validate
     * Khắc Tiềm - 15.09.2022
     */
    function handleInput(event) {
      if (maxLength.value && !isNumber.value) {
        if (event.target.value.length <= maxLength.value) {
          context.emit("update:modelValue", event.target.value);
          valueHeader.value = event.target.value;
          isValidEmailPhone.value = false;
          if (required.value) {
            if (event.target.value.trim() == "") {
              isValid.value = true;
            } else {
              isValid.value = false;
            }
          }
        }
        else{
          tagInput.value.value = modelValue.value;
          valueHeader.value = modelValue.value;
        }
      }
      else if(isNumber.value){
        if(checkNumber(event.target.value) || event.target.value === ''){
          valueHeader.value = event.target.value;
          context.emit("update:modelValue", event.target.value);
        }
        else{
          valueHeader.value = modelValue.value;
        }
      }
      else {
        context.emit("update:modelValue", event.target.value);
        valueHeader.value = event.target.value;
        isValidEmailPhone.value = false;
        if (required.value) {
          if (event.target.value == "") {
            isValid.value = true;
          } else {
            isValid.value = false;
          }
        }
      }
    }

    /**
     * hàm xử lý validate điện thoại và email
     * Khắc Tiềm - 15.09.2022
     */
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

    /**
     * Hàm xử lý chỉ cho nhập số
     * Khắc Tiềm - 15.09.2022
     */
    function isInputNumber(evt) {
      if(isNumber.value){
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    }
    function checkNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
    return {
      tagInput,
      isValid,
      valueHeader,
      isValidEmailPhone,
      isInputNumber,
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
  background-color: #505050;
  border-radius: 3px;
  padding: 2px 4px;
  z-index: 3;
  text-align: center;
  visibility: hidden;
  opacity: 0;
  color: var(--while__color);
  white-space: nowrap;
}
.data-input label:hover ~ .tool-tip {
  visibility: visible;
  opacity: 1;
}
.is-number{
  text-align: right;
}
</style>

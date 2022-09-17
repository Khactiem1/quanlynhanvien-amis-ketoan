<template>
  <!-- @click="handleClickCheckbox" -->
  <label class="check">
    <!-- Thêm active vào đây -->
    <!-- :class="{ active: checkbox }" -->
    <input
      class="checkbox"
      type="checkbox"
      :id="id"
      v-model="computedValue"
      :name="name"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :true-value="trueValue"
      :false-value="falseValue"
      :value="value"
      :checked="checked"
    />
    <div class="label-checkbox"></div>
    <slot></slot>
  </label>
</template>

<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "InputCheckbox",
  props: [
    "modelValue", //v-model
    "value", //Giá trị của ô checkbox
    "trueValue", //Dữ liệu khi được check
    "falseValue", //Dữu liệu khi không được check
    "checked", //Có được check hay không khi k sử dụng đến v-model
    "id",
    "name",
    "round",
    "disabled",
    "indeterminate",
  ],
  emits: [
    "update:modelValue",
    "custom-handle-click-checkbox",
    "custom-handle-click-checkbox-with-value",
  ],
  setup: (props, { emit }) => {
    const computedValue = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
        emit("custom-handle-click-checkbox"); //custom sự kiện check không có value
        emit("custom-handle-click-checkbox-with-value", value); //custom sự kiện check có value truyền vào
      },
    });
    return { computedValue };
  },
});
</script>

<style scoped>
/* checkbox */
.check {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.label-checkbox {
  width: 18px;
  height: 18px;
  align-items: center;
  background-color: var(--while__color);
  border: solid 1px var(--border__input);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  transition: all ease 0.15s;
  position: relative;
}
.checkbox {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  left: 0;
  top: 0;
}
input:checked ~ .label-checkbox::before {
  opacity: 1;
  visibility: visible;
}
input:checked ~ .label-checkbox {
  border-color: var(--primary__color);
  transform: rotate(0deg);
}
input {
  z-index: 10;
}
.label-checkbox::before {
  content: "";
  background: var(--url__icon) no-repeat -1225px -363px;
  width: 14px;
  height: 11px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  display: block;
}
.input.disabled-input {
  box-shadow: none;
}
</style>

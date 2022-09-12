<template>
  <label class="input-radio_check" :class="{ active: isChecked }">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      :tabindex="tab"
      @change="$emit('update:modelValue', $event.target.value)"
    />
    <span class="info">{{ label }}</span>
    <span class="input-radio_focus"></span>
  </label>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "", required: true },
    modelValue: { default: "" },
    value: { type: String, default: undefined },
    tab:{},
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value;
    },
  },
};
</script>

<style scoped>
/* Input radio */
.input-radio_check {
  align-items: center;
  cursor: pointer;
  position: relative;
  display: inline-block;
}
.input-radio_check + .input-radio_check {
  margin-left: 20px;
}
.input-radio_check::before {
  content: "";
  position: absolute;
  border-radius: 50%;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  border: solid 1px var(--border__input);
}
.input-radio_focus {
  position: absolute;
  border-radius: 50%;
  left: -3px;
  top: -3px;
  width: 24px;
  height: 24px;
  display: block;
  border: solid 1px #0076c04b;
  opacity: 0;
  visibility: hidden;
  transition: all ease 0.15s;
}
.input-radio_check input {
  display: none;
}
.input-radio_check .info {
  padding-left: 28px;
}
.input-radio_check.active::before {
  border-color: var(--primary__color);
}
.input-radio_check.active::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  top: 4px;
  left: 4px;
  border-radius: 50%;
  background: var(--primary__color);
}
.input-radio_check.active .input-radio_focus {
  opacity: 1;
  visibility: visible;
}
</style>

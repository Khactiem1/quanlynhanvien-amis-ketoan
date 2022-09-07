<template>
  <div @click="handleClickCheckbox" class="check">
    <!-- Thêm active vào đây -->
    <label  class="label-checkbox" :class="{ active: checkbox }"> </label>
    <input class="checkbox" type="checkbox" />
  </div>
</template>

<script>
export default {
  props: {
    checkbox: {
      type: Boolean,
    },
  },
  setup(props,context){
    function handleClickCheckbox(){
      context.emit('custom-handle-click-ckeckbox');
    }
    return {
      handleClickCheckbox,
    }
  },
  emits: ['custom-handle-click-ckeckbox'],
};
</script>

<style scoped>
/* checkbox */
.check {
  position: relative;
  display: flex;
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
.label-checkbox.active {
  border-color: var(--primary__color);
  transform: rotate(0deg);
}
.label-checkbox::before {
  content: "";
  background: url("../../../public/asset/logo/Sprites.64af8f61.svg") no-repeat -1225px -363px;
  width: 14px;
  height: 11px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
}
.label-checkbox.active::before {
  opacity: 1;
  visibility: visible;
}
.input.disabled-input {
  box-shadow: none;
}
.info-checkbox {
  padding-left: 10px;
}
</style>

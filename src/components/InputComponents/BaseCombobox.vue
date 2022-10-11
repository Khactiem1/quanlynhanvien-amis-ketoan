<template>
  <div ref="template" class="data-input" :class="{ 'is-valid': isValid }">
    <label v-if="label" :class="{ required: required }">{{ label }}</label>
    <!-- Thêm 'active' là sẽ chạy -->
    <div
      class="combobox-select"
      :class="{ active: noAnimation ? isShow : isShowAnimation }"
    >
      <input
        ref="input"
        @focus="handleFocusInput"
        class="input"
        :value="headerValue"
        @input="handleInput"
        type="text"
        :tabindex="tab"
      />
      <div class="combobox-select_icon" @click="handleClickOpenCombobox">
        <div class="select_icon-combobox"></div>
      </div>
      <div ref="listSelect" v-show="isShow" class="combobox-combobox_select">
        <div
          class="combobox-combobox_item"
          v-for="(item, index) in options"
          :key="index"
          @click="handleClickItem(item[value], index)"
          :class="{
            active: valueClick == item[value],
          }"
        >
          {{ item[header] }}
        </div>
      </div>
    </div>
    <span class="message-valid">{{ messageValid }}</span>
  </div>
</template>

<script>
import { ref, toRefs, onMounted, onUnmounted, onBeforeMount, watch } from "vue";
import eNum from "../../utils/eNum";
export default {
  props: {
    modelValue: {},
    value: {
      type: String,
    },
    header: {
      type: String,
    },
    defaultValue: {},
    label: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    required: {},
    tab: {},
    messageValid: {},
    noAnimation: {},
  },
  setup(props, context) {
    /**
     * options: Dữ liệu lặp để hiển thị
     * header: trường hiển thị
     * modelValue: giá trị được chọn
     * value: giá trị binding cùng dữ liệu hiển thị
     * defaultValue: giá trị mặc định
     * noAnimation: có hiệu ứng hay không
     * required: có bắt buộc hay không
     * Khắc Tiềm - 15.09.2022
     */
    const {
      options,
      header,
      modelValue,
      defaultValue,
      value,
      noAnimation,
      required,
    } = toRefs(props);

    /**
     * lấy ra các mã phím khi bấm
     * Khắc Tiềm - 15.09.2022
     */
    const { UP, DOWN, ENTER, TAB } = eNum;

    /**
     * Element chứa danh sách select
     * Khắc Tiềm - 15.09.2022
     */
    const listSelect = ref(null);

    /**
     * Trạng thái hiển thị validate
     * Khắc Tiềm - 15.09.2022
     */
    const isValid = ref(false);

    /**
     * biến thực hiện ẩn mở dropdown
     * Khắc Tiềm - 15.09.2022
     */
    const isShow = ref(false);

    /**
     * biến bắt lưu trạng thái animation
     * Khắc Tiềm - 15.09.2022
     */
    const isShowAnimation = ref(false);

    /**
     * biến bắt lấy thẻ to nhất của component
     * Khắc Tiềm - 15.09.2022
     */
    const template = ref(null); //(Khắc Tiềm - 15.09.2022)   

    /**
     * biến bắt lấy thẻ input
     * Khắc Tiềm - 15.09.2022
     */
    const input = ref(null);

    /**
     * biến lưu dữ liệu value khi được click
     * Khắc Tiềm - 15.09.2022
     */
    const valueClick = ref(null);

    /**
     * biến lưu dữ liệu sẽ hiển thị lên giao diện người dùng được chọn
     * Khắc Tiềm - 15.09.2022
     */
    const headerValue = ref(null); 

    /**
     * Set vị trí list select hiển thị
     * Khắc Tiềm - 15.09.2022
     */
    const positionListSelect = ref({
      top: "110%",
    });

    /**
     * nếu có sự thay đổi modelValue từ bên ngoài thì sẽ check render dropdown cho hợp lý
     * Khắc Tiềm - 15.09.2022
     */
    watch(modelValue, () => {
      let checkModelValueCoincideValue = false;
      options.value.forEach((item) => {
        if (item[value.value] == modelValue.value) {
          headerValue.value = item[header.value];
          valueClick.value = item[value.value];
          checkModelValueCoincideValue = true;
          return;
        }
      });
      if (checkModelValueCoincideValue === false) {
        headerValue.value = null;
        valueClick.value = null;
      }
      if (required.value) {
        isValid.value = false;
      }
    });

    /**
     * hàm xử lý sự kiện khi nhấn nút lên hoặc nút xuống, enter và tab
     * Khắc Tiềm - 15.09.2022
     */
    const handleEnum = function (event) {
      if (event.keyCode === UP) {
        // xử lý bấm lên
        if (!valueClick.value && options.value) {
          valueClick.value = options.value[0][value.value];
          headerValue.value = options.value[0][header.value];
        } else {
          for (let i = 0; i < options.value.length; i++) {
            if (options.value[i][value.value] == valueClick.value) {
              if (i > 0) {
                const index = i - 1;
                headerValue.value = options.value[index][header.value];
                valueClick.value = options.value[index][value.value];
                break;
              }
            }
          }
        }
      } else if (event.keyCode === DOWN) {
        // xử lý bấm xuống
        if (!valueClick.value && options.value) {
          valueClick.value = options.value[0][value.value];
          headerValue.value = options.value[0][header.value];
        } else {
          for (let i = 0; i < options.value.length; i++) {
            if (options.value[i][value.value] == valueClick.value) {
              if (i < options.value.length - 1) {
                const index = i + 1;
                headerValue.value = options.value[index][header.value];
                valueClick.value = options.value[index][value.value];
                break;
              }
            }
          }
        }
      } else if (event.keyCode === ENTER || event.keyCode === TAB) {
        // xử lý bấm enter
        context.emit("update:modelValue", valueClick.value);
        toggleListSelect();
      }
    };

    /**
     * hàm xử lý ẩn dropdown khi click không trúng vào component
     * Khắc Tiềm - 15.09.2022
     */
    const handleClickTemplate = function () {
      const isClick = template.value.contains(event.target);
      if (!isClick) {
        if (isShow.value) {
          toggleListSelect();
        }
      }
    };

    /**
     * hàm xử lý khi người dùng click vào từng item trong dropdown
     * @param {Giá trị được chọn} value 
     * @param {Giá } index 
     * Khắc Tiềm - 15.09.2022
     */
    function handleClickItem(value, index) {
      context.emit("update:modelValue", value);
      headerValue.value = options.value[index][header.value];
      valueClick.value = value;
      toggleListSelect();
    }

    /**
     * hàm xử lý khi người dùng focus vào ô input sẽ hiện dropdown
     * Khắc Tiềm - 15.09.2022
     */
    function handleFocusInput() {
      if (!isShow.value) {
        setPositionListSelect();
        toggleListSelect();
      }
    }

    /**
     * hàm xử lý khi người dùng nhập input sẽ hiện dropdown
     * Khắc Tiềm - 15.09.2022
     */
    function handleInput() {
      if (!isShow.value) {
        setPositionListSelect();
        toggleListSelect();
      }
    }

    /**
     * hàm xử lý khi người dùng bấm vào icon mở hoặc đóng dropdown
     * Khắc Tiềm - 15.09.2022
     */
    function handleClickOpenCombobox() {
      if (!isShow.value) {
        setPositionListSelect();
      }
      toggleListSelect();
      if (isShow.value) {
        input.value.focus();
      }
    }

    /**
     * Set vị trí list select hiển thị
     * Khắc Tiềm - 15.09.2022
     */
    function setPositionListSelect() {
      if (
        window.innerHeight - (input.value.getBoundingClientRect().bottom + 30) <
        listSelect.value.getBoundingClientRect().height
      ) {
        positionListSelect.value.top = `-${options.value.length * 100 + 30}%`;
      } else {
        positionListSelect.value.top = "110%";
      }
    }

    /**
     * hàm xử lý hiển thị list select
     * Khắc Tiềm - 15.09.2022
     */
    function toggleListSelect() {
      isShow.value = !isShow.value;
      if (!noAnimation.value) {
        setTimeout(() => {
          isShowAnimation.value = !isShowAnimation.value;
        }, 0);
      }
      if (isShow.value) {
        window.addEventListener("keydown", handleEnum);
      } else {
        window.removeEventListener("keydown", handleEnum);
      }
    }

    /**
     * trước khi mounted thì sẽ set giá trị cho giá trị đc click thông qua v-model hoặc defaultValue
     * Khắc Tiềm - 15.09.2022
     */
    onBeforeMount(() => {
      options.value.forEach((item) => {
        if (
          item[value.value] == modelValue.value ||
          item[value.value] == defaultValue.value
        ) {
          headerValue.value = item[header.value];
          valueClick.value = item[value.value];
          return;
        }
      });
    });

    /**
     * lắng nghe sự kiện click component
     * Khắc Tiềm - 15.09.2022
     */
    onMounted(() => window.addEventListener("click", handleClickTemplate));

    /**
     * xoá bỏ sự kiện lắng nghe
     * Khắc Tiềm - 15.09.2022
     */
    onUnmounted(() => window.removeEventListener("click", handleClickTemplate));
    return {
      input,
      isShow,
      isShowAnimation,
      isValid,
      template,
      headerValue,
      listSelect,
      positionListSelect,
      valueClick,
      handleFocusInput,
      handleClickItem,
      handleInput,
      handleClickOpenCombobox,
    };
  },
};
</script>

<style scoped>
.combobox-select.active input {
  border-color: var(--primary__color);
}
.combobox-select {
  position: relative;
}
.combobox-select_icon {
  width: 36px;
  height: calc(100% - 2px);
  cursor: pointer;
  right: 1px;
  top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.combobox-select_icon:hover {
  background-color: #e0e0e0;
}
.select_icon-combobox {
  background: var(--url__icon) no-repeat;
  background-position: -560px -359px;
  width: 16px;
  height: 16px;
  transition: all 0.3s ease;
}
.combobox-combobox_select {
  position: absolute;
  width: 100%;
  left: 0;
  top: 130%;
  border: solid 1px var(--border__input);
  background-color: var(--while__color);
  border-radius: 2px;
  padding: 3px 0;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  border-radius: 4px;
  transition: all 0.1s ease;
}
.combobox-select.active .combobox-combobox_select {
  opacity: 1;
  visibility: visible;
  top: v-bind("positionListSelect.top");
}
.combobox-combobox_item {
  white-space: nowrap;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  height: var(--primary__button-height);
  color: inherit;
  display: flex;
  align-items: center;
}
.combobox-combobox_item:hover {
  background-color: #ebedf0;
  color: var(--primary__color);
}
.combobox-select.active .select_icon-combobox {
  transform: rotate(180deg);
}
.combobox-combobox_item.active {
  background-color: var(--primary__color);
  color: var(--while__color);
}
</style>

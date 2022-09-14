<template>
  <div ref="template" class="data-input" :class="{'is-valid': isValid}">
    <label v-if="label" :class="{ required: required }">{{ label }}</label>
    <!-- Thêm 'active' là sẽ chạy -->
    <div class="combobox-select" :class="{ active: isShow }">
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
      <div class="combobox-combobox_select">
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
    modelValue: {}, //v-model
    value: {
      type: String, // key được lấy làm value trong object
    },
    header: {
      type: String, // key được hiển thị lên cho người dùng
    },
    defaultValue: {}, // key mặc định
    label: {
      type: String, // label bổ nghĩa cho combo box
    },
    options: {
      // mảng dữ liệu bên trong là các object dữ liệu
      type: Array,
      default: () => [],
    },
    required: {},
    tab: {},
    messageValid: {},
  },
  setup(props, context) {
    const { options, header, modelValue, defaultValue, value, required } = toRefs(props);
    const { UP, DOWN, ENTER, TAB } = eNum;
    const isValid = ref(false);
    const isShow = ref(false); // biến thực hiện ẩn mở dropdown
    const template = ref(null); // biến bắt lấy thẻ to nhất của component
    const input = ref(null); // biến bắt thẻ input
    const valueClick = ref(null); // biến lưu dữ liệu value khi được click
    const headerValue = ref(null); // biến lưu dữ liệu sẽ hiển thị lên giao diện người dùng được chọn
    //nếu có sự thay đổi modelValue từ bên ngoài thì sẽ check render dropdown cho hợp lý
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
      if(required.value){
        isValid.value = false;
      }
    });
    //hàm xử lý sự kiện khi nhấn nút lên hoặc nút xuống, enter và tab
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
      } else if (event.keyCode === ENTER) {
        // xử lý bấm enter
        context.emit("update:modelValue", valueClick.value);
        isShow.value = !isShow.value;
        window.removeEventListener("keydown", handleEnum);
      } else if (event.keyCode === TAB) {
        // xử lý bấm tab
        context.emit("update:modelValue", valueClick.value);
        isShow.value = !isShow.value;
        window.removeEventListener("keydown", handleEnum);
      }
    };
    // hàm xử lý ẩn dropdown khi click không trúng vào component
    const handleClickTemplate = function () {
      const isClick = template.value.contains(event.target);
      if (!isClick) {
        if (isShow.value) {
          isShow.value = false;
          window.removeEventListener("keydown", handleEnum);
        }
      }
    };
    // hàm xử lý khi người dùng focus vào ô input sẽ hiện dropdown
    function handleFocusInput() {
      if (!isShow.value) {
        isShow.value = true;
        window.addEventListener("keydown", handleEnum);
      }
    }
    // hàm xử lý khi người dùng nhập input sẽ hiện dropdown
    function handleInput() {
      if (!isShow.value) {
        isShow.value = true;
        window.addEventListener("keydown", handleEnum);
      }
    }
    // hàm xử lý khi người dùng click vào từng item trong dropdown
    function handleClickItem(value, index) {
      context.emit("update:modelValue", value);
      isShow.value = !isShow.value;
      headerValue.value = options.value[index][header.value];
      valueClick.value = value;
      window.removeEventListener("keydown", handleEnum);
    }
    // hàm xử lý khi người dùng bấm vào icon mở hoặc đóng dropdown
    function handleClickOpenCombobox() {
      isShow.value = !isShow.value;
      if (isShow.value) {
        input.value.focus();
        window.addEventListener("keydown", handleEnum);
      } else {
        window.removeEventListener("keydown", handleEnum);
      }
    }
    // trước khi mounted thì sẽ set giá trị cho giá trị đc click thông qua v-model hoặc defaultValue
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
    // lắng nghe sự kiện click component
    onMounted(() => window.addEventListener("click", handleClickTemplate));
    // xoá bỏ sự kiện lắng nghe
    onUnmounted(() => window.removeEventListener("click", handleClickTemplate));
    return {
      input,
      isShow,
      isValid,
      template,
      handleFocusInput,
      handleClickItem,
      headerValue,
      valueClick,
      handleInput,
      handleClickOpenCombobox,
    };
  },
};
// <custom-combobox
//     :options="[
//       { name: 'Khắc Tiềm', age: 21 },
//       { name: 'Đỗ Mạnh', age: 20 },
//       { name: 'Lê Tú', age: 19 },
//       { name: 'Quách Tỉnh', age: 18 },
//     ]"
//     :header="'name'"
//     :value="'age'"
//     :label="'Đơn vị'"
//     v-model="combobox"
//   >
//   </custom-combobox>
//      :defaultValue="combobox"
</script>

<style scoped>
.combobox-select.active input {
  border-color: var(--primary__color);
}
.combobox-select {
  position: relative;
}
.combobox-select_icon {
  width: 32px;
  height: 30px;
  cursor: pointer;
  right: 1px;
  top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
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
  transition: all 0.1s ease;
}
.combobox-select.active .combobox-combobox_select {
  opacity: 1;
  visibility: visible;
  top: 110%;
}
.combobox-combobox_item {
  white-space: nowrap;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  color: inherit;
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

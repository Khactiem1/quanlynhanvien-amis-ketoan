<template>
  <div class="show-paging">
    <div
      @click="previousPage(propsStartPaging)"
      :class="{ disabled: currentPage === 1 }"
      class="show-paging_item"
    >
      Trước
    </div>
    <div
      @click="firstPage(0)"
      :class="{ active: currentPage === 1 }"
      class="show-paging_item show-paging_text"
    >
      1
    </div>
    <div
      @click="changePage(propsStartPaging)"
      :class="{
        active:
          (currentPage > 1 &&
            currentPage < Math.ceil(totalCount / countRecordPageUser)) ||
          propsStartPaging === currentPage,
      }"
      class="show-paging_item show-paging_text"
    >
      {{ propsStartPaging }}
    </div>
    <div
      @click="nextPage(propsStartPaging)"
      class="show-paging_item show-paging_text"
    >
      ...
    </div>
    <div
      @click="
        lastPage(
          //(Khắc Tiềm - 15.09.2022) thứ tự bản ghi bắt đầu muốn lấy của trang cuối
          (Math.ceil(totalCount / countRecordPageUser) - 1) *
            countRecordPageUser
        )
      "
      :class="{
        active: currentPage === Math.ceil(totalCount / countRecordPageUser),
      }"
      class="show-paging_item show-paging_text"
    >
      {{ Math.ceil(totalCount / countRecordPageUser) }}
    </div>
    <div
      @click="nextPage(propsStartPaging)"
      :class="{
        disabled: currentPage === Math.ceil(totalCount / countRecordPageUser),
      }"
      class="show-paging_item"
    >
      Sau
    </div>
  </div>
</template>

<script>
import { toRefs, ref } from "vue";
export default {
  props: ["modelValue", "totalCount", "countRecordPageUser"],
  emits: ["update:modelValue"],
  setup(props, context) {
    const currentPage = ref(1);
    const { countRecordPageUser, totalCount } = toRefs(props);
    const propsStartPaging = ref(1); //(Khắc Tiềm - 15.09.2022) tham số đầu vào gọi phân trang cho trang kế tiếp mặc định là trang sô 2

    //(Khắc Tiềm - 15.09.2022) Hàm xử lý thay đổi số trang tham số đầu vào là số trang muốn lấy
    function changePage(pageValue) {
      currentPage.value = pageValue;
      const offset = (pageValue - 1) * countRecordPageUser.value;
      context.emit("update:modelValue", offset);
    }
    //(Khắc Tiềm - 15.09.2022) hàm xử lý next trang
    function nextPage(pageValue) {
      if (
        Math.ceil(totalCount.value / countRecordPageUser.value) >
        currentPage.value
      ) {
        //(Khắc Tiềm - 15.09.2022) tăng số trang lên 1
        propsStartPaging.value += 1;
        currentPage.value = pageValue + 1;
        const offset = pageValue * countRecordPageUser.value;
        context.emit("update:modelValue", offset);
      }
    }
    //(Khắc Tiềm - 15.09.2022) hàm xử lý quay lại trang
    function previousPage(pageValue) {
      if (currentPage.value > 1) {
        //(Khắc Tiềm - 15.09.2022) tăng số trang lên 1
        propsStartPaging.value -= 1;
        currentPage.value = pageValue - 1;
        const offset = (pageValue - 2) * countRecordPageUser.value;
        context.emit("update:modelValue", offset);
      }
    }
    //(Khắc Tiềm - 15.09.2022) hàm lấy trang cuối cùng
    function lastPage(offset) {
      currentPage.value = Math.ceil(
        totalCount.value / countRecordPageUser.value
      );
      propsStartPaging.value = currentPage.value;
      context.emit("update:modelValue", offset);
    }
    //(Khắc Tiềm - 15.09.2022) hàm lấy trang đầu
    function firstPage(offset) {
      currentPage.value = 1;
      propsStartPaging.value = 1;
      context.emit("update:modelValue", offset);
    }
    return {
      propsStartPaging,
      changePage,
      lastPage,
      currentPage,
      firstPage,
      previousPage,
      nextPage,
    };
  },
};
</script>

<style scoped>
.show-paging {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
}
.show-paging_item {
  cursor: pointer;
}
.show-paging_item.disabled {
  color: #9e9e9e;
  cursor: context-menu;
}
.show-paging_text {
  margin: 0 6px;
}
.show-paging_text.active {
  border: solid 1px var(--border__input);
  padding: 0 0.5rem;
  font-weight: bold;
}
.show-paging_item:last-child {
  margin-left: 6px;
}
.show-paging_item:first-child {
  margin-right: 6px;
}
</style>

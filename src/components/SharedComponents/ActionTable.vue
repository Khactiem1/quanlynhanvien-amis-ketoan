<template>
  <div
    ref="actionTable"
    class="table-list_action"
    :style="{
      top:
        positionActionTable.top + positionActionTable.heightElement - 3 + 'px',
      right: widthWindow - positionActionTable.right + 4 + 'px',
    }"
  >
    <div
      v-for="(item, index) in actionList"
      :key="index"
      class="list_action-item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    actionList: {
      type: Array,
    },
  },
  setup() {
    const store = useStore();
    const actionTable = ref(null);
    //Lấy ra các cấu hình của actionTable
    const event = function (event) {
      let isClick = actionTable.value.contains(event.target);
      if (!isClick) {
        console.log("không click");
      }
    };
    onMounted(() => window.addEventListener("click", event));
    onUnmounted(() => window.removeEventListener("click", event));
    const positionActionTable = computed(
      () => store.state.config.positionActionTable
    );
    const widthWindow = ref(window.innerWidth);
    addEventListener("resize", () => {
      widthWindow.value = window.innerWidth;
    });
    return {
      positionActionTable,
      actionTable,
      widthWindow,
    };
  },
};
</script>

<style scoped>
/* Phần action ẩn */
.table-list_action {
  position: absolute;
  border: solid 1px var(--border__input);
  background-color: var(--while__color);
  border-radius: 2px;
  padding: 5px 0;
  top: 0;
  /* opacity: 0;
  visibility: hidden; */
  z-index: 5;
}
.table-list_action.active {
  opacity: 1;
  visibility: visible;
  top: 90%;
}
.list_action-item {
  white-space: nowrap;
  text-align: left;
  padding: 5px 10px;
  cursor: pointer;
  transition: all ease 0.15s;
  color: inherit;
}
.list_action-item:hover {
  background-color: #f5f5f5;
  color: var(--primary__color);
}
</style>

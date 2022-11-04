<template>
  <div class="ms-dropdown-menu" :class="{ active: isActiveAnimation }">
    <div class="form-control">
      <div class="form-group no-padding">
        <input-combobox
          :options="[
            { value: 1, header: 'Tất cả' },
            { value: 2, header: 'Hàng hoá' },
            { value: 3, header: 'Thành phẩm' },
            { value: 4, header: 'Dịch vụ' },
            { value: 5, header: 'Nguyên vật liệu' },
            { value: 6, header: 'Công cụ, dụng cụ' },
          ]"
          :value="'value'"
          :header="'header'"
          :label="'Tính chất'"
          v-model="nature"
          ref="inputFocus"
        ></input-combobox>
      </div>
      <div class="form-group">
        <input-combobox
          :options="optionCommodityGroup"
          widthOptionSelect="500px"
          widthLabelCode="150px"
          :value="'commodityGroupID'"
          :header="'commodityName'"
          :labelCode="'Mã nhóm'"
          :labelName="'Tên nhóm'"
          :headerCode = "'commodityCode'"
          :label="'Nhóm'"
          v-model="group"
        ></input-combobox>
      </div>
      <div class="form-group no-padding">
        <input-combobox
          :options="[
            { value: 1, header: 'Tất cả' },
            { value: 2, header: 'Còn tồn' },
            { value: 3, header: 'Sắp hết hàng' },
            { value: 4, header: 'Hết hàng' },
          ]"
          :value="'value'"
          :header="'header'"
          :label="'Tình trạng tồn kho'"
          v-model="inventory"
        ></input-combobox>
      </div>
      <div class="form-group">
        <input-combobox
          :options="[
            { value: 1, header: 'Tất cả' },
            { value: 2, header: 'Đang sử dụng' },
            { value: 3, header: 'Ngừng sử dụng' },
          ]"
          :value="'value'"
          :header="'header'"
          :label="'Trạng thái'"
          v-model="status"
        ></input-combobox>
      </div>
    </div>
    <div class="form-action_container">
      <div class="form-action_item">
        <button class="btn" @click="handleResetDataSearch()">
          Đặt lại
        </button>
        <button class="btn btn-success" @click="handleSearchData()">
          Lọc
        </button>
      </div>
      <div class="form-action_item">
        <button class="btn" @click="handleClose()">
          Huỷ
        </button>
      </div>  
    </div>
    <button ref="focusLoop" class="focus-loop"></button>
  </div>
</template>

<script>
import { onBeforeMount, ref, onMounted, onUnmounted} from 'vue';
import InputCombobox from '../../../components/InputComponents/BaseCombobox.vue';
import apiCommodityGroup from "../../../api/commodityGroup";
import { useStore } from "vuex";
import index from '../../../utils/index';
import callApi from '../../../api/callApi';
export default {
  props: {
    handleClose: {type: Function},
  },
  components: {
    InputCombobox
  },
  setup(){
    /**
     * Biến store vuex
     * NK Tiềm 28/10/2022
     */
    const store = useStore();
    /**
     * Element chứa vị trí tab đến sẽ quay lại tab ban đầu tạo thành vòng lặp
     * NK Tiềm 28/10/2022
     */
    const focusLoop = ref(null); 
    const isActiveAnimation = ref(false);
    const inputFocus = ref(null); 
    const optionCommodityGroup = ref([]);
    const { listToTree } = index;
    onBeforeMount(async ()=> {
      await callApi(apiCommodityGroup.getAllRecordList, null, async (response) => { optionCommodityGroup.value = listToTree(response, "commodityGroupID"); }, store, true);
    })
    const nature = ref("");
    const group = ref("");
    const inventory = ref("");
    const status = ref("");

    const handleLoopFocus = function () {
      inputFocus.value.input.focus();
    };
    function handleResetDataSearch(){
      nature.value = "";
      group.value = "";
      inventory.value = "";
      status.value = "";
    }
    function handleSearchData(){
      console.log(nature.value);
      console.log(group.value);
      console.log(inventory.value);
      console.log(status.value);
    }
    onUnmounted(() => window.removeEventListener("focus", handleLoopFocus));
    onMounted(() => {
      focusLoop.value.addEventListener("focus", handleLoopFocus);
      setTimeout(()=> {
        isActiveAnimation.value = true;
      },0)
    });
    return {
      nature,
      group,
      inventory,
      status,
      optionCommodityGroup,
      focusLoop,
      isActiveAnimation,
      inputFocus,
      handleResetDataSearch,
      handleSearchData,
    }
  },
}
</script>

<style scoped>
.ms-dropdown-menu{
  background-color: var(--while__color);
  padding: 16px 20px 0px 20px;
  position: absolute;
  width: 550px;
  transition: all ease 0.2s;
  top: 150%;
  border-radius: 2px;
  border: 1px solid #babec5;
  left: -240px;
  box-shadow: rgb(0, 0, 0, 20%) 0px 5px 15px;
}
.ms-dropdown-menu.active{
  top: 105%;
}
.form-control{
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 12px;
}
.form-group{
  width: 50%;
  padding-left: 6px;
}
.no-padding{
  padding-left: 0;
}
.distance-line{
  background: #e0e0e0;
    width: 100%;
    margin: 8px 0 20px 0;
    height: 1px;
}
button + button{
  margin-left: 9px;
}
</style>
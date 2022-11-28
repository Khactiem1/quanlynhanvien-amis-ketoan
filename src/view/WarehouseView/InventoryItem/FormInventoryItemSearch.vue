<template>
  <div ref="elmMain" class="form-filter-container">
  <div class="formFilter">
    <div @click="handleToggleSearchKey" class="table-function_series">
      <span>Lọc</span>
      <div class="table-function_series-icon"></div>
    </div>
  </div>
  <div class="ms-dropdown-menu" :class="{ active: isActiveAnimation }" v-show="isShowSearchKey">
    <div class="form-control">
      <div class="form-group no-padding">
        <input-combobox
          :options="[
            { value: '', header: 'Tất cả' },
            { value: eNum.Goods, header: 'Hàng hoá' },
            { value: eNum.Service, header: 'Dịch vụ' },
            { value: eNum.Materials, header: 'Nguyên vật liệu' },
            { value: eNum.FinishedProduct, header: 'Thành phẩm' },
            { value: eNum.ToolTools, header: 'Công cụ, dụng cụ' },
          ]"
          :value="'value'"
          :header="'header'"
          :label="'Tính chất'"
          v-model="nature.valueSearch"
          v-model:textField="nature.headerSearch"
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
          v-model="group.valueSearch"
          v-model:textField="group.headerSearch"
        ></input-combobox>
      </div>
      <div class="form-group no-padding">
        <input-combobox
          :options="[
            { value: '', header: 'Tất cả' },
            { value: 1, header: 'Còn tồn' },
            { value: 2, header: 'Sắp hết hàng' },
            { value: 3, header: 'Hết hàng' },
          ]"
          :value="'value'"
          :header="'header'"
          :label="'Tình trạng tồn kho'"
          v-model="inventory.valueSearch"
          v-model:textField="inventory.headerSearch"
        ></input-combobox>
      </div>
      <div class="form-group">
        <input-combobox
          :options="[
            { value: '', header: 'Tất cả' },
            { value: 'true', header: 'Đang sử dụng' },
            { value: 'false', header: 'Ngừng sử dụng' },
          ]"
          :value="'value'"
          :header="'header'"
          :label="'Trạng thái'"
          v-model="status.valueSearch"
          v-model:textField="status.headerSearch"
        ></input-combobox>
      </div>
    </div>
    <div class="form-action_container">
      <div class="form-action_item">
        <button class="btn" @click="handleResetDataSearch()">
          Đặt lại
        </button>
        <button class="btn btn-success" @click="searchData()">
          Lọc
        </button>
      </div>
      <div class="form-action_item">
        <button class="btn" @click="handleToggleSearchKey()">
          Huỷ
        </button>
      </div>  
    </div>
    <button ref="focusLoop" class="focus-loop"></button>
  </div>
  </div>
</template>

<script>
import eNum from "../../../utils/eNum";
import { onBeforeMount, ref, onMounted, onUnmounted} from 'vue';
import InputCombobox from '../../../components/InputComponents/BaseCombobox.vue';
import apiCommodityGroup from "../../../api/commodityGroup";
import { useStore } from "vuex";
import index from '../../../utils/index';
import callApi from '../../../api/callApi';
export default {
  components: {
    InputCombobox
  },
  setup(props, context){
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
    /**
     * Biến tạo hiệu ứng
     */
    const isActiveAnimation = ref(false);
    /**
     * Input được focus
     */
    const inputFocus = ref(null); 
    /**
     * Chứa danh sách nhóm vthh, hh 
     */
    const optionCommodityGroup = ref([]);
    const { listToTree } = index;
    /**
     * Khi mount thì call api lấy dữ liệu nhóm vthh
     */
    onBeforeMount(async ()=> {
      await callApi(apiCommodityGroup.getAllRecordList, null, async (response) => { optionCommodityGroup.value = listToTree(response, "commodityGroupID"); }, store, true);
    })
    const isShowSearchKey = ref(false);

    /**
     * Hàm xử lý đóng mở form tìm kiếm lọc
     */
    function handleToggleSearchKey(){
      try {
        if(!isShowSearchKey.value){
          setTimeout(()=> {
            isActiveAnimation.value = true;
          },0)
        }
        else{
          isActiveAnimation.value = false;
        }
        isShowSearchKey.value = !isShowSearchKey.value;
        if(isShowSearchKey.value){
          const dataBindFilter = store.state.inventoryItem.filter.customSearch
          .filter(item => (item.valueSearch || item.valueSearch === 0 || item.comparisonType === "!=Null" || item.comparisonType === "=Null") && (item.columnSearch === 'Nature' || item.columnSearch === 'CommodityGroupID' || item.columnSearch === "IsActive"));
          dataBindFilter.forEach(item => {
            if(item.columnSearch === nature.value.columnSearch){
              nature.value.valueSearch = item.valueSearch;
              nature.value.headerSearch = item.headerSearch;
            }
            if(item.columnSearch === group.value.columnSearch){
              group.value.valueSearch = item.valueSearch;
              group.value.headerSearch = item.headerSearch;
            }
            if(item.columnSearch === status.value.columnSearch){
              status.value.valueSearch = item.valueSearch;
              status.value.headerSearch = item.headerSearch;
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    /**
     * Thuộc tính, tính chất
     */
    const nature = ref({ typeSearch: 'number', columnSearch: 'Nature', valueSearch: '', headerSearch: '', labelSearch: 'Tính chất', comparisonType: '='});
    /**
     * Nhóm vthh
     */
    const group = ref({ typeSearch: 'text', columnSearch: 'CommodityGroupID', valueSearch: '', headerSearch: '', labelSearch: 'Nhóm', comparisonType: '%%'});
    /**
     * Tình trạng tồn kho
     */
    const inventory = ref({ typeSearch: 'number', columnSearch: 'QuantityTock', valueSearch: '', headerSearch: '', labelSearch: 'Tình trạng tồn kho', comparisonType: '='});
    /**
     * Trạng thái hoạt động
     */
    const status = ref({ typeSearch: 'number', columnSearch: 'IsActive', valueSearch: '', headerSearch: '', labelSearch: 'Trạng thái', comparisonType: '='});

    /**
     * Hàm xử lý vòng lặp tab
     */
    const handleLoopFocus = function () {
      inputFocus.value.input.focus();
    };
    /**
     * Hàm xử lý reset data search
     */
    function handleResetDataSearch(){
      try {
        nature.value.valueSearch = "";
        group.value.valueSearch = "";
        inventory.value.valueSearch = "";
        status.value.valueSearch = "";
      } catch (e) {
        console.log(e);
      }
    }
    /**
     * Hàm xử lý bấm search
     */
    function searchData(){
      const QuantityTock = {...inventory.value};
      if(inventory.value.valueSearch == 1){
        QuantityTock.valueSearch = "MinimumStock";
        QuantityTock.comparisonType = ">=";
      }
      else if(inventory.value.valueSearch == 2){
        QuantityTock.valueSearch = "MinimumStock AND QuantityTock > 0";
        QuantityTock.comparisonType = "<";
      }
      else if(inventory.value.valueSearch == 3){
        QuantityTock.valueSearch = "0";
        QuantityTock.comparisonType = "<=";
      }
      context.emit("handle-filter-data", { resetPage:true, Nature:{...nature.value}, CommodityGroupID:{...group.value}, QuantityTock: {...QuantityTock}, IsActive:{...status.value} });
      handleToggleSearchKey();
    }
    /**
     *  khi không click trúng component thì sẽ unmount component
     * khắc Tiềm - 15.09.2022
     */
    const elmMain = ref(null);
     const handleClickTemplate = function (event) {
      try {
        const isClickElmMain = elmMain.value.contains(event.target);
        if (!isClickElmMain && isShowSearchKey.value === true) {
          isActiveAnimation.value = false;
          isShowSearchKey.value = false;
        }
      } catch {
        return;
      }
    };
    onUnmounted(() => {
      window.removeEventListener("focus", handleLoopFocus)
      window.removeEventListener("click", handleClickTemplate)
    });
    onMounted(() => {
      window.addEventListener("click", handleClickTemplate)
      focusLoop.value.addEventListener("focus", handleLoopFocus);
    });
    return {
      nature,
      group,
      eNum,
      elmMain,
      inventory,
      status,
      optionCommodityGroup,
      focusLoop,
      isShowSearchKey,
      isActiveAnimation,
      inputFocus,
      handleResetDataSearch,
      searchData,
      handleToggleSearchKey,
    }
  },
  emits: ["handle-filter-data"],
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
  z-index: 1;
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
.table-function_series {
    border: 2px solid #3b3c3f;
    padding: 0 16px;
    border-radius: 30px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    position: relative;
    margin-left: 12px;
  }
  .table-function_series:hover:not(.not-css) {
    background-color: #d2d3d6;
  }
  .table-function_series:active:not(.not-css) {
    background-color: #bbbcbc;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .table-function_series:not(.not-css) span {
    font-family: "notosans-bold";
    padding-right: 4px;
  }
  .table-function_series-icon {
    background: var(--url__icon);
    background-position: -560px -359px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
  }
  .table-function_series-icon {
    background: var(--url__icon);
    background-position: -560px -359px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
  }
  
</style>
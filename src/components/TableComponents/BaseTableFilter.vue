<template>
  <div ref="elmMain" :style="{
      top: setPositionFilter.top + 'px',
      left: setPositionFilter.left + 'px',
    }" class="condition-container">
    <div class="lock">
        Cố định cột này
    </div>
    <div class="filter-container">
        <div class="view-fitler-text">
            <div class="column-filter">
                Lọc {{ dataFilter.headerSearch }}
            </div>
            <div v-if="dataFilter.typeFilter !== 'combobox'" class="filter-op-dropdown">
              <div ref="elmDropDown" @click="isShowDropDown = !isShowDropDown;" class="drop-icon">
                {{ selectComparison[comparisonType].header }}
              </div>
              <div v-if="isShowDropDown" class="dropdown-list">
                  <div @click="handleSelectComparisonType(index)" v-for="(item, index) in selectComparison" :key="index" class="dropdown-item">
                    {{ item.header }}
                  </div>
              </div>
            </div>
        </div>
        <div class="filter-value">
          <base-input v-if="dataFilter.typeFilter === 'number' || dataFilter.typeFilter === 'text'" :disabled="isDisableInput" :placeholder="'Nhập giá trị lọc'" v-model="valueSearch" :isNumber="dataFilter.typeFilter === 'number'" ></base-input>
          <base-calendar v-if="dataFilter.typeFilter === 'date'" :disabled="isDisableInput" v-model="valueSearch"></base-calendar>
          <base-combobox 
            v-if="dataFilter.typeFilter === 'combobox'" 
            :placeholder="'Nhập giá trị lọc'"
            :value="'value'"
            :header="'header'"
            :options="dataFilter.data"
            v-model="valueSearch"
            v-model:textField="valueLabel"
          >
          </base-combobox>
        </div>
    </div>
    <div class="filter-footer">
      <button class="btn" @click="handleDeleteFilterItem()">Bỏ lọc</button>
      <button class="btn btn-success" @click="handleSearchData">Lọc</button>
    </div>
  </div>
</template>

<script>
import BaseInput from '../../components/InputComponents/BaseInput.vue';
import BaseCombobox from '../../components/InputComponents/BaseCombobox.vue';
import BaseCalendar from '../../components/InputComponents/BaseCalendar.vue';
import { ref, onUnmounted, toRefs, onBeforeMount } from 'vue';
import { useStore } from "vuex";
import eNum from '@/utils/eNum';
export default {
  props: {
    /**
     * Hàm xử lý đóng mở form filter
     */
    handleShowFilter: {Function},
    /**
     * set vị trí hiển thị form
     */
    setPositionFilter: {Object},
    /**
     * Dữ liệu đi kèm form để binding và tìm kiếm
     */
    dataFilter: {Object},

    /**
     * Dữ liệu tìm kiếm trước đó
     */
     oldSearch: {},
  },
  components: {
    BaseInput,
    BaseCombobox,
    BaseCalendar,
  },
  setup(props, context){
    const store = useStore();
    /**
     * Lấy ra props
     */
    const { handleShowFilter, dataFilter, oldSearch } = toRefs(props);
    /**
     * Biến lưu trạng thái show dropdown chọn cách lọc
     */
    const isShowDropDown = ref(false);
    /**
     * element dropdown
     */
    const elmDropDown = ref(null);
    /**
     *element chứa toàn bộ component
     */
    const elmMain = ref(null);
    /**
     * option select kiểu truy vấn cho kiểu text
     */
    const selectComparisonTypeText = [
      {header: "(Trống)" , comparisonType: "=Null"},
      {header: "(Không trống)" , comparisonType: "!=Null"},
      {header: "Bằng" , comparisonType: "="},
      {header: "Khác" , comparisonType: "!="},
      {header: "Chứa" , comparisonType: "%%"},
      {header: "Không chứa" , comparisonType: "!%%"},
      {header: "Bắt đầu với" , comparisonType: "_%"},
      {header: "Kết thúc với với" , comparisonType: "%_"},
    ];
    /**
     * option select kiểu truy vấn cho kiểu Number
     */
    const selectComparisonTypeNumber = [
      {header: "(Trống)" , comparisonType: "=Null"},
      {header: "(Không trống)" , comparisonType: "!=Null"},
      {header: "Khác" , comparisonType: "!="},
      {header: "Nhỏ hơn" , comparisonType: "<"},
      {header: "Bằng" , comparisonType: "="},
      {header: "Nhỏ hơn hoặc bằng" , comparisonType: "<="},
      {header: "Lớn hơn" , comparisonType: ">"},
      {header: "Lớn hơn hoặc bằng" , comparisonType: ">="},
    ];
    /**
     * Giá trị comparisonType được select mặc định sẽ là 4 (là index của mảng)
     */
    const comparisonType = ref(4);
    /**
     * option select 
     */
    const selectComparison = ref(dataFilter.value.typeFilter === "text" ? selectComparisonTypeText : dataFilter.value.typeFilter === "number" || dataFilter.value.typeFilter === "date" ? selectComparisonTypeNumber: []);
    /**
     * Dữ liệu select
     */
    const valueSearch = ref('');
    onBeforeMount(()=> {
      if(oldSearch.value){
        valueSearch.value = oldSearch.value.valueSearch;
        if(oldSearch.value.typeSearch === 'text'){
          const index = selectComparisonTypeText.findIndex(item => item.comparisonType === oldSearch.value.comparisonType);
          comparisonType.value = index;
        }
        else if(oldSearch.value.typeSearch === 'number' || oldSearch.value.typeSearch === 'date'){
          const index = selectComparisonTypeNumber.findIndex(item => item.comparisonType === oldSearch.value.comparisonType);
          comparisonType.value = index;
        }
      }
    })
    /**
     * Dữ liệu select
     */
    const valueLabel = ref('');
    /**
     * khoá ô input khi option là trống hoặc không trống
     */
    const isDisableInput = ref(false);
    /**
     * Hàm xử lý lưu thông tin và tìm kiếm
     */
    function handleSelectComparisonType(index){
      /// 0 và 1 là vị trí mảng của trống và không trống khi chọn cái này thì ô input sẽ bị disable
      if(index === 0 || index === 1){
        valueSearch.value = '';
        isDisableInput.value = true;
      }
      else{
        isDisableInput.value = false;
      }
      comparisonType.value = index;
    }

    /**
     * Hàm xử lý tìm kiếm lọc
     */
    function handleSearchData(){
      if(dataFilter.value.typeFilter !== 'combobox'){
        const dataSearch = { typeSearch: dataFilter.value.typeSearch, columnSearch: dataFilter.value.columnSearch, valueSearch: valueSearch.value, headerSearch: valueSearch.value, labelSearch: dataFilter.value.headerSearch + ' ' + selectComparison.value[comparisonType.value].header, comparisonType: selectComparison.value[comparisonType.value].comparisonType};
        context.emit("handle-filter-data", { resetPage:true, [dataFilter.value.columnSearch]:{...dataSearch} });
      }
      else{
        const dataSearch = { typeSearch: dataFilter.value.typeSearch, columnSearch: dataFilter.value.columnSearch, valueSearch: valueSearch.value, headerSearch: valueLabel.value, labelSearch: dataFilter.value.headerSearch, comparisonType: dataFilter.value.comparisonType};
        context.emit("handle-filter-data", { resetPage:true, [dataFilter.value.columnSearch]:{...dataSearch} });
      }
      handleShowFilter.value();
    }

    /**
     * Hàm xử lý xoá lọc
     */
    function handleDeleteFilterItem(){
      store.dispatch(`${dataFilter.value.module}/setFilterCustomSearchDropAction`, dataFilter.value.columnSearch);
      context.emit("handle-filter-data", { resetPage:true});
      handleShowFilter.value();
    }

    /**
     *  khi không click trúng component thì sẽ unmount component
     * khắc Tiềm - 15.09.2022
     */
     const handleClickTemplate = function (event) {
      try {
        const isClickElmMain = elmMain.value.contains(event.target);
        if(dataFilter.value.typeFilter === 'combobox'){
          if (!isClickElmMain) {
            handleShowFilter.value();
          }
        }
        else{
          if (!isClickElmMain) {
            handleShowFilter.value();
          }
          const isClickDropDown = elmDropDown.value.contains(event.target);
          if (!isClickDropDown) {
            isShowDropDown.value = false;
          }
        }
      } catch{
        return;
      }
    };
    /**
     * Hàm xử lý sự kiện khi nhấn enter
     */
    const keyEnter = function(event){
      if(event.keyCode === eNum.ENTER){
        handleSearchData();
      }
    }
    setTimeout(()=> {
      window.addEventListener("click", handleClickTemplate)
      window.addEventListener("keydown", keyEnter);
    }, 100)
    /**
     * xoá bỏ sự kiện lắng nghe
     * Khắc Tiềm - 15.09.2022
     */ 
     onUnmounted(() => {
      window.removeEventListener("click", handleClickTemplate);
      window.removeEventListener("keydown", keyEnter);
     });

    return{
      isShowDropDown,
      elmDropDown,
      isDisableInput,
      elmMain,
      comparisonType,
      selectComparison,
      valueLabel,
      valueSearch,
      handleClickTemplate,
      handleSelectComparisonType,
      handleDeleteFilterItem,
      handleSearchData,
    }
  },
  emits: ["handle-filter-data"],
}
</script>

<style scoped>
.condition-container{
  font-family: "notosans-regular";
  position: absolute;
    padding: 22px 17px;
    border: 1px solid #babec5;
    z-index: 10;
    background: #fff;
    min-width: 350px;
    max-width: 350px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    font-weight: 400;
    font-size: 13px;
    border-radius: 2px;
    box-shadow: 3px 3px 6px #ddd;
}
.condition-container .lock{
  position: relative;
    padding-left: 30px;
    line-height: 24px;
    cursor: pointer;
    border-bottom: 1px solid #ebedf0;
    padding-bottom: 14px;
    margin-bottom: 14px;
}
.condition-container .lock::before{
  content: "";
    position: absolute;
    display: block;
    height: 24px;
    width: 24px;
    top: 0;
    left: 2px;
    background: transparent var(--url__icon) no-repeat -1726px -560px;
}
.view-fitler-text{
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}
.filter-op-dropdown{
  font-size: 13px;
    font-weight: 600;
    color: #0075c0;
    cursor: pointer;
    position: relative;
    position: relative;
    display: inline-block;
    margin-left: 15px;
    line-height: 19px;
}
.drop-icon{
  padding-right: 20px;
  font-family: 'notosans-bold';
}
.drop-icon::after{
  content: "";
    position: absolute;
    height: 10px;
    width: 13px;
    background: transparent var(--url__icon) no-repeat -178px -363px;
    top: 4px;
    right: 2px;
}
.filter-footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.dropdown-list{
  background: #fff;
    padding: 2px 1px;
    border-radius: 2px;
    border: 1px solid #babec5;
    position: absolute;
    color: var(--text__color);
    text-align: left;
    font-weight: 400;
    font-size: 13px;
    z-index: 5;
    width: 150px;
    top: 100%;
    right: 0;
    transition: all ease .2s;
}
.dropdown-item{
  background: inherit;
    color: inherit;
    cursor: pointer;
    transition: all .2s ease;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    display: block;
}
.dropdown-item:hover{
  color: var(--primary__color) !important;
  background-color: #ebedf0 !important;
}
</style>
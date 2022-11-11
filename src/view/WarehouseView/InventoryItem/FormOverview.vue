<template>
  <div class="overview">
        <div @click="handleReload()" class="overview-reload action-render_table"></div>
        <div class="overview-item overview-item_left">
          <div class="overview-image"></div>
          <div class="overview-content">
            <div class="overview-text overview-text_total">
              {{ result1 }}
            </div>
            <div class="overview-text overview-text_name">
              Hàng hoá
            </div>
            <div class="overview-text overview-text_notification">
              Sắp hết hàng
            </div>
          </div>
        </div>
        <div class="separate-line-overview"></div>
        <div class="overview-item overview-item_right">
          <div class="overview-image"></div>
          <div class="overview-content">
            <div class="overview-text overview-text_total">
              {{ result2 }}
            </div>
            <div class="overview-text overview-text_name">
              Hàng hoá
            </div>
            <div class="overview-text overview-text_notification">
              Hết hàng
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import ApiInventoryItem from '../../../api/inventoryItem';
import callApi from '../../../api/callApi';
import { onBeforeMount, ref } from '@vue/runtime-core';
import { useStore } from "vuex";
export default {
  setup(){
    /**
       * Sử dụng store của vuex
       * Khắc Tiềm - 15.09.2022
       */
    const store = useStore();
    /**
     * giá trị sắp hết hàng
     */
    const result1 = ref('');

    /**
     * Hết hàng
     */
    const result2 = ref('');

    /**
     * Gọi API khi mount
     */
    onBeforeMount(async ()=> {
      await callApi(ApiInventoryItem.GetInventoryStatus, null, (response) => { result1.value = response.result1; result2.value = response.result2 }, store);
    })

    /**
     * Hàm load lại dữ liệu
     */
    async function handleReload(){
      try {
        await callApi(ApiInventoryItem.GetInventoryStatus, null, (response) => { result1.value = response.result1; result2.value = response.result2 }, store);
      } catch (e) {
        console.log(e);        
      }
    }

    return{
      result1,
      result2,
      handleReload,
    }
  }
}
</script>

<style>

.action-render_table {
    background: var(--url__icon) no-repeat;
    cursor: pointer;
    margin-left: 12px;
    position: relative;
    width: 24px;
    height: 24px;
  }
  .action-render_table::before {
    display: none;
    position: absolute;
    background-color: var(--menu__color);
    color: var(--text__while-color);
    text-align: center;
    padding: 6px 6px;
    border-radius: 3px;
    top: 120%;
    font-size: 12px;
  }
  .action-render_table:hover:before {
    display: block;
  }
.overview{
  background-color: var(--while__color);
  width: 100%;
  min-height: 120px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  position: relative;
}
.overview-item {
  display: flex;
  align-items: center;
}
.separate-line-overview{
  height: calc(100% - 32px);
    width: 1px;
    background: #707070;
    position: absolute;
    left: 50%;
    top: 16px;
}
.overview-image{
  background: var(--url__icon) no-repeat;
  cursor: pointer;
  width: 94px;
  height: 94px;
  min-width: 94px;
  min-height: 94px;
  border: 2px solid;
  border-radius: 50%;
  border-color: #fff;
  margin-right: 30px;
}
.overview-item_left {
  padding-right: 40px;
}
.overview-item_right {
  padding-left: 40px;
}
.overview-item_left .overview-image{
  background-position: -27px -1311px;
}
.overview-item_left .overview-image:hover{
  border-color: rgba(254,167,17,.3)!important;
}
.overview-item_right .overview-image{
  background-position: -139px -1307px;
}
.overview-item_right .overview-image:hover{
  border-color: rgba(255,0,0,.3)!important;
}
.overview-item_left .overview-text{
  text-align: right;
}
.overview-item_right .overview-text{
  text-align: left;
}
.overview-item_left .overview-text_total{
  color: #fea711;
}
.overview-item_right .overview-text_total{
  color: #eb1d1d;;
}
.overview-text_total{
  font-size: 38px;
  line-height: 38px;
}
.overview-text_name{
  color: #212121;
  font-size: 14px;
  font-weight: 700;
  line-height: 26px;
}
.overview-text_notification{
  color: #8c8c8e;
  font-size: 16px;
  text-transform: uppercase;
}
.collapse-overview{
  border: 2px solid #e2e9f2;
    background: #f2f5f8;
    width: 26px;
    height: 16px;
    position: absolute;
    cursor: pointer;
    z-index: 9;
    top: 0px;
    right: 15px;
    background: var(--url__icon) no-repeat;
    background-position: -125px -362px;
    border-top: none;
}
.overview-reload{
  position: absolute;
    width: 24px;
    height: 24px;
    top: 5px;
    right: 5px;
    cursor: pointer;
    z-index: 9;
    background: var(--url__icon) no-repeat;
    background-position: -423px -201px;
}
.overview-reload:hover{
  background-position: -1097px -88px;
}
.overview-reload::before{
  content: "Tải lại số liệu tổng hợp";
    width: 130px;
    left: -112px;
}
</style>
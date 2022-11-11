<template>
    <div class="modal-body" :class="{ active : isShowFullModal }">
      <div v-show="isShowFormMain" class="form">
        <div class="form-header">
          <div class="modal-title">
            <h2>{{ titleForm }}</h2>
            <div class="form-title">
              <div v-if="typeNature === eNum.Goods" class="nature">
                <div class="form-title_image form-goods">
                </div>
                <div class="form-title_header">
                  Hàng hoá
                </div>
              </div>
              <div v-if="typeNature === eNum.Service" class="nature">
                <div class="form-title_image form-service">
                </div>
                <div class="form-title_header">
                  Dịch vụ
                </div>
              </div>
              <div v-if="typeNature === eNum.Materials" class="nature">
                <div class="form-title_image form-materials">
                </div>
                <div class="form-title_header">
                  Nguyên vật liệu
                </div>
              </div>
              <div v-if="typeNature === eNum.FinishedProduct" class="nature">
                <div class="form-title_image form-finished-product">
                </div>
                <div class="form-title_header">
                  Thành phẩm
                </div>
              </div>
              <div v-if="typeNature === eNum.ToolTools" class="nature">
                <div class="form-title_image form-tool-tools">
                </div>
                <div class="form-title_header">
                  Công cụ dụng cụ
                </div>
              </div>
              <div @click="handleSelectNature(false)" class="form-title_link">
                Thay đổi tính chất
              </div>
            </div>
          </div>
          <div class="modal-close">
            <div class="modal-icon modal-icon_help"></div>
            <div
              @click="handleCloseModal(false)"
              class="modal-icon modal-icon_close"
            ></div>
          </div>
        </div>
        <div class="form-container">
          <div class="form-detail flex-center">
            <div class="form-item form-item_left">
              <div class="form-item_input">
                <div class="form-group ms-big">
                  <input-default
                    ref="inputFocus"
                    :required="true"
                    :focus="true"
                    :type="'text'"
                    :maxLength="255"
                    :label="'Tên'"
                    v-model="inventoryItem.inventoryItemName"
                    :messageValid="inventoryItemNotification.validateName"
                    :class="{ 'is-valid': isValid && inventoryItem.inventoryItemName == '' }"
                  ></input-default>
                </div>
              </div>
              <div class="form-item_input">
                <div class="form-group ms-small-s">
                  <input-default
                    :required="true"
                    :type="'text'"
                    :maxLength="25"
                    :label="'Mã'"
                    :leftMessage="'95%'"
                    v-model="inventoryItem.inventoryItemCode"
                    :messageValid="inventoryItemNotification.validateCode"
                    :class="{ 'is-valid': isValid && inventoryItem.inventoryItemCode == '' }"
                  ></input-default>
                </div>
                <div class="form-group ms-big">
                  <input-combobox
                    :options="optionCommodityGroup"
                    widthOptionSelect="600px"
                    widthLabelCode="250px"
                    :value="'commodityGroupID'"
                    :header="'commodityName'"
                    :labelCode="'Mã nhóm vật tư hàng hoá, dịch vụ'"
                    :labelName="'Tên nhóm vật tư hàng hoá, dịch vụ'"
                    :headerCode = "'commodityCode'"
                    :label="'Nhóm VTHH'"
                    :toolTip="'Nhóm vật tư hàng hoá'"
                    :selectMultiple="true"
                    :headerSelectMultiple="'commodityCode'"
                    v-model="commodityGroupID"
                    :addIcon="true"
                    :handleAddIcon="handleToggleFormInventoryItemCategory"
                  ></input-combobox>
                </div>
              </div>
              <div class="form-item_input">
                <div class="form-group ms-small-s">
                  <input-combobox
                    :options="optionUnit"
                    :value="'unitCalculationID'"
                    :header="'unitCalculationName'"
                    :label="'Đơn vị tính chính'"
                    v-model="inventoryItem.unitCalculationID"
                    v-model:textField="inventoryItem.unitCalculationName"
                    :leftMessage="'90%'"
                    :addIcon="true"
                    :handleAddIcon="handleToggleFormUnit"
                  ></input-combobox>
                </div>
                <div class="form-group ms-small">
                  <input-combobox
                    :options="[
                      { value: 'Chưa xác định', header: 'Chưa xác định' },
                      { value: 'Không giảm thuế', header: 'Không giảm thuế' },
                      { value: 'Có giảm thuế', header: 'Có giảm thuế' },
                    ]"
                    :value="'value'"
                    :header="'header'"
                    :label="'Giảm thuế theo NQ43'"
                    :toolTip="'Trạng thái tra cứu giảm thuế theo nghị quyết 43/2022/QH15'"
                    :disabled="true"
                    v-model="inventoryItem.depreciatedTax"
                  ></input-combobox>
                </div>
                <div class="form-group ms-small info-input">
                  <div class="info-input_icon"></div>
                  <div class="info-input_text">
                    Tra cứu giảm thuế
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item">
              <div class="p-upload_image">
                <div class="image-form">
                  <img v-if="inventoryItem.avatar !== '' && inventoryItem.avatar" @click="$refs.v_image.click()" class="image-form-style" v-bind:src="inventoryItem.avatar.includes('/Assets/Images/') ? baseUrl.baseUrlImage + inventoryItem.avatar : inventoryItem.avatar" alt="">
                  <div @click="$refs.v_image.click()" class="upload-image"></div>
                </div>
                <div class="image-tool">
                  <div @click="$refs.v_image.click()" class="image-tool_item tool-edit"></div>
                  <div class="separate-line-upload"></div>
                  <input accept="image/*" @change="onFileSelected" ref="v_image" class="separate-line-chose_image" type="file">
                  <div @click="inventoryItem.avatar = ''; $refs.v_image.value = ''" class="image-tool_item tool-delete"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="divide-line"></div>
          <div class="form-detail">
            <div v-show="typeNature !== eNum.Service" class="form-item_input">
                <div class="form-group ms-small-s">
                  <input-combobox
                    :options="[
                      { value: '1 tháng', header: '1 tháng' },
                      { value: '2 tháng', header: '2 tháng' },
                      { value: '3 tháng', header: '3 tháng' },
                      { value: '6 tháng', header: '6 tháng' },
                      { value: '9 tháng', header: '9 tháng' },
                      { value: '1 năm', header: '1 năm' },
                      { value: '2 năm', header: '2 năm' },
                      { value: '3 năm', header: '3 năm' },
                      { value: '6 năm', header: '6 năm' },
                      { value: '9 năm', header: '9 năm' },
                      { value: '12 năm', header: '12 năm' },
                    ]"
                    :value="'value'"
                    :header="'header'"
                    :label="'Thời hạn bảo hành'"
                    v-model="inventoryItem.warrantyPeriod"
                  ></input-combobox>
                </div>
                <div class="form-group ms-small-s">
                  <input-default
                    :type="'text'"
                    :label="'Số lượng tồn tối thiểu'"
                    :isNumber="true"
                    v-model.number="inventoryItem.minimumStock"
                  ></input-default>
                </div>
                <div class="form-group ms-big ">
                  <input-default
                    :type="'text'"
                    :label="'Nguồn gốc'"
                    :maxLength="255"
                    v-model="inventoryItem.origin"
                  ></input-default>
                </div>
              </div>
              <div v-show="typeNature !== eNum.Service" class="form-item_input">
                <div class="form-group">
                  <label>Mô tả</label>
                  <textarea
                    class="input"
                    v-model="inventoryItem.description"
                  ></textarea>
                </div>
              </div>
              <div class="form-item_input">
                <div class="form-group">
                  <input-default
                    :type="'text'"
                    :label="'Diễn giải khi mua'"
                    v-model="inventoryItem.explanationBuy"
                  ></input-default>
                </div>
              </div>
              <div class="form-item_input">
                <div class="form-group">
                  <input-default
                    :type="'text'"
                    :label="'Diễn giải khi bán'"
                    v-model="inventoryItem.explanationSell"
                  ></input-default>
                </div>
              </div>
          </div>
          <div class="form-hidden">
            <div class="form-hidden_container">
              <div class="form-hidden_container-item" :class="{active : isShowFormHidden}">
                <div @click="handleToggleShowFormHidden" class="form-hidden_item">
                  <div class="form-hidden_icon"></div>
                  <div class="form-hidden_text">
                    Thông tin ngầm định
                  </div>
                </div>
                <div class="form-hidden_content" :class="{ 'active-service' : typeNature === eNum.Service }">
                  <div class="form-hidden_content-container" v-show="isShowFormHidden">
                    <div class="form-item_input">
                      <div class="form-group" style="display: none;"></div>
                      <div v-show="typeNature !== eNum.Service" class="form-group">
                        <input-combobox
                          :widthLabelCode="'170px'"
                          :widthOptionSelect="'450px'"
                          :options="optionDepot"
                          :value="'depotID'"
                          :header="'depotName'"
                          :label="'Kho ngầm định'"
                          :labelCode="'Mã kho'"
                          :labelName="'Tên kho'"
                          :headerCode = "'depotCode'"
                          v-model="inventoryItem.depotID"
                          v-model:textField="inventoryItem.depotName"
                          :addIcon="true"
                          :handleAddIcon="handleToggleFormDepot"
                        ></input-combobox>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :maxLength="80"
                          :label="'Tài khoản giảm giá'"
                          v-model="inventoryItem.accountSale"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Đơn mua cố định'"
                          :isNumber="true"
                          v-model.number="inventoryItem.orderFix"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Thuế suất GTGT (%)'"
                          :toolTip="'Thuế giá trị gia tăng'"
                          :isNumber="true"
                          :maxValue="100"
                          v-model.number="inventoryItem.vatTax"
                        ></input-default>
                      </div>
                      <div v-show="typeNature !== eNum.Service" class="form-group ">
                        <input-default
                          :type="'text'"                          
                          :maxLength="80"
                          :label="'Tài khoản kho'"
                          v-model="inventoryItem.accountDepot"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Tài khoản trả lại'"
                          :maxLength="80"
                          v-model="inventoryItem.accountReturn"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Đơn mua giá gần nhất'"
                          :isNumber="true"
                          v-model.number="inventoryItem.orderNearest"
                        ></input-default>
                      </div>
                      <div v-show="typeNature !== eNum.Service" class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Thuế suất thuế NK (%)'"
                          :toolTip="'Thuế suất thuế nhập khẩu'"
                          :isNumber="true"
                          :maxValue="100"
                          v-model.number="inventoryItem.vatImport"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :maxLength="80"
                          :label="'Tài khoản doanh thu'"
                          v-model="inventoryItem.accountRevenue"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Tài khoản chi phí'"
                          :maxLength="80"
                          v-model="inventoryItem.accountCost"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Đơn giá bán'"
                          :isNumber="true"
                          v-model.number="inventoryItem.orderSell"
                        ></input-default>
                      </div>
                      <div v-show="typeNature !== eNum.Service" class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Thuế suất thuế XK (%)'"
                          :toolTip="'Thuế suất thuế suất khẩu'"
                          :isNumber="true"
                          :maxValue="100"
                          v-model.number="inventoryItem.vatExport"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :maxLength="80"
                          :label="'Tài khoản chiết khấu'"
                          v-model="inventoryItem.accountDiscount"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Tỉ lệ CKMH (%)'"
                          :toolTip="'Tỉ lệ chiết khấu mua hàng'"
                          :isNumber="true"
                          :maxValue="100"
                          v-model.number="inventoryItem.ratioDiscount"
                        ></input-default>
                      </div>
                      <div class="form-group">
                        <input-default
                          :type="'text'"
                          :label="'Nhóm HHDV chịu thuế TTĐB'"
                          :toolTip="'Nhóm hàng hoá dịch vụ chịu thuế tiêu thụ đặc biệt'"
                          v-model="inventoryItem.vatGroupExciceTax"
                        ></input-default>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-hidden_container-item">
                <div class="form-hidden_item">
                  <div class="form-hidden_icon"></div>
                  <div class="form-hidden_text">
                    Chiết khấu bán hàng
                  </div>
                </div>
                <div class="form-hidden_content">
                </div>
              </div>
              <div class="form-hidden_container-item">
                <div class="form-hidden_item">
                  <div class="form-hidden_icon"></div>
                  <div class="form-hidden_text">
                    Đơn vị chuyển đổi
                  </div>
                </div>
                <div class="form-hidden_content">
                </div>
              </div>
              <div class="form-hidden_container-item">
                <div class="form-hidden_item">
                  <div class="form-hidden_icon"></div>
                  <div class="form-hidden_text">
                    Công thức tính số lượng
                  </div>
                </div>
                <div class="form-hidden_content">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-action">
          <div class="form-action_container">
            <div class="form-action_item">
              <button
                @click="handleSaveData(true)"
                style="margin-right: 9px"
                class="btn modal-icon btn-form_cat up"
              >
                Cất
              </button>
              <button
                @click="handleSaveData(false)"
                class="btn btn-success modal-icon btn-form_cat-them up"
              >
                Cất và thêm
              </button>
            </div>
            <div class="form-action_item">
              <button @click="handleCloseModal(true)" class="btn">
                Huỷ
              </button>
            </div>
          </div>
        </div>
        <button ref="focusLoop" class="focus-loop"></button>
      </div>
      <div v-show="!isShowFormMain" class="form">
        <div class="setting-header">
          <h1>Chọn tính chất hàng hóa dịch vụ</h1>
          <div class="modal-close">
            <div class="modal-icon modal-icon_help"></div>
            <div
              @click="handleCloseModal(true)"
              class="modal-icon modal-icon_close"
            ></div>
          </div>
        </div>
        <div class="setting-container">
          <div @click="handleSelectNature(eNum.Goods)" class="setting-item item-goods">
            <div class="setting-icon"></div>
            <div class="setting-text">
              <div class="setting-text_title">Hàng hoá</div>
              <div class="setting-text_content">Sản phẩm bạn mua và bán lại cho khách hàng</div>
            </div>
          </div>
          <div @click="handleSelectNature(eNum.Service)" class="setting-item item-service">
            <div class="setting-icon"></div>
            <div class="setting-text">
              <div class="setting-text_title">Dịch vụ</div>
              <div class="setting-text_content">Dịch vụ mà bạn cung cấp cho khách hàng</div>
            </div>
          </div>
          <div @click="handleSelectNature(eNum.Materials)" class="setting-item item-materials">
            <div class="setting-icon"></div>
            <div class="setting-text">
              <div class="setting-text_title">Nguyên vật liệu</div>
              <div class="setting-text_content">Nguyên liệu đầu vào dùng cho hoạt động sản xuất, xây dựng, cung cấp dịch vụ</div>
            </div>
          </div>
          <div @click="handleSelectNature(eNum.FinishedProduct)" class="setting-item item-finished-product">
            <div class="setting-icon"></div>
            <div class="setting-text">
              <div class="setting-text_title">Thành phẩm</div>
              <div class="setting-text_content">Là sản phẩm đầu ra của quá trình sản xuất</div>
            </div>
          </div>
          <div @click="handleSelectNature(eNum.ToolTools)" class="setting-item item-tool-tools">
            <div class="setting-icon"></div>
            <div class="setting-text">
              <div class="setting-text_title">Công cụ dụng cụ</div>
              <div class="setting-text_content">Công cụ dụng cụ mua về nhập kho chưa đưa vào sử dụng</div>
            </div>
          </div>
        </div>
      </div>
      <div @click="()=> {isShowFullModal = !isShowFullModal}" class="resize">
        <div class="resize-icon"></div>
      </div>
      <teleport to="#app">
        <modal-form v-if="isShowFormUnit">
          <form-unit @handle-click-close-modal="handleToggleFormUnit" @handle-save-data-props="handleSaveDataUnit"></form-unit>
        </modal-form>
        <modal-form v-if="isShowFormInventoryItemCategory">
          <form-inventory-item-category @handle-click-close-modal="handleToggleFormInventoryItemCategory" @handle-save-data-props="handleSaveDataInventoryItemCategory"></form-inventory-item-category>
        </modal-form>
        <modal-form v-if="isShowFormDepot">
          <form-depot @handle-click-close-modal="handleToggleFormDepot" @handle-save-data-props="handleSaveDataDepot"></form-depot>
        </modal-form>
      </teleport>
    </div>
  </template>
  
  <script>
  import { onMounted, onUnmounted, ref, toRefs, onBeforeMount } from "vue";
  import InputDefault from "../../../components/InputComponents/BaseInput.vue";
  import InputCombobox from "../../../components/InputComponents/BaseCombobox.vue";
  import { useStore } from "vuex";
  import eNum from "../../../utils/eNum.js";
  import notificationMessage from "../../../utils/notification.js";
  import utilEnum from "../../../utils/index.js";
  import eventFormCtrlShiftS from '../../../utils/event/eventFormCtrlShiftS';
  import callApi from '../../../api/callApi';//Record
  import apiInventoryItem from "../../../api/inventoryItem";
  import unitCalculation from '../../../api/unitCalculation';
  import apiCommodityGroup from "../../../api/commodityGroup";
  import apiDepot from "../../../api/depot";
  import FormUnit from "../Unit/FormUnit.vue";
  import FormDepot from "../Depot/FormDepot.vue";
  import FormInventoryItemCategory from "../DIInventoryItemCategory/FormInventoryItemCategory.vue";
  import ModalForm from "../../../components/BaseModalForm.vue";
  import baseUrl from "../../../configs/index";
  export default {
    components: {
      InputDefault,
      InputCombobox,
      FormUnit,
      ModalForm,
      FormInventoryItemCategory,
      FormDepot,
    },
    props: {
      // dữ liệu bản ghi sửa
      recordEdit: {
        type: Object,
      },
      // dữ liệu bản ghi thêm
      recordAdd: {
        type: Object,
      },
      // tính chất
      typeNature: {
        type: Number,
      },
    },
    setup(props, context) {
      /**
       * Lấy ra record sửa và nhân bản truyền qua từ props
       * NK Tiềm 28/10/2022
       */
      const { recordEdit, recordAdd, typeNature } = toRefs(props);
      /**
       * Lấy ra api thêm sửa xoá, sinh mã
       */
      const { nextValue, createRecordApi, editRecordApi } = apiInventoryItem;
      const isShowFormMain = ref(false);
      /**
       * hàm xử lý chọn Tính chất
       * NK Tiềm 28/10/2022
       */
      function handleSelectNature(Nature){
        try {
          if(Nature === false){
            isShowFormMain.value = false;
          }
          else{
            context.emit("handle-change-type-nature", Nature);
            inventoryItem.value.nature = Nature;
            inventoryItemReset.value.nature = Nature;
            isShowFormMain.value = true;
            setTimeout(()=>{inputFocus.value.tagInput.focus();},50)
          }
        } catch (e) {
          console.log(e);
        }
      }
      /**
       * Xử lý hiển thị và lưu data khi thêm đơn vị
       * NK Tiềm 28/10/2022
       */
      const isShowFormUnit = ref(false);
      function handleSaveDataUnit(response){
        try {
          optionUnit.value = [response, ...optionUnit.value];
          inventoryItem.value.unitCalculationID = response.unitCalculationID;
        } catch (e) {
          console.log(e);
        }
      }
      /**
       * hàm xử lý đóng mở form thêm đơn vị
       * NK Tiềm 28/10/2022
       */
      function handleToggleFormUnit(){
        isShowFormUnit.value = !isShowFormUnit.value;
      }

      /**
       * Xử lý hiển thị và lưu data khi thêm nhóm vật tư hàng hoá và dịch vụ
       * NK Tiềm 28/10/2022
       */
      const isShowFormInventoryItemCategory = ref(false);
      function handleSaveDataInventoryItemCategory(response){
        try {
          optionCommodityGroup.value = listToTree([response, ...optionCommodityGroup.value], "commodityGroupID");
          commodityGroupID.value.push(response.commodityGroupID);
        } catch (e) {
          console.log(e);
        }
      }
      /**
       * hàm xử lý đóng mở form nhóm vthh
       * NK Tiềm 28/10/2022
       */
      function handleToggleFormInventoryItemCategory(){
        isShowFormInventoryItemCategory.value = !isShowFormInventoryItemCategory.value;
      }

      /**
       * Xử lý hiển thị và lưu data khi thêm nhà kho
       * NK Tiềm 28/10/2022
       */
      const isShowFormDepot = ref(false);
      /**
       * hàm xử lý đóng mở form thêm kho
       * NK Tiềm 28/10/2022
       */
      function handleSaveDataDepot(response){
        try {
          optionDepot.value = [response, ...optionDepot.value];
          inventoryItem.value.depotID = response.depotID;
        } catch (e) {
          console.log(e);
        }
      }
      function handleToggleFormDepot(){
        isShowFormDepot.value = !isShowFormDepot.value;
      }

      const isShowFullModal = ref(false);
      /**
       * Xử lý hiển thị form đang ẩn 
       * NK Tiềm 28/10/2022
       */
      const isShowFormHidden = ref(false);
      function handleToggleShowFormHidden(){
        isShowFormHidden.value = !isShowFormHidden.value;
      }
      /**
       * Biến chứa nội dung title from thêm mới, sửa
       * NK Tiềm 28/10/2022
       */
      const titleForm = ref("");
  
      /**
       * Lấy ra các thông báo khi hiện thông báo
       * NK Tiềm 28/10/2022
       */
      const { QUESTION_DATA_CHANGE, inventoryItemNotification, } = notificationMessage;
      
      /**
       * Element input focus vào khi mở from
       * NK Tiềm 28/10/2022
       */
      const inputFocus = ref(null);
  
      /**
       * Element chứa vị trí tab đến sẽ quay lại tab ban đầu tạo thành vòng lặp
       * NK Tiềm 28/10/2022
       */
      const focusLoop = ref(null); 
  
      /**
       * Lưu trạng thái from đang thêm hay đang sửa
       * NK Tiềm 28/10/2022
       */
      const stateAdd = ref(true); 
  
      /**
       * Lưu trạng thái hiển thị validate
       * NK Tiềm 28/10/2022
       */
      const isValid = ref(false);
  
      /**
       * Biến store vuex
       * NK Tiềm 28/10/2022
       */
      const store = useStore();
  
      /**
       * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
       * NK Tiềm 28/10/2022
       */
      const { TypeSuccess, MessageSuccessAdd, MessageSuccessEdit, AddFormInventoryItem, EditFormInventoryItem, } = eNum;
  
      /**
       * Biến record v-model và gửi lên sever khi thêm sửa xoá
       * NK Tiềm 28/10/2022
       */
      const commodityGroupID = ref([]);

      /**
       * Hàm xử lý select file ảnh chuyển ảnh về dạng base64
       */
      function onFileSelected(event){
        try{
          let image = event.target.files[0];
          let reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = event => {
            inventoryItem.value.avatar = event.target.result;
          }
        }
        catch{
          return;
        }
      }
      const inventoryItem = ref({
        unitCalculationID: "",
        commodityCode: "",
        commodityGroupID: "",
        avatar: "",
        depotID: "",
        inventoryItemCode: "",
        inventoryItemName: "",
        nature: eNum.Goods,
        depreciatedTax: "Chưa xác định",
        warrantyPeriod: "",
        minimumStock: "",
        origin: "",
        description: "",
        explanationBuy: "",
        explanationSell: "",
        accountDepot: "",
        accountRevenue: "",
        accountDiscount: "",
        accountSale: "",
        accountReturn: "",
        accountCost: "",
        ratioDiscount: "",
        vatTax: "",
        vatImport: "",
        vatExport: "",
        vatGroupExciceTax: "",
        orderFix: "",
        orderNearest: "",
        orderSell: "",
        isActive: true,
      });
  
      /**
       * thông tin record sửa nếu form sửa thì sẽ nhận được thông tin cần sửa
       * NK Tiềm 28/10/2022
       */
      const recordEditReset = ref(null);
  
      /**
       * Thông tin nhân viên cần reset về rỗng khi ở lại from thêm tiếp không đóng from
       * NK Tiềm 28/10/2022
       */
      const inventoryItemReset = ref({
        unitCalculationID: "",
        commodityCode: "",
        commodityGroupID: "",
        avatar: "",
        depotID: "",
        inventoryItemCode: "",
        inventoryItemName: "",
        nature: eNum.Goods,
        depreciatedTax: "Chưa xác định",
        warrantyPeriod: "",
        minimumStock: "",
        origin: "",
        description: "",
        explanationBuy: "",
        explanationSell: "",
        accountDepot: "",
        accountRevenue: "",
        accountDiscount: "",
        accountSale: "",
        accountReturn: "",
        accountCost: "",
        ratioDiscount: "",
        vatTax: "",
        vatImport: "",
        vatExport: "",
        vatGroupExciceTax: "",
        orderFix: "",
        orderNearest: "",
        orderSell: "",
        isActive: true,
      });
  
      /**
       * lưu danh sách đơn vị
       * NK Tiềm 28/10/2022
       */
      const optionUnit = ref([]);
      const optionCommodityGroup = ref([]);
      const optionDepot = ref([]);
  
      /**
       * Thực hiện chuyển đổi props thành data trước khi mounted
       * NK Tiềm 28/10/2022
       */
      const { listToTree } = utilEnum;
      onBeforeMount(async () => {
        if (recordEdit.value || recordAdd.value || typeNature.value) {
          //Kiểm tra và cập nhật trạng thái tính chất của page
          isShowFormMain.value = true;
          if(recordEdit.value){
            await context.emit("handle-change-type-nature", recordEdit.value.nature);
          }
          else if(recordAdd.value){
            await context.emit("handle-change-type-nature", recordAdd.value.nature);
          }
        }
        titleForm.value = AddFormInventoryItem;
        await callApi(unitCalculation.getAllRecordListActive, null, async (response) => { optionUnit.value = response; }, store, true);
        await callApi(apiCommodityGroup.getAllRecordList, null, async (response) => { optionCommodityGroup.value = listToTree(response, "commodityGroupID"); }, store, true);
        await callApi(apiDepot.getAllRecordListActive, null, async (response) => { optionDepot.value = response; }, store, true);
        if (recordEdit.value) {
          titleForm.value = EditFormInventoryItem;
          inventoryItem.value = {
            ...recordEdit.value,
          }; 
          stateAdd.value = false;
          recordEditReset.value = {
            ...recordEdit.value,
          };
          // Đưa danh sách id vào mảng
          commodityGroupID.value = inventoryItem.value.commodityGroupID ? inventoryItem.value.commodityGroupID.split(';') : [];
        } else {
          titleForm.value = AddFormInventoryItem;
          if (recordAdd.value) {
            inventoryItem.value = {
              ...recordAdd.value,
            };
            commodityGroupID.value = inventoryItem.value.commodityGroupID ? inventoryItem.value.commodityGroupID.split(';') : [];
          }
          //Lấy mã mới khi thêm 
          await callApi(nextValue, null, (response) => { inventoryItem.value.inventoryItemCode = response; inventoryItemReset.value.inventoryItemCode = response;  }, store, true);
        }
      });
      
      /**
       * Hàm xử lý lặp khi tab focus
       * NK Tiềm 28/10/2022
       */
      const handleLoopFocus = function () {
        inputFocus.value.tagInput.focus();
      };
  
      const { handleEventFormCtrlShiftS, handleEventInterruptFormCtrlShiftS } = eventFormCtrlShiftS;
  
      /**
       * Hàm xử lý các event nút bấm tắt
       * NK Tiềm 28/10/2022
       */
      function handleKey(event){
        try {
          if(!isShowFormUnit.value && !isShowFormInventoryItemCategory.value && !isShowFormDepot.value){
            handleEventFormCtrlShiftS(event, handleCloseModal, null, handleSaveData, false, handleSaveData, true)
          }
        } catch (e) {
          console.log(e);
        }
      }
  
      /**
       * Khi mounted component thì sẽ lắng nghe sự kiện các phím tắt
       * NK Tiềm 28/10/2022
       */
      onMounted(() => {
        focusLoop.value.addEventListener("focus", handleLoopFocus);
        window.addEventListener("keydown", handleKey);
        window.addEventListener("keyup", handleEventInterruptFormCtrlShiftS);
      });
  
      /**
       * Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
       * NK Tiềm 28/10/2022
       */
      onUnmounted(() => {
        window.removeEventListener("focus", handleLoopFocus);
        window.removeEventListener("keydown", handleKey);
        window.removeEventListener("keyup", handleEventInterruptFormCtrlShiftS);
      });
  
      /**
       * Hàm xử lý validate các trường
       * NK Tiềm 28/10/2022
       */
      function validateInput() {
        return [
          // Validate code
          inventoryItem.value.inventoryItemCode.trim() === "" ? inventoryItemNotification.validateCode : null,
          // Validate name
          inventoryItem.value.inventoryItemName.trim() === "" ? inventoryItemNotification.validateName : null,
        ].filter((item) => {
          if(item){
            return true;
          }
        });
      }
  
      /**
       * Biến lưu trạng thái khi call api lỗi hay không lỗi
       * NK Tiềm 28/10/2022
       */
      const errorApi = ref(false);
      const v_image = ref(null);
      /**
       * Hàm xử lý format dữ liệu trước khi gọi api
       */
      function formatDataApiPost(){
        // Lọc ra các tính chất dịch vụ cần loại bỏ
        if(typeNature.value === eNum.Service){
          inventoryItem.value.warrantyPeriod = "";
          inventoryItem.value.minimumStock = "";
          inventoryItem.value.origin = "";
          inventoryItem.value.description = "";
          inventoryItem.value.depotID = "";
          inventoryItem.value.depotName = "";
          inventoryItem.value.accountDepot = "";
          inventoryItem.value.vatImport = "";
          inventoryItem.value.vatExport = "";
        }
        inventoryItem.value.commodityGroupID = commodityGroupID.value.join(';');
        inventoryItem.value.commodityCode = optionCommodityGroup.value.filter((item)=> {return commodityGroupID.value.includes(item.commodityGroupID)}).reduce((acc, cur) => {
          return [...acc, cur.commodityCode]
        },[]).join(';')
      }
  
      /**
       * Hàm xử lý call api
       * NK Tiềm 28/10/2022
       * @param {api truyền vào thêm hoặc sửa} Api 
       */
      async function callApiForm(Api) {
        formatDataApiPost();
        let data = {};
        // format dữ liệu data gửi lên sever 
        Object.keys(inventoryItem.value).forEach(key => {
          if(inventoryItem.value[key] === 0 || inventoryItem.value[key] !== '' && inventoryItem.value[key])
          data = {...data , [key] : inventoryItem.value[key]};
        })
        await callApi(Api, data ,async (response) => { 
          store.dispatch("config/addNotification", {
              type: TypeSuccess,
              message: stateAdd.value ? MessageSuccessAdd : MessageSuccessEdit
            });
            errorApi.value = false;
            if(!stateAdd.value){
              //sau khi sửa xong sửa trạng thái modal thành thêm user
              stateAdd.value = true; 
              store.dispatch("inventoryItem/editRecordAction", {...inventoryItem.value, inventoryItemID: response });
            }
            else{
              store.dispatch("inventoryItem/addRecordAction", { ...inventoryItem.value, inventoryItemID: response });
            }
         }, store, false, () => {
          errorApi.value = true;
         });
      }
  
      /**
       * Hàm xử lý sự kiện khi bấm nút save
       * @param {Biến trạng thái có đóng modal hay là không} closeModal 
       * NK Tiềm 28/10/2022
       */
      async function handleSaveData(closeModal) {
        try {
          const messValid = validateInput();
          if (messValid.length > 0) {
            isValid.value = true;
            store.dispatch("config/setToggleShowNotificationErrorAction", messValid);
          } else {
            if (stateAdd.value) {
              // Trạng thái thêm thì sẽ truyền api thêm
              await callApiForm(createRecordApi);
            } else {
              // Trạng thái sửa thì sẽ truyền api sửac
              await callApiForm(editRecordApi);
            }
            if (closeModal === true && errorApi.value === false) {
              context.emit("handle-click-close-modal");
            } else if (errorApi.value === false) {
              titleForm.value = AddFormInventoryItem;
              isValid.value = false;
              inventoryItem.value = { ...inventoryItemReset.value };
              v_image.value.value = '';
              await callApi(nextValue, null, (response) => { inventoryItem.value.inventoryItemCode = response; }, store, true);
              // Khi thêm xong nếu không đóng form thì sẽ focus vào ô input
              inputFocus.value.tagInput.focus(); 
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
  
      /**
       * Hàm xử lý đóng thông báo và đóng modal
       * NK Tiềm 28/10/2022
       */
      function handleCloseNotificationAndCloseModal() {
        try {
          context.emit("handle-click-close-modal");
        } catch (e) {
          console.log(e);
        }
      }
      //(Khắc Tiềm - 15.09.2022)  Hàm xử lý đóng thông báo và modal và thêm dữ liệu
  
      /**
       * Hàm đóng modal và lưu dữ liệu
       * NK Tiềm 28/10/2022
       */
      function handleSaveDataAndCloseNotificationAndCloseModal() {
        handleSaveData(true);
      }
  
      /**
       * Hàm xử lý đóng modal khi thực hiện nhấn nút đóng modal
       * @param {Nếu nhấn vào nút huỷ thì sẽ đóng ngay ngược lại sẽ hỏi lưu} closeNow 
       * NK Tiềm 28/10/2022
       */
      function handleCloseModal(closeNow) {
        //Kiếm tra dữ liệu khi đóng form khác thì hỏi có lưu hay không
        try {
          if (closeNow) {
            context.emit("handle-click-close-modal");
          } else if (stateAdd.value) {
            if (JSON.stringify(inventoryItem.value) != JSON.stringify(inventoryItemReset.value)) {
              saveDataWhenCloseModal();
            } else {
              context.emit("handle-click-close-modal");
            }
          } else if (stateAdd.value === false) {
            if (JSON.stringify(inventoryItem.value) != JSON.stringify(recordEditReset.value)) {
              saveDataWhenCloseModal();
            } else {
              context.emit("handle-click-close-modal");
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
  
      /**
       * Hàm hiển thị thông báo khi nhấn đóng modal
       * NK Tiềm 28/10/2022
       */
      function saveDataWhenCloseModal() {
        store.dispatch("config/setToggleShowNotificationQuestionAction", { action: handleSaveDataAndCloseNotificationAndCloseModal, refuseAction: handleCloseNotificationAndCloseModal, message: QUESTION_DATA_CHANGE});
      }
  
      return {
        eNum,
        inputFocus,
        v_image,
        baseUrl,
        isShowFullModal,
        commodityGroupID,
        inventoryItemNotification,
        isShowFormHidden,
        isShowFormUnit,
        isShowFormMain,
        isValid,
        focusLoop,
        titleForm,
        optionUnit,
        optionCommodityGroup,
        optionDepot,
        inventoryItem,
        isShowFormInventoryItemCategory,
        isShowFormDepot,
        onFileSelected,
        handleSelectNature,
        handleCloseModal,
        handleSaveData,
        handleToggleShowFormHidden,
        handleToggleFormUnit,
        handleSaveDataUnit,
        handleToggleFormInventoryItemCategory,
        handleSaveDataInventoryItemCategory,
        handleToggleFormDepot,
        handleSaveDataDepot,
      };
    },
    emits: ["handle-click-close-modal","handle-change-type-nature"],
  };
</script>
<style scoped>
::-webkit-scrollbar-track {
    border-radius: 0;
    direction: rtl;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #B8BCC3;
  }
  ::-webkit-scrollbar-thumb:hover {
    border-radius: 0;
    background: #808080;
  }
  ::-webkit-scrollbar {
    height: 10px; /* height of horizontal scrollbar ← You're missing this */
    width: 8px;
  }
.modal-body {
  width: 800px;
  height: 100%;
  margin: 0;
  left: calc(100%);
  top: 0;
  transform: none;
  padding: 0 16px;
  position: relative;
  transition: all ease 0.15s;
}
.modal-body.active{
  width: 100%;
  left: 10px !important;
}
.active .modal-body {
  left: calc(100% - 800px);
}
.modal-title{
  padding: 0;
}
h2{
  font-size: 16px;
  font-weight: 700;
  color: #111;
  margin-bottom: 8px;
  width: 100%;
}
.modal-close{
  padding-right: 0;
}
.form{
  display: flex;
  height: 100%;
  flex-direction: column;
}
.form-container{
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px 4px 0 4px;
}
.form-group{
  padding-bottom: 8px;
}
.form-action{
  padding: 0;
  margin-top: 0;
}
.form-action_container{
  padding: 11px 4px;
  border-top: 4px solid #f4f5f8;
}
.form-item_left{
  min-width: 68%;
}
.form-header{
  border-bottom: solid 1px #d4d7dc;
}
.modal-title{
  display: flex;
  flex-direction: column;
  padding: 14px 0 12px 4px;
}
.form-title{
  display: flex;
  align-items: center;
  width: 100%;
}
.form-title_image{
  background: var(--url__icon) no-repeat;
  width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
}
.form-goods{
  background-position: -32px -748px;
}
.form-service{
  background-position: -170px -748px;
}
.form-materials{
  background-position: -597px -748px;
}
.form-finished-product{
  background-position: -101px -748px;
}
.form-tool-tools{
  background-position: -678px -749px;
}
.nature{
  display: flex;
  align-items: center;
}
.form-title_header{
  padding: 0px 8px 0 14px;
  font-size: 18px;
}
.form-title_link{
  cursor: pointer;
  color: #308ccd;
  transition: all .1s ease-in;
}
.form-title_link:hover{
  margin-top: -3px;
}
.ms-small-s{
  width: 25%;
}
.info-input{
  color: #308ccd;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.info-input_text{
  margin-top: 20px;
}
.divide-line{
  margin: 6px 0 20px 0;
  height: 1px;
  width: 100%;
  background: #d4d7dc;
}
textarea{
  resize: none;
    display: block;
    padding: 9px;
    font-size: 13px;
    width: 100%;
    height: 56px;
}
.form-hidden_item{
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.form-hidden_item:hover{
  color: #2CA01C;
}
.form-hidden_icon{
    background: var(--url__icon) no-repeat;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    background-position: -320px -360px;
    transition: all ease .25s;
  }
  .form-hidden_content{
    height: 0px;
    overflow: hidden;
    transition: all ease 0.2s;
  }
  .form-hidden_content-container{
    display: flex;
  }
  .form-hidden_container-item.active .form-hidden_content{
    height: 270px;
  }
  .form-hidden_container-item.active .form-hidden_icon{
    transform: rotate(90deg);
  }
  .form-hidden_text{
    font-size: 16px;
  }
  .form-hidden_content .form-item_input{
    flex-direction: column;
  }
  .form-hidden_content .form-group{
    padding-left: 0;
  }
  .form-hidden_content .form-item_input + .form-item_input{
    padding-left: 10px;
  }
  .p-upload_image{
    padding: 22px 0 0 45px;
  }
  .image-form{
    min-width: 120px;
    border: 1px solid #e0e0e0;
    min-height: 120px;
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .upload-image{
    width: 64px;
    height: 64px;
    background: var(--url__icon) no-repeat;
    background-position: -25px -448px;
    transform: scale(1.5);
    cursor: pointer;
    z-index: 0;
  }
  .image-form-style{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .image-tool{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
  }
  .image-tool_item{
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    background: var(--url__icon) no-repeat;
    cursor: pointer;
  }
  .tool-edit{
    background-position: -412px -308px;
  }
  .tool-delete{
    background-position: -460px -308px;
  }
  .separate-line-upload{
    height: 14px;
    width: 1px;
    background: #d4d7dc;
    margin: 0 10px;
  }
  .modal-icon.up::before {
    top: -125%;
  }
  .modal-icon.up::after {
    top: -39%;
    border-left:8px solid transparent;
    border-right:8px solid transparent;
    border-bottom: 8px solid transparent;
    border-top: 8px solid #505050;
  }
  .form-hidden_content .form-item_input{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .form-hidden_content .form-item_input .form-group{
    width: 25%;
  }
  .form-hidden_content.active-service .form-item_input .form-group{
    width: calc(100% / 3);
  }
  .form-hidden_content .form-item_input .form-group + .form-group{ 
    padding-left: 8px;
  }
  .info-input_icon{
    margin-right: 8px;
    margin-top: 20px;
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    background: var(--url__icon2) no-repeat;
    cursor: pointer;
    background-position: -2240px -521px;
  }
  .separate-line-chose_image{
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .resize{
    position: absolute;
    width: 12px;
    height: 50px;
    background: #fff;
    border: 1px solid #d4d7dc;
    border-radius: 8px;
    position: absolute;
    align-items: center;
    left: -6px;
    top: 43%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .resize-icon{
    background: var(--url__icon) no-repeat;
    min-width: 16px;
    min-height: 16px;
    background-position: -32px -360px;
  }
  .modal-body.active .resize-icon{
    transform: rotateY(180deg);
  }
  .setting-header {
  display: flex;
  height: 59px;
  justify-content: space-between;
  border-bottom: solid 1px #d4d7dc;
  padding-left: 4px;
}
.setting-header h1 {
  font-size: 24px;
  padding: 12px 0 16px 0;
  font-family: 'notosans-semibold';
}
.setting-header_icon {
  background: var(--url__icon) no-repeat;
  background-position: -144px -144px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-top: 12px;
}
.setting-item{
  height: 121px;
  border-bottom: solid 1px #d4d7dc;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 16px 20px 20px;
}
.setting-icon{
  background: var(--url__icon) no-repeat;
  width: 85px;
  height: 85px;
  min-width: 85px;
  min-height: 85px;
}
.item-goods .setting-icon{
  background-position: -31px -631px;
}
.item-service .setting-icon{
  background-position: -264px -631px;
}
.item-materials .setting-icon{
  background-position: -960px -631px;
}
.item-finished-product .setting-icon{
  background-position: -148px -631px;
}
.item-tool-tools .setting-icon{
  background-position: -1078px -631px;
}
.setting-text{
  padding-left: 16px;
}
.setting-text_title{
  font-family: 'notosans-semibold';
    font-weight: 700;
    margin-bottom: 8px;
}
</style>
  
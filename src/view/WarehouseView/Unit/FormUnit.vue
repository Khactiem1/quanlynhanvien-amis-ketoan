<template>
  <div class="modal-body">
    <div class="form">
      <div class="form-header">
        <div class="modal-title">
          <h2>{{ titleForm }}</h2>
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
        <div class="form-group ms-small">
          <input-default
            :focus="true"
            :required="true"
            :type="'text'"
            :maxLength="100"
            :messageValid="unitCalculationNotification.validateName"
            :label="'Đơn vị tính'"
            :class="{ 'is-valid': isValid && unitCalculation.unitCalculationName == '' }"
            v-model="unitCalculation.unitCalculationName"
            ref="inputFocus"
          ></input-default>
        </div>
        <div class="form-group">
          <label>Mô tả</label>
          <textarea
            class="input"
            v-model="unitCalculation.unitCalculationDetail"
          ></textarea>
        </div>
      </div>
      <div class="form-action">
        <div class="form-action_container">
          <div class="form-action_item">
            <button
              @click="handleSaveData(true)"
              style="margin-right: 9px"
              class="btn modal-icon btn-form_cat"
            >
              Cất
            </button>
            <button
              @click="handleSaveData(false)"
              class="btn btn-success modal-icon btn-form_cat-them"
            >
              Cất và thêm
            </button>
          </div>
          <div class="form-action_item">
            <button @click="handleCloseModal(true)"  class="btn">
              Huỷ
            </button>
          </div>
        </div>
      </div>
      <button ref="focusLoop" class="focus-loop"></button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, toRefs, onBeforeMount } from "vue";
import InputDefault from "../../../components/InputComponents/BaseInput.vue";
import { useStore } from "vuex";
import eNum from "../../../utils/eNum.js";
import notificationMessage from "../../../utils/notification.js";
import eventFormCtrlShiftS from '../../../utils/event/eventFormCtrlShiftS';
import callApi from '../../../api/callApi';
import apiUnitCalculation from "../../../api/unitCalculation";
export default {
  components: {
    InputDefault,
  },
  props: {
    // Bản ghi sửa
    recordEdit: {
      type: Object,
    },
    // Bản ghi nhân bản
    recordAdd: {
      type: Object,
    },
  },
  setup(props, context) {
    const { createRecordApi, editRecordApi } = apiUnitCalculation;
    /**
     * Biến chứa nội dung title from thêm mới, sửa
     * NK Tiềm 28/10/2022
     */
    const titleForm = ref("");

    /**
     * Lấy ra các thông báo khi hiện thông báo
     * NK Tiềm 28/10/2022
     */
    const { QUESTION_DATA_CHANGE, unitCalculationNotification, } = notificationMessage;
    
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
     * Lấy ra record sửa và nhân bản truyền qua từ props
     * NK Tiềm 28/10/2022
     */
    const { recordEdit, recordAdd } = toRefs(props);

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
    const { TypeSuccess, MessageSuccessAdd, MessageSuccessEdit, AddFormUnit, EditFormUnit, } = eNum;

    /**
     * Biến record v-model và gửi lên sever khi thêm sửa xoá
     * NK Tiềm 28/10/2022
     */
    const unitCalculation = ref({
      unitCalculationName: "",
      unitCalculationDetail: "",
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
    const unitCalculationReset = ref({
      unitCalculationName: "",
      unitCalculationDetail: "",
      isActive: true,
    });

    /**
     * Thực hiện chuyển đổi props thành data trước khi mounted
     * NK Tiềm 28/10/2022
     */
    onBeforeMount(async () => {
      titleForm.value = AddFormUnit;
      if (recordEdit.value) {
        titleForm.value = EditFormUnit;
        unitCalculation.value = { ...recordEdit.value }; 
        stateAdd.value = false;
        recordEditReset.value = { ...recordEdit.value };
      } else {
        titleForm.value = AddFormUnit;
        if (recordAdd.value) {
          unitCalculation.value = { ...recordAdd.value };
        }
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
        handleEventFormCtrlShiftS(event, handleCloseModal, null, handleSaveData, false, handleSaveData, true)
      } catch (e) {
        console.log(e);
      }
    }

    /**
     * Khi mounted component thì sẽ lắng nghe sự kiện các phím tắt
     * NK Tiềm 28/10/2022
     */
    onMounted(() => focusLoop.value.addEventListener("focus", handleLoopFocus));
    onMounted(() => window.addEventListener("keydown", handleKey));
    onMounted(() => window.addEventListener("keyup", handleEventInterruptFormCtrlShiftS));

    /**
     * Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
     * NK Tiềm 28/10/2022
     */
    onUnmounted(() => window.removeEventListener("focus", handleLoopFocus));
    onUnmounted(() => window.removeEventListener("keydown", handleKey));
    onUnmounted(() => window.removeEventListener("keyup", handleEventInterruptFormCtrlShiftS));

    /**
     * Hàm xử lý validate các trường
     * NK Tiềm 28/10/2022
     */
    function validateInput() {
      return [
        // Validate code
        unitCalculation.value.unitCalculationName.trim() === "" ? unitCalculationNotification.validateName : null,
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

    /**
     * Hàm xử lý call api
     * NK Tiềm 28/10/2022
     * @param {api truyền vào thêm hoặc sửa} Api 
     */
    async function callApiForm(Api) {
      await callApi(Api, { ...unitCalculation.value },async (response) => { 
        context.emit("handle-save-data-props", { ...unitCalculation.value, unitCalculationID: response });
        store.dispatch("config/addNotification", {
            type: TypeSuccess,
            message: stateAdd.value ? MessageSuccessAdd : MessageSuccessEdit
          });
          errorApi.value = false;
          if(!stateAdd.value){
            //sau khi sửa xong sửa trạng thái modal thành thêm user
            stateAdd.value = true; 
            store.dispatch("unitCalculation/editRecordAction", { ...unitCalculation.value, unitCalculationID: response });
          }
          else{
            store.dispatch("unitCalculation/addRecordAction", { ...unitCalculation.value, unitCalculationID: response });
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
          titleForm.value = AddFormUnit;
          isValid.value = false;
          unitCalculation.value = { ...unitCalculationReset.value };
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
      try {
        handleSaveData(true);
      } catch (e) {
        console.log(e);
      }
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
        if (
          JSON.stringify(unitCalculation.value) != JSON.stringify(unitCalculationReset.value)
        ) {
          saveDataWhenCloseModal();
        } else {
          context.emit("handle-click-close-modal");
        }
      } else if (stateAdd.value === false) {
        if (
          JSON.stringify(unitCalculation.value) !=
          JSON.stringify(recordEditReset.value)
        ) {
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
      inputFocus,
      unitCalculation,
      unitCalculationNotification,
      isValid,
      focusLoop,
      titleForm,
      handleCloseModal,
      handleSaveData,
    };
  },
  emits: ["handle-click-close-modal", "handle-save-data-props"],
};
</script>
<style scoped>
.modal-body {
  max-width: 500px !important;
  width: 500px !important;
  left: calc(50vw - 250px) !important;
  height: auto !important;
  top: 50vh !important;
  transform: translateY(-50%) !important;
  padding: 0 !important;
}
textarea{
  resize: none;
    display: block;
    padding: 9px;
    font-size: 13px;
    width: 100%;
    height: 100%;
}
</style>

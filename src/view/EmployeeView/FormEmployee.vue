<template>
  <div class="modal-body">
    <div class="form">
      <div class="form-header">
        <div class="modal-title">
          <h2>{{ titleForm }}</h2>
          <div class="form-header_checkbox">
            <div class="check form-checkbox_item">
              <input-checkbox>
                <div class="info-checkbox">Là khách hàng</div>
              </input-checkbox>
            </div>
            <div class="check form-checkbox_item">
              <input-checkbox>
                <div class="info-checkbox">Là nhà cung cấp</div>
              </input-checkbox>
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
          <div class="form-item">
            <div class="form-item_input">
              <!-- Thêm is-valid để validate -->
              <div class="form-group ms-small">
                <input-default
                  :focus="true"
                  :required="true"
                  :type="'text'"
                  :maxLength="20"
                  :messageValid="employeeNotification.validateCode"
                  :label="'Mã'" 
                  :class="{ 'is-valid': isValid && employee.employeeCode == '' }"
                  v-model="employee.employeeCode"
                  ref="inputFocus"
                ></input-default>
              </div>
              <div class="form-group ms-big">
                <input-default
                  :required="true"
                  :type="'text'"
                  :maxLength="80"
                  :messageValid="employeeNotification.validateName"
                  :label="'Tên'"
                  :class="{ 'is-valid': isValid && employee.employeeName == '' }"
                  v-model="employee.employeeName"
                ></input-default>
              </div>
            </div>
            <div class="form-group">
              <input-combobox
                :options="optionUnit"
                :value="'unitID'"
                :header="'unitName'"
                :label="'Đơn vị'"
                :labelCode="'Mã đơn vị'"
                :labelName="'Tên đơn vị'"
                :required="true"
                :headerCode = "'unitCode'"
                :messageValid="employeeNotification.validateUnit"
                :class="{ 'is-valid': isValid && !employee.unitID }"
                v-model="employee.unitID"
              ></input-combobox>
            </div>
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'Chức danh'"
                v-model="employee.employeeTitle"
              ></input-default>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item_input">
              <div class="form-group ms-small">
                <input-calendar
                  :label="'Ngày sinh'"
                  :maxDate="new Date()"
                  :messageValid="employeeNotification.validateDateOfBirth"
                  v-model="employee.dateOfBirth"
                >
                </input-calendar>
              </div>
              <div style="padding-left: 16px" class="form-group ms-big">
                <label>Giới tính</label>
                <div class="input-radio_item">
                  <input-radio
                    label="Nam"
                    :value="eNum.MALE"
                    v-model.number="employee.gender"
                  ></input-radio>
                  <input-radio
                    label="Nữ"
                    :value="eNum.FEMALE"
                    v-model.number="employee.gender"
                  ></input-radio>
                  <input-radio
                    label="Khác"
                    :value="eNum.OTHER"
                    v-model.number="employee.gender"
                  ></input-radio>
                </div>
              </div>
            </div>
            <div class="form-item_input">
              <div class="form-group ms-big">
                <input-default
                  :type="'text'"
                  :label="'Số CMND'"
                  :toolTip="'Số chứng minh nhân dân'"
                  v-model="employee.identityCard"
                ></input-default>
              </div>
              <div class="form-group ms-small">
                <input-calendar
                  :label="'Ngày cấp'"
                  :maxDate="new Date()"
                  :messageValid="employeeNotification.validateDayForIdentity"
                  v-model="employee.dayForIdentity"
                >
                </input-calendar>
              </div>
            </div>
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'Nơi cấp'"
                v-model="employee.grantAddressIdentity"
              ></input-default>
            </div>
          </div>
        </div>
        <div class="form-detail">
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Địa chỉ'"
              v-model="employee.employeeAddress"
            ></input-default>
          </div>
          <div class="form-item flex-center">
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'ĐT di động'"
                :toolTip="'Điện thoại di động'"
                :isPhone="true"
                :messageValid="employeeNotification.validatePhoneNumber"
                v-model="employee.phoneNumber"
              ></input-default>
            </div>
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'ĐT cố định'"
                :isPhone="true"
                :toolTip="'Điện thoại cố định'"
                :messageValid="employeeNotification.validateLandlinePhone"
                v-model="employee.landlinePhone"
              ></input-default>
            </div>
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'Email'"
                :isEmail="true"
                :messageValid="employeeNotification.validateEmail"
                v-model="employee.employeeEmail"
              ></input-default>
            </div>
          </div>
          <div class="form-item flex-center">
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'Tài khoản ngân hàng'"
                v-model="employee.bankAccount"
              ></input-default>
            </div>
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'Tên ngân hàng'"
                v-model="employee.nameBank"
              ></input-default>
            </div>
            <div class="form-group">
              <input-default
                :type="'text'"
                :label="'Chi nhánh'"
                v-model="employee.branchBank"
              ></input-default>
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
            <button @click="handleCloseModal(true)" class="btn">
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
import InputCheckbox from "../../components/InputComponents/BaseCheckbox.vue";
import InputCalendar from "../../components/InputComponents/BaseCalendar.vue";
import InputDefault from "../../components/InputComponents/BaseInput.vue";
import InputCombobox from "../../components/InputComponents/BaseCombobox.vue";
import InputRadio from "../../components/InputComponents/BaseRadio.vue";
import { useStore } from "vuex";
import eNum from "../../utils/eNum.js";
import notificationMessage from "../../utils/notification.js";
import validate from "../../utils/validate.js";
import utilEnum from "../../utils/index.js";
import eventFormCtrlShiftS from '../../utils/event/eventFormCtrlShiftS';
import callApi from '../../api/callApi';
import apiEmployee from "../../api/employee.js";
import apiUnit from '../../api/unit';
export default {
  components: {
    InputCheckbox,
    InputDefault,
    InputCombobox,
    InputRadio,
    InputCalendar,
  },
  props: {
    recordEdit: {
      type: Object,
    },
    recordAdd: {
      type: Object,
    },
  },
  setup(props, context) {
    const { nextValue, createRecordApi, editRecordApi } = apiEmployee;
    /**
     * Biến chứa nội dung title from thêm mới, sửa
     * NK Tiềm 28/10/2022
     */
    const titleForm = ref("");

    /**
     * Hàm xử ý format date gửi về cho sever
     * NK Tiềm 28/10/2022
     */
    const { formatDateYYYYMMDD } = utilEnum;

    /**
     * Lấy ra các thông báo khi hiện thông báo
     * NK Tiềm 28/10/2022
     */
    const { QUESTION_DATA_CHANGE, employeeNotification, } = notificationMessage;
    
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
    const { TypeSuccess, MessageSuccessAdd, MessageSuccessEdit, AddFormEmployee, EditFormEmployee, } = eNum;

    /**
     * Lấy ra hàm validate email và validate phone
     * NK Tiềm 28/10/2022
     */
    const { validateEmail, validatePhone } = validate;

    /**
     * Biến record v-model và gửi lên sever khi thêm sửa xoá
     * NK Tiềm 28/10/2022
     */
    const employee = ref({
      employeeName: "",
      gender: eNum.MALE,
      dateOfBirth: null,
      identityCard: "",
      employeeTitle: "",
      unitID: "",
      bankAccount: "",
      nameBank: "",
      branchBank: "",
      dayForIdentity: null,
      grantAddressIdentity: "",
      phoneNumber: "",
      landlinePhone: "",
      employeeEmail: "",
      employeeAddress: "",
      employeeCode: "",
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
    const employeeReset = ref({
      employeeName: "",
      gender: eNum.MALE,
      dateOfBirth: null,
      identityCard: "",
      employeeTitle: "",
      unitID: "",
      bankAccount: "",
      nameBank: "",
      branchBank: "",
      dayForIdentity: null,
      grantAddressIdentity: "",
      phoneNumber: "",
      landlinePhone: "",
      employeeEmail: "",
      employeeAddress: "",
      employeeCode: "",
    });

    /**
     * lưu danh sách đơn vị
     * NK Tiềm 28/10/2022
     */
    const optionUnit = ref([]);

    /**
     * Thực hiện chuyển đổi props thành data trước khi mounted
     * NK Tiềm 28/10/2022
     */
    onBeforeMount(async () => {
      titleForm.value = AddFormEmployee;
      /**
       * Lấy danh sách đơn vị
       * NK Tiềm 28/10/2022
       */
      await callApi(apiUnit.getRecordList, null, async (response) => { optionUnit.value = response; }, store, true);
      if (recordEdit.value) {
        titleForm.value = EditFormEmployee;
        employee.value = {
          ...recordEdit.value,
          dateOfBirth: formatDateYYYYMMDD(recordEdit.value.dateOfBirth),
          dayForIdentity: formatDateYYYYMMDD(recordEdit.value.dayForIdentity),
        }; 
        stateAdd.value = false;
        recordEditReset.value = {
          ...recordEdit.value,
          dateOfBirth: formatDateYYYYMMDD(recordEdit.value.dateOfBirth),
          dayForIdentity: formatDateYYYYMMDD(recordEdit.value.dayForIdentity),
        };
      } else {
        titleForm.value = AddFormEmployee;
        if (recordAdd.value) {
          employee.value = {
            ...recordAdd.value,
            dateOfBirth: formatDateYYYYMMDD(recordAdd.value.dateOfBirth),
            dayForIdentity: formatDateYYYYMMDD(
              recordAdd.value.dayForIdentity
            ),
          };
        }
        //Lấy mã mới khi thêm 
        await callApi(nextValue, null, (response) => { employee.value.employeeCode = response; employeeReset.value.employeeCode = response;}, store, true);
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
      handleEventFormCtrlShiftS(event, handleCloseModal, null, handleSaveData, false, handleSaveData, true)
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
        employee.value.employeeCode.trim() === "" ? employeeNotification.validateCode : null,
        // Validate name
        employee.value.employeeName.trim() === "" ? employeeNotification.validateName : null,
        // Validate unit
        !employee.value.unitID ? employeeNotification.validateUnit : null, 
        // Validate dateOfBirth
        employee.value.dateOfBirth ? new Date(employee.value.dateOfBirth) > new Date() 
          ? employeeNotification.validateDateOfBirth : null : null,
        // Validate dayForIdentity
        employee.value.dayForIdentity ? new Date(employee.value.dayForIdentity) > new Date() 
          ? employeeNotification.validateDayForIdentity : null : null,
        // Validate PhoneNumber
        validatePhone(employee.value.phoneNumber) === false && employee.value.phoneNumber != "" && employee.value.phoneNumber 
          ? employeeNotification.validatePhoneNumber : null,
        // Validate landlinePhone
        validatePhone(employee.value.landlinePhone) === false && employee.value.landlinePhone != "" && employee.value.landlinePhone
          ? employeeNotification.validateLandlinePhone : null,
        // Validate employeeEmail
        validateEmail(employee.value.employeeEmail) === false && employee.value.employeeEmail != "" && employee.value.employeeEmail
          ? employeeNotification.validateEmail : null,
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
      await callApi(Api, {
        ...employee.value,
        dateOfBirth: employee.value.dateOfBirth === "" ? null : employee.value.dateOfBirth,
        dayForIdentity: employee.value.dayForIdentity === "" ? null  : employee.value.dayForIdentity,
      },async (response) => { 
        store.dispatch("config/addNotification", {
            type: TypeSuccess,
            message: stateAdd.value ? MessageSuccessAdd : MessageSuccessEdit
          });
          errorApi.value = false;
          if(!stateAdd.value){
            //sau khi sửa xong sửa trạng thái modal thành thêm user
            stateAdd.value = true; 
            store.dispatch("employee/editRecordAction", { ...employee.value, employeeID: response });
          }
          else{
            store.dispatch("employee/addRecordAction", { ...employee.value, employeeID: response });
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
          titleForm.value = AddFormEmployee;
          isValid.value = false;
          employee.value = { ...employeeReset.value };
          await callApi(nextValue, null, (response) => { employee.value.employeeCode = response; }, store, true);
          // Khi thêm xong nếu không đóng form thì sẽ focus vào ô input
          inputFocus.value.tagInput.focus(); 
        }
      }
    }

    /**
     * Hàm xử lý đóng thông báo và đóng modal
     * NK Tiềm 28/10/2022
     */
    function handleCloseNotificationAndCloseModal() {
      context.emit("handle-click-close-modal");
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
      if (closeNow) {
        context.emit("handle-click-close-modal");
      } else if (stateAdd.value) {
        if (
          JSON.stringify(employee.value) != JSON.stringify(employeeReset.value)
        ) {
          saveDataWhenCloseModal();
        } else {
          context.emit("handle-click-close-modal");
        }
      } else if (stateAdd.value === false) {
        if (
          JSON.stringify(employee.value) !=
          JSON.stringify(recordEditReset.value)
        ) {
          saveDataWhenCloseModal();
        } else {
          context.emit("handle-click-close-modal");
        }
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
      employee,
      employeeNotification,
      eNum,
      isValid,
      focusLoop,
      titleForm,
      optionUnit,
      handleCloseModal,
      handleSaveData,
    };
  },
  emits: ["handle-click-close-modal"],
};
</script>
<style scoped>
.modal-body {
  max-width: 900px;
  width: 900px;
  left: calc(50vw - 450px);
}

</style>

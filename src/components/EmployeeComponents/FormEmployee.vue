<template>
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
                :messageValid="'Mã không được để trống.'"
                :label="'Mã'"
                :tab="1"
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
                :messageValid="'Tên không được để trống.'"
                :label="'Tên'"
                :tab="2"
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
              :required="true"
              :messageValid="'Dữ liệu <đơn vị> không có trong danh mục.'"
              :tab="7"
              :class="{ 'is-valid': isValid && !employee.unitID }"
              v-model="employee.unitID"
            ></input-combobox>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Chức danh'"
              :tab="10"
              v-model="employee.employeeTitle"
            ></input-default>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item_input">
            <div class="form-group ms-small">
              <input-calendar
                :tabindex="3"
                :label="'Ngày sinh'"
                v-model="employee.dateOfBirth"
              >
              </input-calendar>
            </div>
            <div style="padding-left: 16px" class="form-group ms-big">
              <label>Giới tính</label>
              <div class="input-radio_item">
                <input-radio
                  label="Nam"
                  :value="MALE"
                  v-model="employee.gender"
                  :tab="4"
                ></input-radio>
                <input-radio
                  label="Nữ"
                  :value="FEMALE"
                  v-model="employee.gender"
                  :tab="5"
                ></input-radio>
                <input-radio
                  label="Khác"
                  :value="OTHER"
                  v-model="employee.gender"
                  :tab="6"
                ></input-radio>
              </div>
            </div>
          </div>
          <div class="form-item_input">
            <div class="form-group ms-big">
              <input-default
                :type="'text'"
                :label="'Số CMND'"
                :tab="8"
                :toolTip="'Số chứng minh nhân dân'"
                v-model="employee.identityCard"
              ></input-default>
            </div>
            <div class="form-group ms-small">
              <input-calendar
                :tabindex="9"
                :label="'Ngày cấp'"
                v-model="employee.dayForIdentity"
              >
              </input-calendar>
            </div>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Nơi cấp'"
              :tab="11"
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
            :tab="12"
            v-model="employee.employeeAddress"
          ></input-default>
        </div>
        <div class="form-item flex-center">
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'ĐT di động'"
              :toolTip="'Điện thoại di động'"
              :tab="13"
              :isPhone="true"
              :messageValid="'Nhập đúng Số điện thoại.'"
              v-model="employee.phoneNumber"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'ĐT cố định'"
              :tab="14"
              :isPhone="true"
              :toolTip="'Điện thoại cố định'"
              :messageValid="'Nhập đúng Số điện thoại.'"
              v-model="employee.landlinePhone"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Email'"
              :tab="15"
              :isEmail="true"
              :messageValid="'Nhập đúng địa chỉ Email.'"
              v-model="employee.employeeEmail"
            ></input-default>
          </div>
        </div>
        <div class="form-item flex-center">
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Tài khoản ngân hàng'"
              :tab="16"
              v-model="employee.bankAccount"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Tên ngân hàng'"
              :tab="17"
              v-model="employee.nameBank"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Chi nhánh'"
              :tab="18"
              v-model="employee.branchBank"
            ></input-default>
          </div>
        </div>
      </div>
    </div>
    <div class="form-action">
      <div class="form-action_container">
        <div class="form-action_item">
          <button @click="handleCloseModal(true)" :tabindex="21" class="btn">
            Huỷ
          </button>
        </div>
        <div class="form-action_item">
          <button
            @click="handleSaveData(true)"
            style="margin-right: 5px"
            class="btn modal-icon btn-form_cat"
            :tabindex="19"
          >
            Cất
          </button>
          <button
            @click="handleSaveData(false)"
            class="btn btn-success modal-icon btn-form_cat-them"
            :tabindex="20"
          >
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
    <div tabindex="21" ref="focusLoop" class="focus-loop"></div>
    <teleport to="#app">
      <modal-notification v-if="isShowNotificationQuestion">
        <notification-question
          :cancelAction="cancelAction"
          :agreeAction="agreeAction"
          :messageAction="messageAction"
        ></notification-question>
      </modal-notification>
      <modal-notification v-if="isShowNotificationError">
        <notification-error
          :agreeAction="agreeAction"
          :messageAction="messageAction"
        ></notification-error>
      </modal-notification>
    </teleport>
  </div>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  onBeforeMount,
  computed,
} from "vue";
import InputCheckbox from "../InputComponents/InputCheckbox.vue";
import InputCalendar from "../InputComponents/InputCalendar.vue";
import InputDefault from "../InputComponents/InputDefault.vue";
import InputCombobox from "../InputComponents/InputCombobox.vue";
import InputRadio from "../InputComponents/InputRadio.vue";
import ModalNotification from "../SharedComponents/ModalNotification.vue";
import NotificationQuestion from "../SharedComponents/NotificationQuestion.vue";
import NotificationError from "../SharedComponents/NotificationError.vue";
import { useStore } from "vuex";
import eNum from "../../utils/eNum.js";
import notificationMessage from "../../utils/notification.js";
import validate from "../../utils/validate.js";
import utilEnum from "../../utils/index";
import { nextValue } from "../../api/employee";
import { createEmployeeApi, editEmployeeApi } from "../../api/employee";
export default {
  components: {
    InputCheckbox,
    InputDefault,
    InputCombobox,
    InputRadio,
    ModalNotification,
    NotificationQuestion,
    NotificationError,
    InputCalendar,
  },
  props: {
    employeeEdit: {
      type: Object,
    },
    employeeAdd: {
      type: Object,
    },
  },
  setup(props, context) {
    const titleForm = ref("");
    const { formatDateYYYYMMDD } = utilEnum;
    const {
      QUESTION_DATA_CHANGE,
      ERROR_EMPTY_DATA,
      ERROR_CORRECT_DATA,
      DUPLICATE_CODE,
      INVALID_INPUT,
    } = notificationMessage;
    const inputFocus = ref(null); //(Khắc Tiềm - 15.09.2022)  Biến lưu thẻ input phục vụ cho việc dom đến để focus
    const focusLoop = ref(null); //(Khắc Tiềm - 15.09.2022)  Biến lưu thẻ tab phục vụ cho việc xây dựng vòng lặp phím tab
    const stateAddEmployee = ref(true); //(Khắc Tiềm - 15.09.2022)  Biến kiểm tra trạng thái thêm hay sửa
    const { employeeEdit, employeeAdd } = toRefs(props); //(Khắc Tiềm - 15.09.2022)  Biến chứa dữ liệu props nhận vào là một user | employee
    const cancelAction = ref({}); //(Khắc Tiềm - 15.09.2022)  biến chứa các hành động huỷ thông báo
    const agreeAction = ref({}); //(Khắc Tiềm - 15.09.2022)  Biến chứa các hành động chấp nhận thông báo
    const messageAction = ref({}); //(Khắc Tiềm - 15.09.2022)  Biến chứa thông tin hiển thị thông báo
    const isValid = ref(false); //(Khắc Tiềm - 15.09.2022)  Biến điều kiện hiển thị các ô nhập sẽ validate
    const isShowNotificationQuestion = ref(false); //(Khắc Tiềm - 15.09.2022)  Biến hiển thị thông báo hỏi
    const isShowNotificationError = ref(false); //(Khắc Tiềm - 15.09.2022)  Biến hiển thị thông báo lỗi
    const store = useStore();
    const {
      ESC,
      CTRL,
      SHIFT,
      S,
      MALE,
      FEMALE,
      OTHER,
      DuplicateCode,
      InvalidInput,
      AddFormEmployee,
      EditFormEmployee,
    } = eNum;
    const { validateEmail, validatePhone } = validate;
    const eventCtrlShiftS = []; //(Khắc Tiềm - 15.09.2022)  lưu lại giá trị các phím bấm tắt không ngắt quãng
    const employee = ref({
      employeeName: "",
      gender: MALE,
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
    const employeeEditReset = ref(null); //(Khắc Tiềm - 15.09.2022)  thông tin người dùng sửa nếu form sửa thì sẽ nhận được thông tin cần sửa
    const employeeReset = ref({
      employeeName: "",
      gender: MALE,
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
    }); //(Khắc Tiềm - 15.09.2022)  thông tin người dùng sẽ reset sau khi thêm, sửa mà form không đóng
    const optionUnit = computed(() => store.state.unit.unitList); //(Khắc Tiềm - 15.09.2022)  danh sách đơn vị
    onBeforeMount(async () => {
      await store.dispatch("unit/getUnitListAction");
      if (employeeEdit.value) {
        titleForm.value = EditFormEmployee;
        employee.value = {
          ...employeeEdit.value,
          dateOfBirth: formatDateYYYYMMDD(employeeEdit.value.dateOfBirth),
          dayForIdentity: formatDateYYYYMMDD(employeeEdit.value.dayForIdentity),
        }; //(Khắc Tiềm - 15.09.2022)  chuyển đổi props thành data
        stateAddEmployee.value = false;
        employeeEditReset.value = {
          ...employeeEdit.value,
          dateOfBirth: formatDateYYYYMMDD(employeeEdit.value.dateOfBirth),
          dayForIdentity: formatDateYYYYMMDD(employeeEdit.value.dayForIdentity),
        };
      } else {
        titleForm.value = AddFormEmployee;
        if (employeeAdd.value) {
          employee.value = {
            ...employeeAdd.value,
            dateOfBirth: formatDateYYYYMMDD(employeeAdd.value.dateOfBirth),
            dayForIdentity: formatDateYYYYMMDD(employeeAdd.value.dayForIdentity),
          }; //(Khắc Tiềm - 15.09.2022)  chuyển đổi props thành data
        }
        await nextValue()
          .then(function (response) {
            employee.value.employeeCode = response;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    });
    //(Khắc Tiềm - 15.09.2022) Hàm xử lý các event nút bấm tắt
    const handleEvent = function (event) {
      if (event.keyCode === ESC) {
        handleCloseModal();
      } else if (
        event.keyCode === CTRL ||
        event.keyCode === SHIFT ||
        event.keyCode === S
      ) {
        if (!eventCtrlShiftS.includes(event.keyCode)) {
          eventCtrlShiftS.push(event.keyCode);
          if (eventCtrlShiftS.length === 3) {
            //(Khắc Tiềm - 15.09.2022) Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
            eventCtrlShiftS.length = 0;
            handleSaveData(false);
          } else if (eventCtrlShiftS.length === 2) {
            //(Khắc Tiềm - 15.09.2022) Nếu số lượng nút bấm mà === 2 trong đó k có nút shift thì sẽ là chức năng khác
            if (!eventCtrlShiftS.includes(SHIFT)) {
              event.preventDefault(); //(Khắc Tiềm - 15.09.2022) Không cho trình duyệt mở save as khi bấm ctrl + s
              eventCtrlShiftS.length = 0;
              handleSaveData(true);
            }
          }
        }
      }
    };
    //(Khắc Tiềm - 15.09.2022)  Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện
    const handleEventInterrupt = function (event) {
      if (
        event.keyCode === CTRL ||
        event.keyCode === SHIFT ||
        event.keyCode === S
      ) {
        if (eventCtrlShiftS.includes(event.keyCode)) {
          eventCtrlShiftS.length = 0;
        }
      }
    };
    //(Khắc Tiềm - 15.09.2022) Hàm đóng mở thông báo nhập sai dữ liệu
    function handleToggleNotificationError() {
      isShowNotificationError.value = !isShowNotificationError.value;
    }
    //(Khắc Tiềm - 15.09.2022) Hàm xử lý sự kiện khi bấm nút save
    const handleSaveData = async function (closeModal) {
      let errorApi = false;
      agreeAction.value = {
        display: "Đóng",
        action: handleToggleNotificationError,
      };
      if (employee.value.employeeCode.trim() == "") {
        messageAction.value = {
          display: ERROR_EMPTY_DATA + "mã nhân viên.",
        };
        isValid.value = true;
        handleToggleNotificationError();
      } else if (employee.value.employeeName.trim() == "") {
        messageAction.value = {
          display: ERROR_EMPTY_DATA + "Tên nhân viên.",
        };
        isValid.value = true;
        handleToggleNotificationError();
      } else if (!employee.value.unitID) {
        messageAction.value = {
          display: ERROR_EMPTY_DATA + "Đơn vị.",
        };
        isValid.value = true;
        handleToggleNotificationError();
      } else if (
        optionUnit.value.filter((item) => item.unitID !== employee.value.unitID)
          .length === 0
      ) {
        messageAction.value = {
          display: "Đơn vị không có trong danh mục.",
        };
        isValid.value = true;
        handleToggleNotificationError();
      } else if (
        validatePhone(employee.value.phoneNumber) === false &&
        employee.value.phoneNumber != "" &&
        employee.value.phoneNumber
      ) {
        messageAction.value = {
          display: ERROR_CORRECT_DATA + "Điện thoại di động.",
        };
        handleToggleNotificationError();
      } else if (
        validatePhone(employee.value.landlinePhone) === false &&
        employee.value.landlinePhone != "" &&
        employee.value.landlinePhone
      ) {
        messageAction.value = {
          display: ERROR_CORRECT_DATA + "Điện thoại cố định.",
        };
        handleToggleNotificationError();
      } else if (
        validateEmail(employee.value.employeeEmail) === false &&
        employee.value.employeeEmail != "" &&
        employee.value.employeeEmail
      ) {
        messageAction.value = {
          display: ERROR_CORRECT_DATA + "Email.",
        };
        handleToggleNotificationError();
      } else {
        if (stateAddEmployee.value) {
          //(Khắc Tiềm - 15.09.2022)  Thêm
          //(Khắc Tiềm - 15.09.2022)  Gọi hàm loading quay quay ở đây
          store.dispatch("config/setToggleShowLoaderAction");
          await createEmployeeApi({
            ...employee.value,
            gender: Number(employee.value.gender),
            dateOfBirth:
              employee.value.dateOfBirth === "" ? null : employee.value.dateOfBirth,
            dayForIdentity:
              employee.value.dayForIdentity === ""
                ? null
                : employee.value.dayForIdentity,
          })
            .then(function () {
              errorApi = false;
              store.dispatch("employee/getEmployeeListAction");
            })
            .catch(function (error) {
              console.log(error.response.data);
              errorApi = true;
              messageAction.value = {
                display:
                  error.response.data.errorCode === DuplicateCode
                    ? `Mã nhân viên <${employee.value.employeeCode}> ${DUPLICATE_CODE}`
                    : error.response.data.errorCode === InvalidInput
                    ? INVALID_INPUT
                    : error.response.data.userMsg,
              };
              handleToggleNotificationError();
            });
          store.dispatch("config/setToggleShowLoaderAction");
          //(Khắc Tiềm - 15.09.2022)  tắt hàm loading quay quay ở đây
        } else {
          //(Khắc Tiềm - 15.09.2022)  sửa
          store.dispatch("config/setToggleShowLoaderAction");
          await editEmployeeApi({
            ...employee.value,
            gender: Number(employee.value.gender),
            dateOfBirth:
              employee.value.dateOfBirth === "" ? null : employee.value.dateOfBirth,
            dayForIdentity:
              employee.value.dayForIdentity === ""
                ? null
                : employee.value.dayForIdentity,
          })
            .then(function () {
              errorApi = false;
              store.dispatch("employee/getEmployeeListAction");
            })
            .catch(function (error) {
              console.log(error.response.data);
              errorApi = true;
              messageAction.value = {
                display:
                  error.response.data.errorCode === DuplicateCode
                    ? `Mã nhân viên <${employee.value.employeeCode}> ${DUPLICATE_CODE}`
                    : error.response.data.errorCode === InvalidInput
                    ? INVALID_INPUT
                    : error.response.data.userMsg,
              };
              handleToggleNotificationError();
            });
          store.dispatch("config/setToggleShowLoaderAction");
          stateAddEmployee.value = true; //(Khắc Tiềm - 15.09.2022)  sau khi sửa xong sửa trạng thái modal thành thêm user
        }
        if (closeModal === true && errorApi === false) {
          context.emit("handle-click-close-modal");
        } else if (errorApi === false) {
          titleForm.value = AddFormEmployee;
          isValid.value = false;
          employee.value = { ...employeeReset.value };
          await nextValue()
            .then(function (response) {
              employee.value.employeeCode = response;
            })
            .catch(function (error) {
              console.log(error.response.data);
            });
          inputFocus.value.tagInput.focus(); //(Khắc Tiềm - 15.09.2022) Khi thêm xong nếu không đóng form thì sẽ focus vào ô input
        }
      }
    };
    //(Khắc Tiềm - 15.09.2022)  hàm xử lý lặp focus
    const handleLoopFocus = function () {
      inputFocus.value.tagInput.focus();
    };
    //(Khắc Tiềm - 15.09.2022) Khi mounted component thì sẽ lắng nghe sự kiện các phím tắ
    onMounted(() => window.addEventListener("keydown", handleEvent));
    onMounted(() => focusLoop.value.addEventListener("focus", handleLoopFocus));
    onMounted(() => window.addEventListener("keyup", handleEventInterrupt));
    //(Khắc Tiềm - 15.09.2022)  Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
    onUnmounted(() => window.removeEventListener("keydown", handleEvent));
    onUnmounted(() => window.removeEventListener("focus", handleLoopFocus));
    onUnmounted(() =>
      window.removeEventListener("keyup", handleEventInterrupt)
    );
    //(Khắc Tiềm - 15.09.2022)  Hàm xử lý đóng mở thông báo
    function handleToggleNotificationQuestion() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
    }
    //(Khắc Tiềm - 15.09.2022)  Hàm xử lý đóng thông báo và đóng modal
    function handleCloseNotificationAndCloseModal() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
      context.emit("handle-click-close-modal");
    }
    //(Khắc Tiềm - 15.09.2022)  Hàm xử lý đóng thông báo và modal và thêm dữ liệu
    function handleSaveDataAndCloseNotificationAndCloseModal() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
      handleSaveData(true);
    }
    function handleCloseModal(closeNow) {
      //(Khắc Tiềm - 15.09.2022) Kiếm tra dữ liệu khi đóng form khác thì hỏi có lưu hay không
      if (closeNow) {
        context.emit("handle-click-close-modal");
      } else if (stateAddEmployee.value) {
        if (JSON.stringify(employee.value) != JSON.stringify(employeeReset.value)) {
          cancelAction.value = {
            display: "Huỷ",
            action: handleToggleNotificationQuestion,
          };
          agreeAction.value = {
            display: "Có",
            refuseActionDisplay: "Không",
            refuseAction: handleCloseNotificationAndCloseModal,
            action: handleSaveDataAndCloseNotificationAndCloseModal,
          };
          messageAction.value = {
            display: QUESTION_DATA_CHANGE,
          };
          isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
        } else {
          context.emit("handle-click-close-modal");
        }
      } else if (stateAddEmployee.value === false) {
        if (JSON.stringify(employee.value) != JSON.stringify(employeeEditReset.value)) {
          cancelAction.value = {
            display: "Huỷ",
            action: handleToggleNotificationQuestion,
          };
          agreeAction.value = {
            display: "Có",
            refuseActionDisplay: "Không",
            refuseAction: handleCloseNotificationAndCloseModal,
            action: handleSaveDataAndCloseNotificationAndCloseModal,
          };
          messageAction.value = {
            display: QUESTION_DATA_CHANGE,
          };
          isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
        } else {
          context.emit("handle-click-close-modal");
        }
      }
    }

    return {
      inputFocus,
      employee,
      MALE,
      FEMALE,
      OTHER,
      isValid,
      cancelAction,
      focusLoop,
      titleForm,
      optionUnit,
      agreeAction,
      messageAction,
      isShowNotificationQuestion,
      isShowNotificationError,
      handleCloseModal,
      handleSaveData,
    };
  },
  emits: ["handle-click-close-modal"],
};
</script>
<style>
.focus-loop {
  opacity: 0;
}
</style>

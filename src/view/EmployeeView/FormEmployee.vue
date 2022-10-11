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
                :messageValid="employeeNotification.validateCode"
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
                :messageValid="employeeNotification.validateName"
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
              :messageValid="employeeNotification.validateUnit"
              :tab="3"
              :class="{ 'is-valid': isValid && !employee.unitID }"
              v-model="employee.unitID"
            ></input-combobox>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Chức danh'"
              :tab="4"
              v-model="employee.employeeTitle"
            ></input-default>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item_input">
            <div class="form-group ms-small">
              <input-calendar
                :tabindex="5"
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
                  :value="MALE"
                  v-model.number="employee.gender"
                  :tab="6"
                ></input-radio>
                <input-radio
                  label="Nữ"
                  :value="FEMALE"
                  v-model.number="employee.gender"
                  :tab="7"
                ></input-radio>
                <input-radio
                  label="Khác"
                  :value="OTHER"
                  v-model.number="employee.gender"
                  :tab="8"
                ></input-radio>
              </div>
            </div>
          </div>
          <div class="form-item_input">
            <div class="form-group ms-big">
              <input-default
                :type="'text'"
                :label="'Số CMND'"
                :tab="9"
                :toolTip="'Số chứng minh nhân dân'"
                v-model="employee.identityCard"
              ></input-default>
            </div>
            <div class="form-group ms-small">
              <input-calendar
                :tabindex="10"
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
              :messageValid="employeeNotification.validatePhoneNumber"
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
              :messageValid="employeeNotification.validateLandlinePhone"
              v-model="employee.landlinePhone"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Email'"
              :tab="15"
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
              :tab="16"
              :isNumber="true"
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
import InputCheckbox from "../../components/InputComponents/BaseCheckbox.vue";
import InputCalendar from "../../components/InputComponents/BaseCalendar.vue";
import InputDefault from "../../components/InputComponents/BaseInput.vue";
import InputCombobox from "../../components/InputComponents/BaseCombobox.vue";
import InputRadio from "../../components/InputComponents/BaseRadio.vue";
import ModalNotification from "../../components/NotificationComponent/NotificationModal.vue";
import NotificationQuestion from "../../components/NotificationComponent/NotificationQuestion.vue";
import NotificationError from "../../components/NotificationComponent/NotificationError.vue";
import { useStore } from "vuex";
import eNum from "../../utils/eNum.js";
import notificationMessage from "../../utils/notification.js";
import validate from "../../utils/validate.js";
import utilEnum from "../../utils/index.js";
import {
  nextValue,
  createEmployeeApi,
  editEmployeeApi,
} from "../../api/employee.js";
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
    const {
      QUESTION_DATA_CHANGE,
      DUPLICATE_CODE,
      INVALID_INPUT,
      employeeNotification,
    } = notificationMessage;
    
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
    const stateAddEmployee = ref(true); 

    /**
     * Lấy ra employee sửa và nhân bản truyền qua từ props
     * NK Tiềm 28/10/2022
     */
    const { employeeEdit, employeeAdd } = toRefs(props);

    /**
     * Chứa các hiển thị và handle của hành động nhấn bỏ qua thông báo
     * NK Tiềm 28/10/2022
     */
    const cancelAction = ref({}); 

    /**
     * Chứa các hiển thị và handle của hành động nhấn chấp nhận thông báo
     * NK Tiềm 28/10/2022
     */
    const agreeAction = ref({});

    /**
     * Chứa các nội dung thông báo
     * NK Tiềm 28/10/2022
     */
    const messageAction = ref({});

    /**
     * Lưu trạng thái hiển thị validate
     * NK Tiềm 28/10/2022
     */
    const isValid = ref(false);

    /**
     * Trạng thái hiển thị thông báo hỏi
     * NK Tiềm 28/10/2022
     */
    const isShowNotificationQuestion = ref(false);

    /**
     * Trạng thái hiển thị thông báo lỗi
     * NK Tiềm 28/10/2022
     */
    const isShowNotificationError = ref(false);

    /**
     * Biến store vuex
     * NK Tiềm 28/10/2022
     */
    const store = useStore();

    /**
     * Lấy ra các enum gồm mã phím và mã lỗi có thể nhận được khi call api
     * NK Tiềm 28/10/2022
     */
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

    /**
     * Lấy ra hàm validate email và validate phone
     * NK Tiềm 28/10/2022
     */
    const { validateEmail, validatePhone } = validate;

    /**
     * lưu lại giá trị các phím bấm tắt không ngắt quãng
     * NK Tiềm 28/10/2022
     */
    const eventCtrlShiftS = [];

    /**
     * Biến employee v-model và gửi lên sever khi thêm sửa xoá
     * NK Tiềm 28/10/2022
     */
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

    /**
     * thông tin employee sửa nếu form sửa thì sẽ nhận được thông tin cần sửa
     * NK Tiềm 28/10/2022
     */
    const employeeEditReset = ref(null);

    /**
     * Thông tin nhân viên cần reset về rỗng khi ở lại from thêm tiếp không đóng from
     * NK Tiềm 28/10/2022
     */
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
    });

    /**
     * lưu danh sách đơn vị
     * NK Tiềm 28/10/2022
     */
    const optionUnit = computed(() => store.state.unit.unitList);

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
      await store.dispatch("unit/getUnitListAction");
      if (employeeEdit.value) {
        titleForm.value = EditFormEmployee;
        employee.value = {
          ...employeeEdit.value,
          dateOfBirth: formatDateYYYYMMDD(employeeEdit.value.dateOfBirth),
          dayForIdentity: formatDateYYYYMMDD(employeeEdit.value.dayForIdentity),
        }; 
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
            dayForIdentity: formatDateYYYYMMDD(
              employeeAdd.value.dayForIdentity
            ),
          };
        }

        /**
         * Lấy mã mới khi thêm 
         * NK Tiềm 28/10/2022
         */
        await nextValue()
          .then(function (response) {
            employee.value.employeeCode = response;
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      }
    });
    
    /**
     * Hàm xử lý lặp khi tab focus
     * NK Tiềm 28/10/2022
     */
    const handleLoopFocus = function () {
      inputFocus.value.tagInput.focus();
    };

    /**
     * Khi mounted component thì sẽ lắng nghe sự kiện các phím tắt
     * NK Tiềm 28/10/2022
     */
    onMounted(() => window.addEventListener("keydown", handleEvent));
    onMounted(() => focusLoop.value.addEventListener("focus", handleLoopFocus));
    onMounted(() => window.addEventListener("keyup", handleEventInterrupt));

    /**
     * Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
     * NK Tiềm 28/10/2022
     */
    onUnmounted(() => window.removeEventListener("keydown", handleEvent));
    onUnmounted(() => window.removeEventListener("focus", handleLoopFocus));
    onUnmounted(() =>
      window.removeEventListener("keyup", handleEventInterrupt)
    );

    /**
     * Hàm xử lý các event nút bấm tắt
     * NK Tiềm 28/10/2022
     */
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
            // Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
            eventCtrlShiftS.length = 0;
            handleSaveData(false);
          } else if (eventCtrlShiftS.length === 2) {
            // Nếu số lượng nút bấm mà === 2 trong đó k có nút shift thì sẽ là chức năng khác
            if (!eventCtrlShiftS.includes(SHIFT)) {
              //Không cho trình duyệt mở save as khi bấm ctrl + s
              event.preventDefault(); 
              eventCtrlShiftS.length = 0;
              handleSaveData(true);
            }
          }
        }
      }
    };

    /**
     * Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện
     * NK Tiềm 28/10/2022
     */
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

    /**
     * Hàm đóng mở thông báo nhập sai dữ liệu
     * NK Tiềm 28/10/2022
     */
    function handleToggleNotificationError() {
      isShowNotificationError.value = !isShowNotificationError.value;
    }

    /**
     * Hàm xử lý validate các trường
     * NK Tiềm 28/10/2022
     */
    function validateInput() {
      return [
        employee.value.employeeCode.trim() === ""
          ? employeeNotification.validateCode
          : null,
        employee.value.employeeName.trim() === ""
          ? employeeNotification.validateName
          : null,
        !employee.value.unitID ? employeeNotification.validateUnit : null,
        employee.value.dateOfBirth
          ? new Date(employee.value.dateOfBirth) > new Date()
            ? employeeNotification.validateDateOfBirth
            : null
          : null,
        employee.value.dayForIdentity
          ? new Date(employee.value.dayForIdentity) > new Date()
            ? employeeNotification.validateDayForIdentity
            : null
          : null,
        validatePhone(employee.value.phoneNumber) === false &&
        employee.value.phoneNumber != "" &&
        employee.value.phoneNumber
          ? employeeNotification.validatePhoneNumber
          : null,
        validatePhone(employee.value.landlinePhone) === false &&
        employee.value.landlinePhone != "" &&
        employee.value.landlinePhone
          ? employeeNotification.validateLandlinePhone
          : null,
        validateEmail(employee.value.employeeEmail) === false &&
        employee.value.employeeEmail != "" &&
        employee.value.employeeEmail
          ? employeeNotification.validateEmail
          : null,
      ].reduce((acc, cur) => {
        return (acc += cur ? "- " + cur + "<br>" : "");
      }, "");
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
    async function callApi(Api) {
      store.dispatch("config/setToggleShowLoaderAction");
      await Api({
        ...employee.value,
        dateOfBirth:
          employee.value.dateOfBirth === "" ? null : employee.value.dateOfBirth,
        dayForIdentity:
          employee.value.dayForIdentity === ""
            ? null
            : employee.value.dayForIdentity,
      })
        .then(function () {
          errorApi.value = false;
          store.dispatch("employee/getEmployeeListAction");
          if(!stateAddEmployee.value){
            //sau khi sửa xong sửa trạng thái modal thành thêm user
            stateAddEmployee.value = true; 
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
          errorApi.value = true;
          messageAction.value = {
            display:
              error.response.data.errorCode === DuplicateCode
                ? `${employeeNotification.nameDuplicateCode} < ${employee.value.employeeCode} > ${DUPLICATE_CODE}`
                : error.response.data.errorCode === InvalidInput
                ? INVALID_INPUT
                : error.response.data.userMsg,
          };
          agreeAction.value = {
            display: "Đóng",
            action: handleToggleNotificationError,
          };
          handleToggleNotificationError();
        });
      store.dispatch("config/setToggleShowLoaderAction");
    }

    /**
     * Hàm xử lý sự kiện khi bấm nút save
     * @param {Biến trạng thái có đóng modal hay là không} closeModal 
     * NK Tiềm 28/10/2022
     */
    const handleSaveData = async function (closeModal) {
      const messValid = validateInput();
      if (messValid != "") {
        agreeAction.value = {
          display: "Đóng",
          action: handleToggleNotificationError,
        };
        messageAction.value = {
          display: messValid,
        };
        isValid.value = true;
        handleToggleNotificationError();
      } else {
        if (stateAddEmployee.value) {
          // Trạng thái thêm thì sẽ truyền api thêm
          await callApi(createEmployeeApi);
        } else {
          // Trạng thái sửa thì sẽ truyền api sửa
          await callApi(editEmployeeApi);
        }
        if (closeModal === true && errorApi.value === false) {
          context.emit("handle-click-close-modal");
        } else if (errorApi.value === false) {
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
          // Khi thêm xong nếu không đóng form thì sẽ focus vào ô input
          inputFocus.value.tagInput.focus(); 
        }
      }
    };

    /**
     * Hàm xử lý đóng mở thông báo
     * NK Tiềm 28/10/2022
     */
    function handleToggleNotificationQuestion() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
    }

    /**
     * Hàm xử lý đóng thông báo và đóng modal
     * NK Tiềm 28/10/2022
     */
    function handleCloseNotificationAndCloseModal() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
      context.emit("handle-click-close-modal");
    }
    //(Khắc Tiềm - 15.09.2022)  Hàm xử lý đóng thông báo và modal và thêm dữ liệu

    /**
     * Hàm đóng modal và lưu dữ liệu
     * NK Tiềm 28/10/2022
     */
    function handleSaveDataAndCloseNotificationAndCloseModal() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
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
      } else if (stateAddEmployee.value) {
        if (
          JSON.stringify(employee.value) != JSON.stringify(employeeReset.value)
        ) {
          saveDataWhenCloseModal();
        } else {
          context.emit("handle-click-close-modal");
        }
      } else if (stateAddEmployee.value === false) {
        if (
          JSON.stringify(employee.value) !=
          JSON.stringify(employeeEditReset.value)
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
    }

    return {
      inputFocus,
      employee,
      employeeNotification,
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

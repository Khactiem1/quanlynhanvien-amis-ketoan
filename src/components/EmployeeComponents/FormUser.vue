<template>
  <div class="form">
    <div class="form-header">
      <div class="modal-title">
        <h2>Thông tin nhân viên</h2>
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
                :messageValid="'Mã không được để trống.'"
                :label="'Mã'"
                :tab="1"
                :class="{ 'is-valid': isValid && user.userId == '' }"
                v-model="user.userId"
                ref="inputFocus"
              ></input-default>
            </div>
            <div class="form-group ms-big">
              <input-default
                :required="true"
                :type="'text'"
                :messageValid="'Tên không được để trống.'"
                :label="'Tên'"
                :tab="2"
                :class="{ 'is-valid': isValid && user.name == '' }"
                v-model="user.name"
              ></input-default>
            </div>
          </div>
          <div class="form-group">
            <input-combobox
              :options="[
                { value: 'Đà Nẵng', header: 'Đà Nẵng' },
                { value: 'Hà Nội', header: 'Hà Nội' },
                { value: 'Hồ Chí Minh', header: 'Hồ Chí Minh' },
                { value: 'Ngoại Giao Đoàn', header: 'Ngoại Giao Đoàn' },
                { value: 'Duy Tân', header: 'Duy Tân' },
              ]"
              :value="'value'"
              :header="'header'"
              :label="'Đơn vị'"
              :required="true"
              :messageValid="'Dữ liệu <đơn vị> không có trong danh mục.'"
              :tab="3"
              :class="{ 'is-valid': isValid && !user.unit }"
              v-model="user.unit"
            ></input-combobox>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Chức danh'"
              :tab="4"
              v-model="user.title"
            ></input-default>
          </div>
        </div>
        <div class="form-item">
          <div class="form-item_input">
            <div class="form-group ms-small">
              <label>Ngày sinh</label>
              <input
                :tabindex="5"
                v-model="user.birth"
                class="input"
                type="date"
              />
            </div>
            <div style="padding-left: 16px" class="form-group ms-big">
              <label>Giới tính</label>
              <div class="input-radio_item">
                <input-radio
                  label="Nam"
                  :value="MALE"
                  v-model="user.sex"
                  :tab="6"
                ></input-radio>
                <input-radio
                  label="Nữ"
                  :value="FEMALE"
                  v-model="user.sex"
                  :tab="7"
                ></input-radio>
                <input-radio
                  label="Khác"
                  :value="OTHER"
                  v-model="user.sex"
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
                v-model="user.cmnd"
              ></input-default>
            </div>
            <div class="form-group ms-small">
              <label>Ngày cấp</label>
              <input
                :tabindex="10"
                v-model="user.dateRange"
                class="input"
                type="date"
              />
            </div>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Nơi cấp'"
              :tab="11"
              v-model="user.grantAddress"
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
            v-model="user.address"
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
              v-model="user.phoneNumber"
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
              v-model="user.landlinePhone"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Email'"
              :tab="15"
              :isEmail="true"
              :messageValid="'Nhập đúng địa chỉ Email.'"
              v-model="user.email"
            ></input-default>
          </div>
        </div>
        <div class="form-item flex-center">
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Tài khoản ngân hàng'"
              :tab="16"
              v-model="user.bankAccount"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Tên ngân hàng'"
              :tab="17"
              v-model="user.nameBank"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Chi nhánh'"
              :tab="18"
              v-model="user.branchBank"
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
import { onMounted, onUnmounted, ref, toRefs, onBeforeMount } from "vue";
import InputCheckbox from "../InputComponents/InputCheckbox.vue";
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
export default {
  components: {
    InputCheckbox,
    InputDefault,
    InputCombobox,
    InputRadio,
    ModalNotification,
    NotificationQuestion,
    NotificationError,
  },
  props: {
    userEdit: {
      type: Object,
    },
  },
  setup(props, context) {
    const { QUESTION_DATA_CHANGE, ERROR_EMPTY_DATA, ERROR_CORRECT_DATA } =
      notificationMessage;
    const inputFocus = ref(null);
    const focusLoop = ref(null);
    const stateAddUser = ref(true);
    const { userEdit } = toRefs(props);
    const cancelAction = ref({});
    const agreeAction = ref({});
    const messageAction = ref({});
    const isValid = ref(false);
    const isShowNotificationQuestion = ref(false);
    const isShowNotificationError = ref(false);
    const store = useStore();
    const { ESC, CTRL, SHIFT, S, MALE, FEMALE, OTHER } = eNum;
    const { validateEmail, validatePhone } = validate;
    const eventCtrlShiftS = [];
    const user = ref({
      name: "",
      sex: MALE,
      birth: "",
      cmnd: "",
      title: "",
      unit: "",
      bankAccount: "",
      nameBank: "",
      branchBank: "",
      dateRange: "",
      grantAddress: "",
      phoneNumber: "",
      landlinePhone: "",
      email: "",
      address: "",
      userId: "",
    });
    const userEditReset = ref(null);
    const userReset = ref({
      name: "",
      sex: MALE,
      birth: "",
      cmnd: "",
      title: "",
      unit: "",
      bankAccount: "",
      nameBank: "",
      branchBank: "",
      dateRange: "",
      grantAddress: "",
      phoneNumber: "",
      landlinePhone: "",
      email: "",
      address: "",
      userId: "",
    });
    onBeforeMount(() => {
      if (userEdit.value) {
        user.value = { ...userEdit.value }; // chuyển đổi props thành data
        stateAddUser.value = false;
        userEditReset.value = { ...userEdit.value };
      }
    });
    //Hàm xử lý các event nút bấm tắt
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
            //Khi bấm đủ 3 phím sẽ kích hoạt hành động nhấn
            eventCtrlShiftS.length = 0;
            handleSaveData(false);
          } else if (eventCtrlShiftS.length === 2) {
            //Nếu số lượng nút bấm mà === 2 trong đó k có nút shift thì sẽ là chức năng khác
            if (!eventCtrlShiftS.includes(SHIFT)) {
              event.preventDefault(); //Không cho trình duyệt mở save as khi bấm ctrl + s
              eventCtrlShiftS.length = 0;
              handleSaveData(true);
            }
          }
        }
      }
    };
    // Hàm xử lý khi các phím tắt bấm bị ngắt quãng thì hành động sẽ k đc thực hiện
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
    //Hàm đóng mở thông báo nhập sai dữ liệu
    function handleToggleNotificationError() {
      isShowNotificationError.value = !isShowNotificationError.value;
    }
    //Hàm xử lý sự kiện khi bấm nút save
    const handleSaveData = async function (closeModal) {
      if (
        user.value.userId.trim() == "" ||
        user.value.name.trim() == "" ||
        !user.value.unit
      ) {
        agreeAction.value = {
          display: "Đóng",
          action: handleToggleNotificationError,
        };
        messageAction.value = {
          display: ERROR_EMPTY_DATA,
        };
        isValid.value = true;
        handleToggleNotificationError();
      } else if (
        (validatePhone(user.value.phoneNumber) === false &&
          user.value.phoneNumber != "") ||
        (validatePhone(user.value.landlinePhone) === false &&
          user.value.landlinePhone != "") ||
        (validateEmail(user.value.email) === false && user.value.email != "")
      ) {
        agreeAction.value = {
          display: "Đóng",
          action: handleToggleNotificationError,
        };
        messageAction.value = {
          display: ERROR_CORRECT_DATA,
        };
        handleToggleNotificationError();
      } else {
        if (stateAddUser.value) {
          // Thêm
          // Gọi hàm loading quay quay ở đây
          store.dispatch("config/setToggleShowLoaderAction");
          await store.dispatch("user/addUserAction", user.value);
          store.dispatch("config/setToggleShowLoaderAction");
          // tắt hàm loading quay quay ở đây
        } else {
          // sửa
          store.dispatch("config/setToggleShowLoaderAction");
          await store.dispatch("user/editUserAction", user.value);
          store.dispatch("config/setToggleShowLoaderAction");
          stateAddUser.value = true; // sau khi sửa xong sửa trạng thái modal thành thêm user
        }
        if (closeModal === true) {
          context.emit("handle-click-close-modal");
        } else {
          isValid.value = false;
          user.value = { ...userReset.value };
          inputFocus.value.tagInput.focus(); //Khi thêm xong nếu không đóng form thì sẽ focus vào ô input
        }
      }
    };
    // hàm xử lý lặp focus
    const handleLoopFocus = function () {
      inputFocus.value.tagInput.focus();
    };
    //Khi mounted component thì sẽ lắng nghe sự kiện các phím tắ
    onMounted(() => window.addEventListener("keydown", handleEvent));
    onMounted(() => focusLoop.value.addEventListener("focus", handleLoopFocus));
    onMounted(() => window.addEventListener("keyup", handleEventInterrupt));
    // Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
    onUnmounted(() => window.removeEventListener("keydown", handleEvent));
    onUnmounted(() => window.removeEventListener("focus", handleLoopFocus));
    onUnmounted(() =>
      window.removeEventListener("keyup", handleEventInterrupt)
    );
    // Hàm xử lý đóng mở thông báo
    function handleToggleNotificationQuestion() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
    }
    // Hàm xử lý đóng thông báo và đóng modal
    function handleCloseNotificationAndCloseModal() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
      context.emit("handle-click-close-modal");
    }
    // Hàm xử lý đóng thông báo và modal và thêm dữ liệu
    function handleSaveDataAndCloseNotificationAndCloseModal() {
      isShowNotificationQuestion.value = !isShowNotificationQuestion.value;
      handleSaveData(true);
    }
    function handleCloseModal(closeNow) {
      //Kiếm tra dữ liệu khi đóng form khác thì hỏi có lưu hay không
      if (closeNow) {
        context.emit("handle-click-close-modal");
      } else if (stateAddUser.value) {
        if (JSON.stringify(user.value) != JSON.stringify(userReset.value)) {
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
      } else if (stateAddUser.value === false) {
        if (JSON.stringify(user.value) != JSON.stringify(userEditReset.value)) {
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
      user,
      MALE,
      FEMALE,
      OTHER,
      isValid,
      cancelAction,
      focusLoop,
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

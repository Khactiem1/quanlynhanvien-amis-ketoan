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
          @click="handleCloseModal"
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
              :tab="3"
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
                  value="Nam"
                  v-model="user.sex"
                  :tab="6"
                ></input-radio>
                <input-radio
                  label="Nữ"
                  value="Nữ"
                  v-model="user.sex"
                  :tab="7"
                ></input-radio>
                <input-radio
                  label="Khác"
                  value="Khác"
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
              :tab="13"
              v-model="user.phoneNumber"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'ĐT cố định'"
              :tab="14"
              v-model="user.landlinePhone"
            ></input-default>
          </div>
          <div class="form-group">
            <input-default
              :type="'text'"
              :label="'Email'"
              :tab="15"
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
          <button @click="handleCloseModal" :tabindex="21" class="btn">
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
          {{user.unit}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import InputCheckbox from "../InputComponents/InputCheckbox.vue";
import InputDefault from "../InputComponents/InputDefault.vue";
import InputCombobox from "../InputComponents/InputCombobox.vue";
import InputRadio from "../InputComponents/InputRadio.vue";
import { useStore } from "vuex";
import eNum from "../../utils/eNum.js";
export default {
  components: {
    InputCheckbox,
    InputDefault,
    InputCombobox,
    InputRadio,
  },
  setup(props, context) {
    const inputFocus = ref(null);
    const user = ref({
      name: "",
      sex: "Nữ",
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
    const store = useStore();
    const { ESC, CTRL, SHIFT, S } = eNum;
    const eventCtrlShiftS = [];
    //Hàm xử lý các event nút bấm tắt
    const handleEvent = function (event) {
      if (event.keyCode === ESC) {
        context.emit("handle-click-close-modal");
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
    //Hàm xử lý sự kiện khi bấm nút save
    const handleSaveData = async function (closeModal) {
      // Gọi hàm loading quay quay ở đây
      await store.dispatch("user/addUserAction", user.value);
      user.value = {
        name: "",
        sex: user.value.sex,
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
        id: "",
      };
      inputFocus.value.tagInput.focus(); //Khi thêm xong nếu không đóng form thì sẽ focus vào ô input
      if (closeModal === true) {
        context.emit("handle-click-close-modal");
      }
    };
    //Khi mounted component thì sẽ lắng nghe sự kiện các phím tắ
    onMounted(() => window.addEventListener("keydown", handleEvent));
    onMounted(() => window.addEventListener("keyup", handleEventInterrupt));
    // Khi unMounted thì sẽ xoá bỏ các sự kiện khỏi bộ nhớ
    onUnmounted(() => window.removeEventListener("keydown", handleEvent));
    onUnmounted(() =>
      window.removeEventListener("keyup", handleEventInterrupt)
    );
    function handleCloseModal() {
      context.emit("handle-click-close-modal");
    }

    return {
      inputFocus,
      user,
      handleCloseModal,
      handleSaveData,
    };
  },
  emits: ["handle-click-close-modal"],
};
</script>

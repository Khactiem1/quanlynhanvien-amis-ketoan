<template>
  <div class="calendar-container">
    <label v-if="label">{{ label }}</label>
    <div class="form-input">
      <input
        ref="elementInput"
        type="text"
        :tabindex="tabindex"
        placeholder="DD/MM/YYYY"
        class="input"
        v-model="displayData"
        @input="handleInput"
      />
      <div
        ref="elementIcon"
        @click="handleShowCalendar()"
        class="form-icon"
      ></div>
    </div>
    <div ref="elementCalendar" v-if="showCalendar" class="calendar">
      <div class="calendar-item calendar-date">
        <div class="info">
          <div
            @click="handlePrevMonth()"
            class="calendar-prev btn-handle"
          ></div>
          <span
            @click="showSelectYear = true"
            style="font-family: 'notosans-bold'"
            >{{
              new Date(currentYear, currentMonth).toLocaleString("vi", {
                month: "long",
              })
            }}
            Năm {{ currentYear }}</span
          >
          <div
            @click="handleNextMonth()"
            class="calendar-next btn-handle"
          ></div>
        </div>
        <div class="date">
          <div class="day-name">T2</div>
          <div class="day-name">T3</div>
          <div class="day-name">T4</div>
          <div class="day-name">T5</div>
          <div class="day-name">T6</div>
          <div class="day-name">T7</div>
          <div class="day-name">CN</div>
        </div>
        <div class="date date-container">
          <div v-for="(item, index) in startDay" class="day" :key="index"></div>
          <div
            v-for="(item, index) in daysInMonth"
            @click="handleSelectDate(item)"
            class="day day-value"
            :key="index"
            :class="{
              active:
                currentDate === item &&
                new Date(modelValue).getMonth() === currentMonth &&
                new Date(modelValue).getFullYear() === currentYear,
              'date-now':
                dateNow.getDate() === item &&
                dateNow.getMonth() === currentMonth &&
                dateNow.getFullYear() === currentYear,
            }"
          >
            {{ item }}
          </div>
        </div>
        <div class="info today">
          <span @click="handleSelectDate(true)">Hôm nay</span>
        </div>
        <div
          v-show="showSelectMonth"
          ref="elementSelectMonth"
          class="calendar-item calendar-month"
        >
          <div class="calendar-select_header">
            <div @click="currentYear--" class="calendar-prev btn-handle"></div>
            <span
              style="cursor: pointer"
              @click="
                showSelectMonth = false;
                showSelectYear = true;
              "
              >{{ currentYear }}</span
            >
            <div @click="currentYear++" class="calendar-next btn-handle"></div>
          </div>
          <div class="calendar-select_content month">
            <div
              v-for="(item, index) in 12"
              :key="index"
              class="calendar-select_item"
            >
              <span @click="handleSelectMonth(item)">Thg {{ item }}</span>
            </div>
          </div>
          <div class="calendar-cancel">
            <span @click="handleShowCalendar()">Huỷ bỏ</span>
          </div>
        </div>
        <div
          v-show="showSelectYear"
          ref="elementSelectYear"
          class="calendar-item calendar-year"
        >
          <div class="calendar-select_header">
            <div
              @click="currentYear = currentYear - 12"
              class="calendar-prev btn-handle"
            ></div>
            <span>{{ currentYear }} - {{ currentYear - 11 }}</span>
            <div
              @click="currentYear = currentYear + 12"
              class="calendar-next btn-handle"
            ></div>
          </div>
          <div class="calendar-select_content year">
            <div
              v-for="(item, index) in 12"
              :key="index"
              class="calendar-select_item"
              :class="{ active: currentYear === currentYear - item + 1 }"
            >
              <span @click="handleSelectYear(currentYear - item + 1)">{{
                currentYear - item + 1
              }}</span>
            </div>
          </div>
          <div class="calendar-cancel">
            <span @click="handleShowCalendar()">Huỷ bỏ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed, watch } from "vue";
import utilEnum from "../../utils/index";
export default {
  props: {
    modelValue: { default: null },
    tabindex: {},
    label: {},
  },

  setup(props, context) {
    const { formatDateDDMMYYYY, formatDateYYYYMMDD } = utilEnum;
    const elementCalendar = ref(null);
    const elementIcon = ref(null);
    const elementSelectMonth = ref(null);
    const elementSelectYear = ref(null);
    const elementInput = ref(null);
    const showCalendar = ref(false);
    const showSelectYear = ref(false);
    const showSelectMonth = ref(false);
    const dateNow = ref(new Date());
    const dateInput = ref(formatDateDDMMYYYY(dateNow.value));
    const { modelValue } = toRefs(props);
    const displayData = ref("");
    const dataInput = ref("__/__/____");
    const currentDate = computed(() =>
      modelValue.value ? new Date(modelValue.value).getDate() : null
    );
    const currentMonth = ref(
      modelValue.value
        ? new Date(modelValue.value).getMonth()
        : new Date().getMonth()
    );
    const currentYear = ref(
      modelValue.value
        ? new Date(modelValue.value).getFullYear()
        : new Date().getFullYear()
    );
    watch(modelValue, (newValue) => {
      currentMonth.value = newValue
        ? new Date(newValue).getMonth()
        : new Date().getMonth();
      currentYear.value = newValue
        ? new Date(newValue).getFullYear()
        : new Date().getFullYear();
      displayData.value = modelValue.value
        ? formatDateDDMMYYYY(new Date(modelValue.value))
        : "";
    });
    const daysInMonth = computed(() =>
      new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
    );
    const startDay = computed(() =>
      new Date(currentYear.value, currentMonth.value, 0).getDay()
    );
    function handlePrevMonth() {
      if (currentMonth.value == 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
    }
    function handleNextMonth() {
      if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
      } else {
        currentMonth.value++;
      }
    }
    function handleSelectYear(year) {
      currentYear.value = year;
      showSelectYear.value = false;
      showSelectMonth.value = true;
    }
    function handleSelectMonth(month) {
      currentMonth.value = month - 1;
      showSelectMonth.value = false;
    }
    function handleSelectDate(dateSelect) {
      let d;
      if (dateSelect === true) {
        d = new Date();
      } else {
        d = new Date(currentYear.value, currentMonth.value, dateSelect);
      }
      context.emit("update:modelValue", formatDateYYYYMMDD(d));
      handleShowCalendar();
    }
    const handleClickTemplate = () => {
      const isClickElementCalendar = elementCalendar.value.contains(
        event.target
      );
      const isClickElementIcon = elementIcon.value.contains(event.target);
      const isClickElementSelectMonth = elementSelectMonth.value.contains(
        event.target
      );
      const isClickElementSelectYear = elementSelectYear.value.contains(
        event.target
      );
      if (
        !isClickElementCalendar &&
        !isClickElementIcon &&
        !isClickElementSelectMonth &&
        !isClickElementSelectYear
      ) {
        handleShowCalendar();
      }
    };
    function handleShowCalendar() {
      if (showCalendar.value) {
        showSelectYear.value = false;
        showSelectMonth.value = false;
        window.removeEventListener("click", handleClickTemplate);
      } else {
        window.addEventListener("click", handleClickTemplate);
      }
      showCalendar.value = !showCalendar.value;
    }
    function handleInput(event) {
      console.log(event.target.value);
      console.log(dateInput.value);
      displayData.value = dataInput.value;
      console.log(elementInput.value.selectionStart);
      setTimeout(() => {
        elementInput.value.selectionStart = elementInput.value.selectionEnd = 0;
      }, 0);
    }
    return {
      currentMonth,
      currentYear,
      daysInMonth,
      displayData,
      startDay,
      dateNow,
      currentDate,
      showSelectMonth,
      showSelectYear,
      elementCalendar,
      elementIcon,
      elementSelectMonth,
      elementSelectYear,
      elementInput,
      showCalendar,
      handleNextMonth,
      handlePrevMonth,
      handleSelectYear,
      handleSelectMonth,
      handleSelectDate,
      handleShowCalendar,
      handleInput,
    };
  },
};
</script>

<style scoped>
.calendar-container {
  position: relative;
}
.form-input {
  position: relative;
}
.form-icon {
  position: absolute;
  background: var(--url__icon);
  background-position: -120px -306px;
  width: 32px;
  padding: 4px 10px;
  height: 30px;
  right: 1px;
  top: 1px;
  background-color: #fff;
}
.form-icon:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}
*,
*::after,
*::before {
  white-space: nowrap;
}
.calendar {
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  z-index: 4;
  right: 0;
}
.calendar-select_content {
  display: flex;
  position: relative;
  padding: 16px 12px 12px 12px;
  flex-wrap: wrap;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
}
.calendar-select_content::before {
  position: absolute;
  top: -8px;
  content: "";
  width: 0px;
  left: 50%;
  transform: translateX(-50%);
  height: 0px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #31af21;
}
.calendar-date {
  width: 100%;
  position: relative;
}
.calendar-month,
.calendar-year {
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  width: calc(100% - 24px);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.calendar-select_item {
  width: calc(100% / 4);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "notosans-bold";
}
.calendar-select_item span {
  padding: 8px 4px;
  display: inline-block;
  width: 48px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.calendar-select_item.active span {
  background-color: #fff;
  border-radius: 20px;
  color: #31af21;
}
.calendar-select_item span:hover {
  background-color: #fff;
  border-radius: 3px;
  color: #31af21;
}
.calendar-select_content.month {
  background-color: #31af21;
  color: #fff;
}
.calendar-select_content.year {
  background-color: #31af21;
  color: #fff;
}
.calendar-cancel {
  background-color: #31af21;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  margin-bottom: 12px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: #fff;
  font-family: "notosans-bold";
}
.calendar-cancel span {
  margin-top: -35px;
  padding: 8px 10px;
  display: inline-block;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.calendar-cancel span:hover {
  background-color: #309124;
}
.calendar-select_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  font-family: "notosans-bold";
}
.btn-handle {
  cursor: pointer;
}

.calendar-item.calendar-date {
  border: 1px solid #ccc;
  padding: 0 12px;
  z-index: 1;
}
.calendar-item.calendar-month {
  z-index: 2;
  background-color: #fff;
}
.calendar-item.calendar-year {
  z-index: 3;
  background-color: #fff;
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px 8px 20px;
  align-items: center;
}

.info span {
  cursor: pointer;
}
.info.today {
  justify-content: center;
  padding-bottom: 12px;
  color: var(--primary__color);
}

.date {
  display: flex;
  border-bottom: solid 1px #ccc;
  flex-wrap: wrap;
  padding: 4px 0 8px 0;
}

.day,
.day-name {
  width: calc(100% / 7 - 2px);
  margin: 1px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #fff;
  color: #757575;
}
.day {
  height: 36px;
}
.day-name {
  margin-top: 14px;
  height: 24px;
  font-family: "notosans-bold";
}
.day.day-value:hover {
  border-color: #309124;
}
.day.day-value {
  cursor: pointer;
}

.calendar-next::before {
  content: "\2192";
}
.calendar-prev::before {
  content: "\2190";
}

.day.active {
  background-color: #d5ecd2;
  color: var(--primary__color);
}
.day.date-now {
  color: var(--primary__color);
  font-family: "notosans-semibold";
}
</style>

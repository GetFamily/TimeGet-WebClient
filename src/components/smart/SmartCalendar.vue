<template>
  <div class="smart-calendar">
    <div class="right">
      <div class="row international">
        <section class="jalaali">
          {{ selectedMonthInString }} {{ selectedYear }}
        </section>
        <section class="seperator"></section>
        <section class="hijri">
          {{ selectedMonthInStringStartHijri }}-{{
            selectedMonthInStringEndHijri
          }}
          {{ selectedYearHijri }}
        </section>
        <section class="seperator"></section>
        <section class="milaadi">
          {{ selectedMonthInStringStartMilaadi }}-{{
            selectedMonthInStringEndMilaadi
          }}
          {{ selectedYearMilaadi }}
        </section>
      </div>
      <div class="row">
        <section class="cell">شنبه</section>
        <section class="cell">یک‌شنبه</section>
        <section class="cell">دوشنبه</section>
        <section class="cell">سه‌شنبه</section>
        <section class="cell">چهارشنبه</section>
        <section class="cell">پنج‌شنبه</section>
        <section class="cell">جمعه</section>
      </div>
      <div class="row" v-for="(week, weekIndex) of weeks" :key="weekIndex">
        <BaseCalendarCell
          class="cell"
          :class="{
            selected: day.date.toDateString() === selectedDate.toDateString(),
            today: day.date.toDateString() === today.toDateString(),
            pre: day.pre,
            post: day.post,
            holiday: dayIndex === 6 || day.holiday,
          }"
          v-for="(day, dayIndex) of week"
          :key="dayIndex"
          :value="day.date"
          @click="selectDate(day)"
        >
        </BaseCalendarCell>
      </div>
    </div>
    <div class="left">
      <button class="action today" @click="goTo('today')">برو به امروز</button>
      <button class="action holiday" @click="goTo('next-holiday')">
        برو به تعطیلی بعدی
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import jalaali from "jalaali-js";
import BaseCalendarCell from "@/components/base/BaseCalendarCell";
import toastr from "toastr";
export default {
  name: "SmartCalendar",
  components: {
    BaseCalendarCell,
  },
  setup() {
    const store = useStore();
    const today = computed(() => store.state.currentModule.today);
    const selectedYear = computed({
      get() {
        return store.state.pickerModule.selectedYear;
      },
      set(value) {
        store.commit("pickerModule/selectYear", value);
      },
    });
    const selectedMonth = computed({
      get() {
        return store.state.pickerModule.selectedMonth;
      },
      set(value) {
        store.commit("pickerModule/selectMonth", value);
      },
    });
    const selectedDay = computed({
      get() {
        return store.state.pickerModule.selectedDay;
      },
      set(value) {
        store.commit("pickerModule/selectDay", value);
      },
    });
    const selectedDate = computed(() => store.state.pickerModule.selectedDate);
    const monthLength = computed(() =>
      jalaali.jalaaliMonthLength(selectedYear.value, selectedMonth.value)
    );
    const weeks = computed(() => {
      const calculatedWeeks = [[]];
      const firstDayInGregorian = jalaali.toGregorian(
        selectedYear.value,
        selectedMonth.value,
        1
      );
      const firstDayInDate = new Date(
        firstDayInGregorian.gy,
        firstDayInGregorian.gm - 1,
        firstDayInGregorian.gd
      );
      const firstDayWeekday = firstDayInDate.getJalaaliWeekDayInNumeric();
      for (let preDay = 0; preDay < firstDayWeekday; preDay++) {
        const currentDate = firstDayInDate.addDays(-(firstDayWeekday - preDay));
        calculatedWeeks[0][preDay] = {
          date: currentDate,
          holiday: holidaysOfSelectedMonth.value?.includes(
            currentDate.toLocaleDateString("fa-IR", { day: "numeric" })
          ),
          pre: true,
        };
      }
      let currentWeek = 0;
      for (let day = 0; day < monthLength.value; day++) {
        const currentDate = firstDayInDate.addDays(day);
        const currentDayWeekDay = currentDate.getJalaaliWeekDayInNumeric();
        calculatedWeeks[currentWeek][currentDayWeekDay] = {
          date: currentDate,
          holiday: holidaysOfSelectedMonth.value?.includes(
            `${currentDate.toLocaleDateString("fa-IR", {
              month: "numeric",
            })}_${currentDate.toLocaleDateString("fa-IR", { day: "numeric" })}`
          ),
        };
        if (currentDayWeekDay === 6 && day < monthLength.value - 1) {
          currentWeek++;
          calculatedWeeks[currentWeek] = [];
        }
      }
      const lastDayInDate =
        calculatedWeeks[currentWeek][calculatedWeeks[currentWeek].length - 1]
          .date;
      const lastDayWeekday = lastDayInDate.getJalaaliWeekDayInNumeric();
      for (let postDay = lastDayWeekday + 1; postDay < 7; postDay++) {
        const currentDate = lastDayInDate.addDays(postDay - lastDayWeekday);
        calculatedWeeks[currentWeek][postDay] = {
          date: currentDate,
          holiday: holidaysOfSelectedMonth.value?.includes(
            currentDate.toLocaleDateString("fa-IR", { day: "numeric" })
          ),
          post: true,
        };
      }
      return calculatedWeeks;
    });
    const holidaysOfSelectedMonth = computed(
      () => store.state.occasionsModule.holidaysOfMonth[selectedMonth.value]
    );
    const selectDate = (day) => {
      const { jy, jm, jd } = jalaali.toJalaali(day.date);
      selectedYear.value = jy;
      selectedMonth.value = jm;
      selectedDay.value = jd;
    };
    const goTo = (what) => {
      switch (what) {
        case "today":
          selectDate({ date: today.value });
          break;
        case "next-holiday":
          {
            const nextHoliday = holidaysOfSelectedMonth.value
              .map((holiday) => holiday.split("_")[1].toEnglish())
              .filter((holiday) => holiday > selectedDay.value)?.[0];
            if (nextHoliday) {
              selectedDay.value = +nextHoliday;
            } else {
              toastr.warning("در این ماه تعطیلی بعدی وجود ندارد.");
            }
          }
          break;
        default:
          break;
      }
    };
    const selectedMonthInString = computed(
      () => store.getters["pickerModule/selectedMonthInString"]
    );
    const selectedMonthInStringStartHijri = computed(
      () => store.getters["pickerModule/selectedMonthInStringStartHijri"]
    );
    const selectedMonthInStringEndHijri = computed(
      () => store.getters["pickerModule/selectedMonthInStringEndHijri"]
    );
    const selectedYearHijri = computed(
      () => store.getters["pickerModule/selectedYearHijri"]
    );
    const selectedMonthInStringStartMilaadi = computed(
      () => store.getters["pickerModule/selectedMonthInStringStartMilaadi"]
    );
    const selectedMonthInStringEndMilaadi = computed(
      () => store.getters["pickerModule/selectedMonthInStringEndMilaadi"]
    );
    const selectedYearMilaadi = computed(
      () => store.getters["pickerModule/selectedYearMilaadi"]
    );
    return {
      today,
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedDate,
      monthLength,
      weeks,
      holidaysOfSelectedMonth,
      selectDate,
      goTo,
      selectedMonthInString,
      selectedMonthInStringStartHijri,
      selectedMonthInStringEndHijri,
      selectedYearHijri,
      selectedMonthInStringStartMilaadi,
      selectedMonthInStringEndMilaadi,
      selectedYearMilaadi,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";
.smart-calendar {
  display: flex;
  justify-content: space-between;
  .right {
    padding: 10px 10px 20px;
    .row {
      display: flex;
      align-items: center;
      .cell {
        height: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70px;
        padding: 14px 15px 7px 15px;

        &.pre,
        &.post {
          opacity: 0.4;
        }
        ::v-deep {
          .jalaali {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            font-weight: bold;
          }

          .others {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .hijri {
              font-family: sans-serif;
              font-size: 10px;
            }
            .milaadi {
              font-family: sans-serif;
              font-size: 9px;
            }
          }

          @media (max-width: 530px) {
            padding: 9px 7px 3px 7px;
          }

          @media (max-width: 420px) {
            padding: 8px 7px 2px 7px;
          }
        }
      }
      &:nth-child(2) {
        .cell {
          padding: 0;
          padding-top: 10px;
        }
      }
      &:not(:first-child, :nth-child(2)) {
        .cell {
          cursor: pointer;
          height: 70px;
          border-radius: $radius_normal;
          color: $color_gray_20;
          &.selected {
            border: solid thin $color_gray_50;
            background-color: $color_gray_75;
          }
          &:hover {
            background-color: $color_gray_70;
          }
          &.today {
            background-color: $color_primary_light_20;
          }
          &.holiday {
            color: $color_red;
          }
          @media (max-width: 530px) {
            height: 50px;
          }
        }
      }
      &:first-child,
      &:nth-child(2) {
        font-size: 12px;
        .cell {
          color: $color_gray_30;
        }
      }

      &.international {
        margin-bottom: 18px;
        padding-right: 22px;
        width: 100%;
        color: $color_gray_40;
        .seperator {
          width: 10px;
          height: 10px;
          background-color: $color_primary_light_20;
          border-radius: 50%;
          margin: 0 20px;
        }
        .milaadi {
          font-family: sans-serif;
          font-size: 11px;
        }

        @media (max-width: 423px) {
          padding-right: 0;
          justify-content: center;
          > * {
            font-size: 10px;
          }
          .milaadi {
            font-size: 9px;
          }
        }

        @media (max-width: 375px) {
          > * {
            font-size: 8px;
          }
          .milaadi {
            font-size: 7px;
          }
        }
      }
    }
  }
  .left {
    padding: 20px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    .action {
      display: flex;
      align-items: center;
      border: solid thin $color_gray_60;
      background: none;
      padding: 10px 12px;
      border-radius: $radius_normal;
      color: $color_gray_30;
      margin-top: 10px;
      opacity: 0.7;

      &::after {
        content: "";
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
        flex-shrink: 0;
      }

      &:hover {
        opacity: 1;
      }

      &.today {
        &::after {
          background-color: $color_primary;
        }
      }

      &.holiday {
        &::after {
          background-color: $color_red;
        }
      }
    }
  }
  @media (max-width: 1203px) {
    flex-direction: column;
    .left {
      flex-direction: row-reverse;
      padding-top: 0;
      .action {
        margin-right: 10px;
        margin-top: 0;
      }
    }
  }
}
</style>
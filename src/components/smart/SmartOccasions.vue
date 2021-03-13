<template>
  <div class="smart-occasions">
    <div
      class="item"
      :class="[
        `date-${occasion.year}-${occasion.month}-${occasion.day}`,
        {
          selected:
            occasion.year == selectedYear &&
            occasion.month == selectedMonth &&
            occasion.day == selectedDay,
          today:
            new Date(
              occasion.gYear,
              occasion.gMonth - 1,
              occasion.gDay
            ).toDateString() === today.toDateString(),
          holiday: occasion.holiday === 'true',
        },
      ]"
      @click="selectDate(occasion)"
      v-for="occasion of occasionsOfSelectedMonth"
      :key="occasion.id"
    >
      <section class="day">
        {{ occasion.day }}
      </section>
      <section class="description">
        {{ occasion.description }}
      </section>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
export default {
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
    const occasionsOfSelectedMonth = computed(
      () => store.state.occasionsModule.occasionsOfMonth[selectedMonth.value]
    );
    const selectDate = (occasion) => {
      selectedYear.value = Number(occasion.year);
      selectedMonth.value = Number(occasion.month);
      selectedDay.value = Number(occasion.day);
    };

    onMounted(() => {
      watch(
        [selectedYear, selectedMonth],
        () => {
          store.dispatch("occasionsModule/getOccasionsOfMonth", {
            year: selectedYear.value,
            month: selectedMonth.value,
          });
        },
        { immediate: true }
      );
      watch(
        [selectedYear, selectedMonth, selectedDay],
        () => {
          setTimeout(async () => {
            let elementToFocus = document.querySelector(
              `.date-${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`
            );
            for (let i = 0; !elementToFocus && i < 5; i++) {
              // wait for the element to appear
              await new Promise((resolve) => setTimeout(resolve, 500));
              elementToFocus = document.querySelector(
                `.date-${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`
              );
            }
            if (elementToFocus) {
              elementToFocus.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "start",
              });
            }
          }, 0);
        },
        { immediate: true }
      );
    });

    return {
      today,
      selectedYear,
      selectedMonth,
      selectedDay,
      occasionsOfSelectedMonth,
      selectDate,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";
.smart-occasions {
  padding: 20px 30px 20px 0;
  overflow: auto;
  .item {
    padding: 5px;
    display: flex;
    opacity: 0.5;
    cursor: pointer;

    &.selected {
      background-color: $color_gray_75;
      opacity: 0.7;
    }

    &:hover {
      opacity: 1;
    }

    .day {
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: $color_gray_50;
      border-radius: 50%;
      color: $color_gray_30;
      font-weight: bold;
    }

    .description {
      flex: 1 1 0px;
      margin-right: 30px;
      color: $color_gray_30;
    }

    &.today {
      .day {
        color: $color_primary_dark_20;
        background-color: $color_primary_light_10;
      }
    }

    &.holiday {
      > * {
        color: $color_red;
      }
      // margin-right: -5px;
    }

    // &:not(:first-child) {
    //   margin-top: 10px;
    // }
  }

  @media (max-height: 900px) {
    overflow: initial;
  }
}
</style>
<template>
  <div class="smart-month-chooser">
    <button class="arrow right" @click="selectedMonth = selectedMonth - 1">
      <img
        src="@/assets/images/previous-next-icon.png"
        alt="ماه قبل"
        title="ماه قبل"
      />
    </button>
    <section class="value">{{ selectedMonthInString }}</section>
    <button class="arrow left" @click="selectedMonth = selectedMonth + 1">
      <img
        src="@/assets/images/previous-next-icon.png"
        alt="ماه بعد"
        title="ماه بعد"
      />
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SmartMonthChooser",
  setup() {
    const store = useStore();
    const selectedMonth = computed({
      get() {
        return store.state.pickerModule.selectedMonth;
      },
      set(value) {
        store.commit("pickerModule/selectMonth", value);
      },
    });
    const selectedMonthInString = computed(
      () => store.getters["pickerModule/selectedMonthInString"]
    );
    return {
      selectedMonth,
      selectedMonthInString,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";

.smart-month-chooser {
  display: flex;

  .value {
    margin: 0 10px;
    color: $color_gray_30;
    width: 64px;
    text-align: center;
  }

  .arrow {
    border: none;
    border-radius: 5px;
    background-color: $color_gray_75;
    color: $color_gray_50;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 0 6px;
    width: 21px;
    height: 25px;
    overflow: hidden;

    &:hover {
      img {
        opacity: 0.2;
      }
    }

    img {
      max-width: initial;
      max-height: initial;
      width: 24px;
      opacity: 0.1;
    }

    &.left {
      background-position-x: 6px;
      justify-content: flex-end;
    }

    &.right {
      background-position-x: -9px;
      justify-content: flex-start;
    }
  }
}
</style>
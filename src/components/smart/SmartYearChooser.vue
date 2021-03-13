<template>
  <div class="smart-year-chooser">
    <!-- <button class="arrow right">
      <img src="@/assets/images/previous-next-icon.png" alt="ماه قبل" title="ماه قبل" />
    </button> -->
    <section class="value">{{selectedYear}}</section>
    <!-- <button class="arrow left">
      <img src="@/assets/images/previous-next-icon.png" alt="ماه بعد" title="ماه بعد" />
    </button> -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
export default {
  name: "SmartMonthChooser",
  setup() {
    const store = useStore();
    const selectedYear = computed({
      get() {
        return store.state.pickerModule.selectedYear;
      },
      set(value) {
        store.commit("pickerModule/selectYear", value);
      },
    });
    return {
      selectedYear,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";

.smart-year-chooser {
  display: flex;

  .value {
    margin: 0 10px;
    color: $color_gray_30;
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
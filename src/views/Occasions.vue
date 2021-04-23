<template>
  <div class="occasions" ref="scrollElement">
    <BaseScrollTop class="my-scroll-top" :element="scrollElement">
      <button class="action today" @click="smartCalendarComponentElement.goTo('today')">امروز</button>
      <button class="action holiday" @click="smartCalendarComponentElement.goTo('next-holiday')">
        تعطیلی بعدی
      </button>
    </BaseScrollTop>
    <SmartCalendarConfig></SmartCalendarConfig>
    <SmartCalendar ref="smartCalendarComponentElement"></SmartCalendar>
    <SmartOccasions></SmartOccasions>
  </div>
</template>

<script>
import SmartCalendarConfig from "@/components/smart/SmartCalendarConfig.vue";
import SmartCalendar from "@/components/smart/SmartCalendar.vue";
import SmartOccasions from "@/components/smart/SmartOccasions.vue";
import BaseScrollTop from "@/components/base/BaseScrollTop.vue";
import { ref } from "vue";
export default {
  name: "Occasions",
  components: {
    SmartCalendarConfig,
    SmartCalendar,
    SmartOccasions,
    BaseScrollTop,
  },
  setup() {
    const scrollElement = ref(null);
    const smartCalendarComponentElement = ref(null);
    return {
      scrollElement,
      smartCalendarComponentElement,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";
.occasions {
  > *:not(:last-child) {
    border-bottom: solid thin $color_gray_70;
  }

  .my-scroll-top {
    .action {
      display: flex;
      align-items: center;
      border: solid thin $color_gray_60;
      padding: 10px 12px;
      border-radius: $radius_normal;
      color: $color_gray_30;
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
}
</style>
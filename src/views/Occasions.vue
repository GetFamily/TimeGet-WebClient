<template>
  <div class="occasions" ref="scrollElement">
    <BaseScrollTop class="my-scroll-top" :element="scrollElement"></BaseScrollTop>
    <SmartCalendarConfig></SmartCalendarConfig>
    <SmartCalendar></SmartCalendar>
    <SmartOccasions></SmartOccasions>
  </div>
</template>

<script>
import SmartCalendarConfig from "@/components/smart/SmartCalendarConfig.vue";
import SmartCalendar from "@/components/smart/SmartCalendar.vue";
import SmartOccasions from "@/components/smart/SmartOccasions.vue";
import BaseScrollTop from "@/components/base/BaseScrollTop.vue";
import { ref } from 'vue';
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
    return {
      scrollElement,
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
}
</style>
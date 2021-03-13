<template>
  <div class="smart-today-occasion">
    <div class="loading" v-if="!occasionsOfToday">
      درحال دریافت <strong>مناسبت‌های امروز</strong> ...
    </div>
    <div
      class="no-item"
      v-else-if="occasionsOfToday && !occasionsOfToday.length"
    >
      <strong>هیچ مناسبتی</strong> برای <strong>امروز</strong> وجود ندارد.
    </div>
    <div class="items" v-else>
      <section class="title">مناسبت‌های امروز</section>
      <section
        class="item"
        v-for="occasion of occasionsOfToday"
        :key="occasion.id"
      >
        {{ occasion.description }}
      </section>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, toRef, watch } from "vue";
import { useStore } from "vuex";
export default {
  props: ["today"],
  setup(props) {
    const store = useStore();
    const today = toRef(props, "today");
    const occasionsOfToday = computed(
      () => store.state.occasionsModule.occasionsOfToday
    );
    onMounted(() => {
      watch(
        today,
        () => {
          store.dispatch("occasionsModule/getOccasionsOfToday");
        },
        { immediate: true }
      );
    });
    return {
      occasionsOfToday,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";
.smart-today-occasion {
  padding: 7px 12px;
  font-size: 13px;
  color: $color_gray_20;
  .loading {
    color: $color_primary_light_20;
  }
  .no-item {
    opacity: 0.7;
  }
  .items {
    .title {
        color: $color_gray_50;
        margin-bottom: 7px;
    }
    .item{
        display: flex;
        &::before{
            content: '';
            display: block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: $color_gray_20;
            margin-left: 5px;
            margin-top: 7px;
        }
    }
  }
}
</style>
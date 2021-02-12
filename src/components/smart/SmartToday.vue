<template>
  <div class="smart-today">
    <SmartClock :now="now"></SmartClock>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import SmartClock from "@/components/smart/SmartClock.vue";
export default {
  components: {
    SmartClock,
  },
  setup() {
    const store = useStore();
    store.commit("runNowInterval");
    const now = computed(() => store.state.now);
    return {
      now,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.smart-today {
  background-color: $color_bg_white;
  margin-left: 10px;
  height: calc(100% - 20px);
  box-shadow: 0 0 5px -2px $color_gray;
  border-radius: 3px;
  margin-right: -3px;
  padding-right: 3px;

  h1 {
    padding: 50px;
  }
}
</style>
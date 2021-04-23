<template>
  <div class="smart-today" :class="{ open }" @click="toggle">
    <SmartClock :now="now"></SmartClock>
    <SmartTodayOccasions :today="today"></SmartTodayOccasions>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import SmartClock from "@/components/smart/SmartClock.vue";
import SmartTodayOccasions from "@/components/smart/SmartTodayOccasions.vue";
export default {
  components: {
    SmartClock,
    SmartTodayOccasions,
  },
  setup() {
    const store = useStore();
    store.commit("currentModule/runNowInterval");
    const now = computed(() => store.state.currentModule.now);
    const today = computed(() => store.state.currentModule.today);
    const open = ref(false);
    const toggle = (event) => {
      if (event.offsetX > event.target.offsetWidth) {
        // clicked on psuedoelement
        open.value = !open.value;
      }
    };
    return {
      now,
      today,
      open,
      toggle,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.smart-today {
  background-color: $color_bg_white;
  margin-left: 10px;
  width: 327px;
  height: calc(100% - 20px);
  box-shadow: $shaddow_normal;
  border-radius: $radius_normal;
  margin-right: -$radius_normal;
  padding-right: $radius_normal;
  overflow-y: auto;
  overflow-x: hidden;

  > :not(:first-child){
    border-top: solid thin $color_gray_70;
  }

  h1 {
    padding: 50px;
  }

  @media (max-width: 992px) {
    z-index: 1;
    position: absolute;
    top: 50px;
    left: -340px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transition: left 0.3s ease;

    &::after {
      content: "";
      display: block;
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      right: -100vw;
      z-index: -1;
      background-color: $color_gray_50;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &.open {
      left: -10px;

      &::after {
        opacity: 0.5;
        pointer-events: initial;
      }
    }

    &::before {
      content: "اکنون";
      cursor: pointer;
      color: $color_gray_50;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 35px;
      transform: rotate(90deg);
      position: absolute;
      right: -57px;
      top: 55px;
      background-color: white;
      box-shadow: 0 -5px 10px -7px #2e333f;
      border-top-left-radius: $radius_normal;
      border-top-right-radius: $radius_normal;
    }
  }
}
</style>
<template>
  <div class="timer-watch">
    <div class="number hours" :class="{ faded: hours === '00' }">
      {{ hours }}
    </div>
    <div class="seperator" :class="{ faded: hours === '00' }">:</div>
    <div class="number minutes" :class="{ faded: minutes === '00' }">
      {{ minutes }}
    </div>
    <div class="seperator" :class="{ faded: minutes === '00' }">:</div>
    <div class="number seconds">{{ seconds }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const hours = computed(() => store.state.timerModule.hours);
    const minutes = computed(() => store.state.timerModule.minutes);
    const seconds = computed(() => store.state.timerModule.seconds);
    return {
      hours,
      minutes,
      seconds,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";

.timer-watch {
  display: flex;
  direction: ltr;
  font-size: 80px;
  font-weight: bold;

  > .faded {
    color: $color_gray_60;
  }

  .seperator {
    margin: 0 5px;
  }

  .number {
      width: 95px;
      text-align: center;
  }
}
</style>
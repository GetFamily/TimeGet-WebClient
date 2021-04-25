<template>
  <div class="timer-watch">
    <div class="hours" :class="{ faded: hours === '00' }">
      {{ hours }}
    </div>
    <div class="seperator" :class="{ faded: hours === '00' }">:</div>
    <div class="minutes" :class="{ faded: minutes === '00' }">
      {{ minutes }}
    </div>
    <div class="seperator" :class="{ faded: minutes === '00' }">:</div>
    <div class="seconds">{{ seconds }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const hours = ref("00");
    const minutes = ref("10");
    const seconds = ref("55");
    return {
      hours,
      minutes,
      seconds,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/_variables';

.timer-watch {
  display: flex;
  direction: ltr;
  font-size: 80px;
  font-weight: bold;

  > .faded{
      color: $color_gray_60;
  }

  .seperator{
      margin: 0 5px;
  }
}
</style>
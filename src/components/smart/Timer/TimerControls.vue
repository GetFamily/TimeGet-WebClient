<template>
  <div class="timer-controls">
    <button class="start" :class="{ running }" @click="toggle">
      <span class="material-icons-round">
        {{ !running ? "play_arrow" : "pause" }}
      </span>
    </button>
    <button @click="lapse" :disabled="!canCaptureLapse">
      <span class="material-icons-round"> flag </span>
    </button>
    <button @click="reset">
      <span class="material-icons-round"> restart_alt </span>
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const running = computed(() => store.state.timerModule.running);
    const canCaptureLapse = computed(
      () =>
        !(
          store.state.timerModule.hours === "00" &&
          store.state.timerModule.minutes === "00" &&
          store.state.timerModule.seconds === "00"
        )
    );
    const toggle = () => store.dispatch("timerModule/toggle");
    const lapse = () => store.dispatch("timerModule/lapseCapture");
    const reset = () => store.dispatch("timerModule/reset");
    return {
      running,
      toggle,
      lapse,
      reset,
      canCaptureLapse,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";
.timer-controls {
  display: flex;
  direction: ltr;
  align-items: center;
  padding-left: 10px;

  > button {
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    &[disabled] {
      opacity: 0.5;
      cursor: default;
    }

    &:not(:first-child) {
      margin-left: 10px;
      background-color: $color_gray_60;
      color: $color_font_white;

      &:hover {
        background-color: $color_gray_50;
      }
    }

    &.start {
      padding: 20px;
      color: $color_font_white;
      background-color: $color_primary_dark_10;

      &:hover {
        background-color: $color_primary_dark_20;
      }

      &.running {
        background-color: $color_secondary_dark_10;

        &:hover {
          background-color: $color_secondary_dark_20;
        }
      }
    }
  }
}
</style>
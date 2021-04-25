<template>
  <div class="timer-controls">
    <button class="start" :class="{ paused: timerRunning }">
      <span class="material-icons-round">
        {{ !timerRunning ? "play_arrow" : "pause" }}
      </span>
    </button>
    <button>
      <span class="material-icons-round"> flag </span>
    </button>
    <button>
      <span class="material-icons-round"> restart_alt </span>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const timerRunning = ref(false);
    return {
      timerRunning,
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

  > button {
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

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

      &.paused {
        background-color: $color_secondary_dark_10;

        &:hover {
          background-color: $color_secondary_dark_20;
        }
      }
    }
  }
}
</style>
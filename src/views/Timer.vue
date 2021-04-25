<template>
  <div class="timer">
    <div class="content">
      <div class="current">
        <TimerWatch></TimerWatch>
        <TimerControls></TimerControls>
      </div>
      <TimerHistory></TimerHistory>
    </div>
  </div>
</template>

<script>
import TimerWatch from "@/components/smart/Timer/TimerWatch.vue";
import TimerControls from "@/components/smart/Timer/TimerControls.vue";
import TimerHistory from "@/components/smart/Timer/TimerHistory.vue";
export default {
  name: "Timer",
  components: {
    TimerWatch,
    TimerControls,
    TimerHistory,
  },
};
</script>

<style lang="scss" scoped>
.timer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    // align-items: center;
  }
}
</style>
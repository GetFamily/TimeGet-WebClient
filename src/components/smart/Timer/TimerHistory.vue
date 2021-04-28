<template>
  <div class="timer-history">
    <div class="content">
      <div class="title">
        <span class="material-icons-round delete-all" @click="lapseClear">
          delete
        </span>
        تاریخچه
      </div>
      <transition-group name="lapse">
        <div
          class="lapse-item"
          v-for="(lapseItem, index) in lapses"
          :key="index"
        >
          <div class="duration">
            {{ lapseItem.duration.hours }}: {{ lapseItem.duration.minutes }}:
            {{ lapseItem.duration.seconds }}
            <div class="number">
              {{ index + 1 }}
            </div>
          </div>
          <div class="until">
            {{ lapseItem.until.hours }}
            {{ lapseItem.until.minutes }}
            {{ lapseItem.until.seconds }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const lapses = computed(() => store.state.timerModule.lapses);
    const lapseClear = () => store.dispatch("timerModule/lapseClear");
    return {
      lapses,
      lapseClear,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";

.timer-history {
  border-right: solid thin $color_gray_60;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  padding-right: 20px;

  .content {
    font-size: 13px;

    .title {
      color: $color_gray_50;
      display: flex;
      align-items: center;

      .delete-all {
        width: 25px;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.5;
        margin-left: 6px;
        margin-right: -6px;
        text-align: right;

        &:hover {
          opacity: 1;
        }
      }
    }

    .lapse-enter-active,
    .lapse-leave-active {
      transition: all 1s ease;
    }
    .lapse-enter-from,
    .lapse-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }

    .lapse-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 20px 0;
      > * {
        direction: ltr;
        display: flex;
        align-items: center;
      }
      .duration {
        font-weight: bold;
        font-size: 17px;
        color: $color_gray_10;
        .number {
          font-weight: normal;
          font-size: 11px;
          width: 25px;
          text-align: right;
        }
      }
      .until {
        padding-right: 25px;
        color: $color_gray_40;
      }
    }
  }

  @media (max-width: 1150px) {
    border-right: none;
    border-top: solid thin $color_gray_60;
    margin-right: 0px;
    margin-top: 20px;
    padding-top: 20px;
  }
}
</style>
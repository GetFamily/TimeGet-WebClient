<template>
  <div class="smart-clock">
    <div class="clock-faces">
      <BaseClockFace1
        v-if="selectedFace === 0"
        :now="$props.now"
      ></BaseClockFace1>
      <BaseClockFace2
        v-else-if="selectedFace === 1"
        :now="$props.now"
      ></BaseClockFace2>
    </div>
    <div class="selection-dots">
      <div
        v-for="(option, index) in facesCount"
        :key="index"
        class="item"
        :class="{ active: selectedFace === index }"
        @click="selectedFace = index"
      ></div>
    </div>
  </div>
</template>

<script>
import BaseClockFace1 from "@/components/base/ClockFaces/BaseClockFace1.vue";
import BaseClockFace2 from "@/components/base/ClockFaces/ClockFace2/BaseClockFace2.vue";
import { ref } from "vue";
export default {
  name: "SmartClock",
  components: {
    BaseClockFace1,
    BaseClockFace2,
  },
  props: ["now"],
  setup() {
    const selectedFace = ref(0);
    const facesCount = 2; // Remember to add by one if another face added
    return {
      selectedFace,
      facesCount,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.smart-clock {
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .clock-faces {
  }
  .selection-dots {
    position: absolute;
    left: 5px;
    .item {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: solid 2px $color_secondary;
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 5px;
      }

      &.active {
        background-color: $color_secondary;
      }
    }
  }
}
</style>
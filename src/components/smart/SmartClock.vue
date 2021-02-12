<template>
  <BaseClockFace2 :now="$props.now"></BaseClockFace2>
</template>

<script>
import BaseClockFace2 from "@/components/base/ClockFaces/ClockFace2/BaseClockFace2.vue";
export default {
  name: "SmartClock",
  components: {
    BaseClockFace2,
  },
  props: ["now"],
};
</script>

<style>
</style>
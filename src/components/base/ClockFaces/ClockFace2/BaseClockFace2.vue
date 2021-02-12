<template>
  <!-- {{ $props.now }} -->
  <div class="container">
    <AnalogClock
      :now="now"
      outer-background="none"
      outer-border="none"
      outer-diameter="300px"
      inner-background="none"
      inner-border="none"
      inner-diameter="290px"
      :hour-markers="true"
      hour-marker-color="#000"
      hour-marker-width="1px"
      hour-marker-height="10px"
      hour-hand-color="#111"
      hour-hand-width="4px"
      hour-hand-height="100px"
      hour-hand-tail="6px"
      minute-hand-color="#222"
      minute-hand-width="2px"
      minute-hand-height="130px"
      minute-hand-tail="6px"
      :second-hand="true"
      second-hand-color="#600"
      second-hand-width="1px"
      second-hand-height="140px"
      second-hand-tail="10px"
    />
    <!--
      <AnalogClock
        style="left: 150px; right: 150px;"
        outer-border="none"
        inner-border="1px solid #000"
      />
    -->
  </div>
</template>

<script>
import AnalogClock from "./AnalogClock.vue";
export default {
  props: ["now"],
  components: {
    AnalogClock,
  },
};
</script>

<style>
.container {
  width: 320px;
  height: 320px;
  padding: 10px;
  transform: scale(0.7);
}
</style>
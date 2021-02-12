<template>
  <div class="base-clock-face1">
    <div class="clock">
      {{ $props.now.getHours().toString().padStart(2, "0") }}
      :
      {{ $props.now.getMinutes().toString().padStart(2, "0") }}
      :
      {{ $props.now.getSeconds().toString().padStart(2, "0") }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["now"],
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.base-clock-face1 {
  width: 320px;
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  direction: ltr;
  .clock {
    width:200px;
    height:80px;
    display: flex;
    justify-content: flex-start;
    padding-left: 30px;
    align-items: center;
    background-color: $color_gray_30;
    color: $color_gray_80;
    font-size: 30px;
    border-radius: 10px;
  }
}
</style>
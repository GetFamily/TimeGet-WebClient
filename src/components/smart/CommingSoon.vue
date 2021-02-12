<template>
  <div class="comming-soon">
    <div class="message">
      {{ $props.feature }} به زودی ...
    </div>
  </div>
</template>

<script>
export default {
  name: "CommingSoon",
  props: ["feature"],
};
</script>

<style lang="scss">
@import '@/assets/style/_variables';
.comming-soon {
    display: flex;
    justify-content: center;
    align-items: center;
  .message {
    background-color: $color_gray_60;
    border: solid 50px $color_gray_70;
    color: $color_gray_80;
    font-size: 20px;
    border-radius: 50%;
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
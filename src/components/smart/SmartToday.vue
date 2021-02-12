<template>
  <div class="smart-today">
    <h1>امروز</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.smart-today {
  background-color: $color_bg_white;
  z-index: -1;
  margin-left: 10px;
  height: calc(100% - 20px);
  box-shadow: 0 0 5px -2px $color_gray;
  border-radius: 3px;
  margin-right: -3px;

  h1{
      padding: 50px;
  }
}
</style>
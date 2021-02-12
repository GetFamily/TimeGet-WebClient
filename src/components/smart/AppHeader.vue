<template>
  <header class="app-header">
    <section class="right-items"><strong>تایم‌گت</strong> <small>لحظات آسمانی</small></section>
    <section class="left-items"><small>نسخهٔ آزمایشی</small></section>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px $padding-main;
  box-shadow: 0 0 13px -4px $color_gray;
  background-color: $color_bg_white;
  z-index: 9;
  font-size: 20px;
}
</style>
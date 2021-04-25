<template>
  <div class="timer-history">
    <div class="content">
      <div class="title">تاریخچه</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";

.timer-history {
  // align-self: center;
  border-right: solid thin $color_gray_60;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  padding-right: 20px;

  .content {
    font-size: 13px;

    .title{
      color: $color_gray_50;
    }
  }
}
</style>
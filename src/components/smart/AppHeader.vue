<template>
  <header class="app-header">
    <section class="right-items">
      <router-link to="/">
        <figure class="logo">
          <img src="/AppLogo.png" alt="" />
        </figure>
      </router-link>
      <router-link to="/">
        <strong>تایم‌گت</strong> <small>لحظات آسمانی</small>
      </router-link>
    </section>
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

  a {
    text-decoration: none;
    color: $color_black;
  }

  .right-items,
  .left-items {
    display: flex;
    align-items: center;
  }

  .right-items {
    > *:not(:last-child) {
      margin-left: 10px;
    }
    .logo {
      height: 40px;
    }
  }
}
</style>
<template>
  <AppScreen>
    <AppHeader></AppHeader>
    <main class="app-content">
      <div id="nav">
        <router-link to="/">مناسبت‌ها</router-link>
        <router-link to="/religious-moments">اوقات شرعی</router-link>
        <router-link to="/hadithes">احادیث و روایات</router-link>
        <router-link to="/articles">مقالات</router-link>
        <router-link to="/resource-introduction">معرفی منبع</router-link>
        <router-link to="/ladies">بانوان</router-link>
        <router-link to="/pregnancy">بارداری</router-link>
      </div>
      <router-view class="current-route" />
      <SmartToday></SmartToday>
    </main>
  </AppScreen>
</template>

<script>
import AppScreen from "@/components/base/AppScreen.vue";
import AppHeader from "@/components/smart/AppHeader.vue";
import SmartToday from "@/components/smart/SmartToday.vue";

export default {
  name: "App",
  components: {
    AppScreen,
    AppHeader,
    SmartToday,
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.app-content {
  display: flex;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  #nav {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;

    a {
      font-weight: bold;
      color: $color_font_white;
      text-decoration: none;
      padding: 20px;
      text-align: center;

      &.router-link-exact-active {
        color: $color_gray_20;
        background-color: $color_bg_white;
        box-shadow: 0 0 5px -2px $color_gray;
        z-index: 1;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        position: relative;
        &::before,
        &::after {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          border-left: solid 3px $color_bg_white;
          position: absolute;
          left: -3px;
        }
        &::before {
          border-bottom: solid 3px $color_bg_white;
          border-bottom-left-radius: 6px;
          top: -10px;
        }
        &::after {
          border-top: solid 3px $color_bg_white;
          border-top-left-radius: 6px;
          bottom: -10px;
        }
      }
    }
  }

  .current-route {
    height: 100%;
    flex-grow: 1;
    background-color: $color_bg_white;
    box-shadow: 0 0 5px -2px $color_gray;
  }
}
</style>

<template>
  <AppScreen>
    <AppHeader></AppHeader>
    <main class="app-content">
      <div id="nav" :class="{ open }" @click="toggleNav">
        <h2>ابزارها</h2>
        <router-link to="/occasions">
          <span class="material-icons-round"> event </span>
          <h3>مناسبت‌ها</h3>
        </router-link>
        <router-link to="/religious-moments">
          <!-- <span class="material-icons-round"> wb_sunny </span> -->
          <!-- <span class="material-icons-round"> wb_cloudy </span> -->
          <!-- <span class="material-icons-round"> landscape </span> -->
          <span class="material-icons-round"> brightness_2 </span>
          <!-- <span class="material-icons-round"> satellite </span> -->
          <h3>اوقات شرعی</h3>
        </router-link>
        <router-link to="/weather">
          <span class="material-icons-round"> wb_sunny </span>
          <h3>آب و هوا</h3>
        </router-link>
        <router-link to="/ladies">
          <span class="material-icons-round"> face </span>
          <h3>بانوان</h3>
        </router-link>
        <router-link to="/getting-pregnant">
          <!-- <span class="material-icons-round"> card_giftcard </span> -->
          <span class="material-icons-round"> child_friendly </span>
          <h3>انعقاد نطفه</h3></router-link
        >
        <router-link to="/pregnancy">
          <span class="material-icons-round"> pregnant_woman </span>
          <h3>بارداری</h3>
        </router-link>
        <h2>ابزارک‌ها</h2>
        <router-link to="/timer">
          <span class="material-icons-round"> timer </span>
          <h3>زمان‌گیر</h3>
        </router-link>
        <h2>محتوا</h2>
        <router-link to="/hadithes">
          <span class="material-icons-round"> format_quote </span>
          <h3>احادیث</h3>
        </router-link>
        <router-link to="/articles">
          <span class="material-icons-round"> article </span>
          <h3>مقالات</h3>
        </router-link>
        <router-link to="/resource-introduction">
          <span class="material-icons-round"> feed </span>
          <h3>معرفی منبع</h3>
        </router-link>
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
import { ref } from "vue";

export default {
  name: "App",
  components: {
    AppScreen,
    AppHeader,
    SmartToday,
  },
  setup() {
    const open = ref(false);
    const toggleNav = (event) => {
      if (event.offsetX > event.target.offsetWidth) {
        // clicked on psuedoelement after (outside)
        open.value = false;
      } else if (event.offsetY < 0) {
        // clicked on psuedoelement before (hambergure menu)
        open.value = !open.value;
      } else {
        open.value = false;
      }
    };
    return {
      open,
      toggleNav,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/_variables";
.app-content {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1 1 0px;
  overflow: hidden;
  #nav {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    direction: ltr;
    width: 152px; // TODO: move to variables
    margin-right: 0;
    transition: margin-right 0.3s ease 0.15s;

    > * {
      direction: rtl;
    }

    h2 {
      font-size: 14px;
      color: $color_primary_light_20;
      padding-right: $padding-main;
    }

    a {
      font-weight: bold;
      color: $color_font_white;
      text-decoration: none;
      padding: 15px 20px;
      text-align: center;
      border-right: solid thick $color_primary;
      display: flex;
      align-items: center;
      justify-content: center;

      .material-icons-round {
        font-size: 22px;
        margin-left: 5px;
      }

      h3 {
        font-size: 15px;
        margin: 0;
        white-space: nowrap;
        @media (min-width: 661px) {
          width: 0;
          overflow: hidden;
          transition: width 0.3s ease;
        }
      }

      &.router-link-exact-active,
      &:hover {
        h3 {
          width: 75px;
        }
      }

      &.router-link-exact-active {
        color: $color_gray_20;
        background-color: $color_bg_white;
        box-shadow: $shaddow_normal;
        z-index: 2;
        border-top-right-radius: $radius_normal;
        border-bottom-right-radius: $radius_normal;
        border-right: solid $radius_normal - 2px $color_secondary;
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
          border-left: solid $radius_normal white;
          border-bottom: solid $radius_normal white;
          border-bottom-left-radius: 2 * $radius_normal;
          top: -10px; // height of before and after
          left: -$radius_normal;
        }
        &::after {
          border-left: solid $radius_normal white;
          border-top: solid $radius_normal white;
          border-top-left-radius: 2 * $radius_normal;
          bottom: -10px; // height of before and after
          left: -$radius_normal;
        }
      }
    }

    @media (max-width: 661px) {
      margin-right: -152px;

      &::after {
        content: "";
        display: block;
        margin-left: -100%;
        width: 100vw;
        height: 100%;
        position: absolute;
        z-index: 2;
        background-color: $color_gray_50;
        background-image: linear-gradient(
          to left,
          white 0%,
          $color_gray_50 30%
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &.open {
        margin-right: 0;
        transition: margin-right 0.3s ease;
        + .current-route {
          margin-left: -152px;
          transition: margin-left 0.3s ease;
        }

        &::after {
          opacity: 0.5;
          pointer-events: initial;
        }
      }

      &::before {
        content: "\2630";
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 12px;
        right: 18px;
        z-index: 9;
        font-size: 25px;
        color: $color_gray_30;
      }
    }
  }

  .current-route {
    z-index: 1;
    height: 100%;
    flex: 1 1 0px;
    display: flex;
    flex-direction: column;
    background-color: $color_bg_white;
    box-shadow: $shaddow_normal;
    padding-top: 5px;
    overflow-y: auto;
    // overflow-x: hidden;
    margin-left: 0px;
    transition: margin-left 0.3s ease 0.15s;
  }
}
</style>

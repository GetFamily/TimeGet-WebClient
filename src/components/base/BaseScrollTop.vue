<template>
  <div class="base-scroll-top-container" :class="{ visible }">
    <button class="base-scroll-top" @click="scrollToTop">&#xbb;</button>
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref, toRef, watch } from "vue";
export default {
  props: ["element"],
  setup(props) {
    const visible = ref(false);
    const elementProp = toRef(props, "element");
    onMounted(() => {
      watch(
        elementProp,
        () => {
          console.log(elementProp.value);
          if (elementProp.value) {
            elementProp.value.addEventListener("scroll", (event) => {
              // console.log(event.target.scrollTop);
              if (event.target.scrollTop > 10) {
                visible.value = true;
              } else {
                visible.value = false;
              }
            });
          }
        },
        { immediate: true }
      );
    });
    const scrollToTop = () => {
      elementProp.value.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    return {
      elementProp,
      visible,
      scrollToTop,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-scroll-top-container {
  position: fixed;
  display: flex;
  flex-direction: row-reverse;
  left: 12px;
  bottom: 0px;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.3s ease, bottom 0.3s ease;
  opacity: 0;
  .base-scroll-top {
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    //   font-weight: bold;
    transform: rotate(90deg);
  }

  &.visible {
    bottom: 12px;
    opacity: 1;
    pointer-events: initial;
  }
}
</style>
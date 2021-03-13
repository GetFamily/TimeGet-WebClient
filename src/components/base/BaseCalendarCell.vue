<template>
  <section class="base-calendar-cell">
    <div class="jalaali">
      {{ jalaaliDay }}
    </div>
    <div class="hijri">
      {{ hijriDay }}
    </div>
    <div class="milaadi">
      {{ milaadiDay }}
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import HijrahDate from "hijrah-date";
export default {
  props: ["value"],
  setup(props) {
    const jalaaliDay = computed(() =>
      props.value.toLocaleDateString("fa-IR", {
        day: "numeric",
      })
    );
    const milaadiDay = computed(() => props.value.getDate());
    const hijriDay = computed(() => new HijrahDate(props.value).getDate().toString().toFarsi());
    return {
      jalaaliDay,
      milaadiDay,
      hijriDay,
    };
  },
};
</script>

<style>
</style>
<template>
  <div class="smart-calendar-config">
    <div class="right-items">
      <SmartMonthChooser></SmartMonthChooser>
      <SmartYearChooser></SmartYearChooser>
    </div>
    <div class="left-items"></div>
  </div>
</template>

<script>
import SmartYearChooser from "@/components/smart/SmartYearChooser";
import SmartMonthChooser from "@/components/smart/SmartMonthChooser";

export default {
  name: "SmartCalendarConfig",
  components: {
    SmartYearChooser,
    SmartMonthChooser,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_variables";

.smart-calendar-config {
  display: flex;
  padding: 15px 30px;

  .right-items,
  .left-items {
    display: flex;
    flex-grow: 1;
  }
  .right-items {
    > * {
      margin-left: 10px;
    }
  }
  .left-items {
    justify-content: flex-end;
    > * {
      margin-right: 10px;
    }
  }
}
</style>
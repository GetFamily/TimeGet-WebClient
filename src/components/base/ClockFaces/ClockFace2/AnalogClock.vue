<template>
  <div class="clock" ref="el">
    <div v-if="hourMarkers">
      <div
        v-once
        v-for="hour in hrMarkers"
        :key="hour"
        :style="hourMarkerStyle(hour)"
        class="hour-marker"
      ></div>
    </div>
    <div>
      <div
        v-once
        v-for="minute in minMarkers"
        :key="minute"
        :style="minuteMarkerStyle(minute)"
        class="minute-marker"
      ></div>
    </div>
    <div class="clock-outer"></div>
    <div class="clock-inner"></div>
    <div class="hand hour-hand"></div>
    <div class="hand minute-hand"></div>
    <div class="hand second-hand" v-if="secondHand"></div>
  </div>
</template>

<script>
// TODO: Consider adding drop-shadows
// TODO: Consider adding some numbers (e.g. 12, 3, 6, 9)
import { computed, onMounted, ref, toRef, watch } from "vue";
import anime from "animejs";
import moment from "moment";

const DEGREES_TO_MOVE_SECOND_HAND = 360 / 60;
const DEGREES_TO_MOVE_MINUTE_HAND = 360 / 60;
const DEGREES_TO_MOVE_HOUR_HAND = 360 / 12;
const SECONDS_IN_HOUR = 60 * 60;
const SECONDS_IN_MINUTE = 60;

export default {
  name: "AnalogClock",
  props: {
    now: {
      type: Date,
      default: new Date(),
    },
    hourMarkers: {
      type: Boolean,
      default: true,
    },
    hourMarkerColor: {
      type: String,
      default: "#000",
    },
    hourMarkerHeight: {
      type: String,
      default: "100px",
    },
    hourMarkerWidth: {
      type: String,
      default: "1px",
    },
    hourHandColor: {
      type: String,
      default: "#000",
    },
    hourHandHeight: {
      type: String,
      default: "30px",
    },
    hourHandWidth: {
      type: String,
      default: "1px",
    },
    hourHandTail: {
      type: String,
      default: "0px",
    },
    minuteHandColor: {
      type: String,
      default: "#000",
    },
    minuteHandHeight: {
      type: String,
      default: "40px",
    },
    minuteHandWidth: {
      type: String,
      default: "1px",
    },
    minuteHandTail: {
      type: String,
      default: "0px",
    },
    secondHand: {
      type: Boolean,
      default: true,
    },
    secondHandColor: {
      type: String,
      default: "#000",
    },
    secondHandHeight: {
      type: String,
      default: "50px",
    },
    secondHandWidth: {
      type: String,
      default: "1px",
    },
    secondHandTail: {
      type: String,
      default: "0px",
    },
    innerBackground: {
      type: String,
      default: "#fff",
    },
    innerBorder: {
      type: String,
      default: "none",
    },
    innerDiameter: {
      type: String,
      default: "90px",
    },
    outerBackground: {
      type: String,
      default: "none",
    },
    outerDiameter: {
      type: String,
      default: "100px",
    },
    outerBorder: {
      type: String,
      default: "1px solid #000",
    },
  },
  setup(props) {
    const el = ref(null);
    const now = toRef(props, "now");
    const time = ref(moment(props.now));
    const hrMarkers = computed(() => {
      return [...Array(12).keys()].map((i) => i + 1);
    });
    const minMarkers = computed(() => {
      return [...Array(60).keys()].map((i) => i + 1);
    });
    const hours = computed(() => {
      return time.value.hours();
    });
    const minutes = computed(() => {
      return time.value.minutes();
    });
    const seconds = computed(() => {
      return time.value.seconds();
    });
    const activate = () => {
      setHourHand();
      setMinuteHand();
      setSecondHand();
      watch(
        now,
        () => {
          time.value = moment(now.value);
          animateHourHand();
          animateMinuteHand();
          animateSecondHand();
        },
        { immediate: false }
      );
    };
    const animateHourHand = () => {
      setHourHand();
    };
    const animateMinuteHand = () => {
      setMinuteHand();
    };
    const animateSecondHand = () => {
      // immediately set rotation less than actual value
      anime.set(".second-hand", {
        rotate: (seconds.value - 1) * DEGREES_TO_MOVE_SECOND_HAND,
      });
      // then animate to actual value
      anime({
        targets: ".second-hand",
        rotate: seconds.value * DEGREES_TO_MOVE_SECOND_HAND,
      });
    };
    const hourMarkerStyle = (hour) => {
      return { transform: `rotate(${hour * DEGREES_TO_MOVE_HOUR_HAND}deg)` };
    };
    const minuteMarkerStyle = (minute) => {
      return {
        transform: `rotate(${minute * DEGREES_TO_MOVE_MINUTE_HAND}deg)`,
      };
    };
    const setHourHand = () => {
      let totalSeconds = minutes.value * SECONDS_IN_MINUTE + seconds.value;
      let offset = totalSeconds * (DEGREES_TO_MOVE_HOUR_HAND / SECONDS_IN_HOUR);
      anime.set(".hour-hand", {
        rotate: hours.value * DEGREES_TO_MOVE_HOUR_HAND + offset,
      });
    };
    const setMinuteHand = () => {
      let offset =
        seconds.value * (DEGREES_TO_MOVE_MINUTE_HAND / SECONDS_IN_MINUTE);
      anime.set(".minute-hand", {
        rotate: minutes.value * DEGREES_TO_MOVE_MINUTE_HAND + offset,
      });
    };
    const setSecondHand = () => {
      anime.set(".second-hand", {
        rotate: seconds.value * DEGREES_TO_MOVE_SECOND_HAND,
      });
    };
    const setProperty = (property, value) => {
      el.value.style.setProperty(property, value);
    };
    const setProperties = () => {
      setProperty("--clock-outer-background", props.outerBackground);
      setProperty("--clock-outer-border", props.outerBorder);
      setProperty("--clock-outer-diameter", props.outerDiameter);
      setProperty("--clock-inner-background", props.innerBackground);
      setProperty("--clock-inner-border", props.innerBorder);
      setProperty("--clock-inner-diameter", props.innerDiameter);
      setProperty("--hour-marker-color", props.hourMarkerColor);
      setProperty("--hour-marker-width", props.hourMarkerWidth);
      setProperty("--hour-marker-height", props.hourMarkerHeight);
      setProperty("--hour-hand-color", props.hourHandColor);
      setProperty("--hour-hand-width", props.hourHandWidth);
      setProperty("--hour-hand-height", props.hourHandHeight);
      setProperty("--hour-hand-tail", props.hourHandTail);
      setProperty("--minute-hand-color", props.minuteHandColor);
      setProperty("--minute-hand-width", props.minuteHandWidth);
      setProperty("--minute-hand-height", props.minuteHandHeight);
      setProperty("--minute-hand-tail", props.minuteHandTail);
      setProperty("--second-hand-color", props.secondHandColor);
      setProperty("--second-hand-width", props.secondHandWidth);
      setProperty("--second-hand-height", props.secondHandHeight);
      setProperty("--second-hand-tail", props.secondHandTail);
    };

    onMounted(() => {
      setProperties();
      activate();
    });

    return {
      el,
      time: null,
      hrMarkers,
      minMarkers,
      hours,
      minutes,
      seconds,
      ...props,
      hourMarkerStyle,
      minuteMarkerStyle,
    };
  },
};
</script>

<style scoped>
.clock {
  --clock-outer-radius: calc(var(--clock-outer-diameter) / 2);
  --clock-inner-radius: calc(var(--clock-inner-diameter) / 2);
  --clock-inner-originXY: calc(
    (var(--clock-outer-diameter) - var(--clock-inner-diameter)) / 2
  );
  --hour-marker-width-quarter: calc(var(--hour-marker-width) * 2);
  --hour-marker-height-quarter: calc(var(--hour-marker-height) * 2);
  --hour-hand-rotate-originY: calc(
    var(--hour-hand-height) - var(--hour-hand-tail)
  );
  --hour-hand-originY: calc(
    (var(--clock-outer-radius) * -1) - var(--hour-hand-tail)
  );
  --minute-hand-rotate-originY: calc(
    var(--minute-hand-height) - var(--minute-hand-tail)
  );
  --minute-hand-originY: calc(
    (var(--clock-outer-radius) * -1) - var(--minute-hand-tail)
  );
  --second-hand-rotate-originY: calc(
    var(--second-hand-height) - var(--second-hand-tail)
  );
  --second-hand-originY: calc(
    (var(--clock-outer-radius) * -1) - var(--second-hand-tail)
  );
  position: relative;
}

.clock-outer {
  background: var(--clock-outer-background);
  border: var(--clock-outer-border);
  border-radius: var(--clock-outer-radius);
  position: absolute;
  width: var(--clock-outer-diameter);
  height: var(--clock-outer-diameter);
}

.clock-inner {
  background: var(--clock-inner-background);
  border: var(--clock-inner-border);
  border-radius: var(--clock-outer-radius);
  position: absolute;
  top: var(--clock-inner-originXY);
  left: var(--clock-inner-originXY);
  width: var(--clock-inner-diameter);
  height: var(--clock-inner-diameter);
}

.hand {
  position: absolute;
  transform-origin: bottom center;
}

.hour-hand {
  background-color: var(--hour-hand-color);
  left: calc(var(--clock-outer-radius) - (var(--hour-hand-width) / 2));
  bottom: var(--hour-hand-originY);
  width: var(--hour-hand-width);
  height: var(--hour-hand-height);
  transform-origin: center var(--hour-hand-rotate-originY);
}

.hour-marker {
  background-color: var(--hour-marker-color);
  position: absolute;
  top: 0;
  left: calc(var(--clock-outer-radius) - (var(--hour-marker-width) / 2));
  width: var(--hour-marker-width);
  height: var(--hour-marker-height);
  transform-origin: center var(--clock-outer-radius);
}

.hour-marker:nth-child(3n) {
  left: calc(
    var(--clock-outer-radius) - (var(--hour-marker-width-quarter) / 2)
  );
  width: var(--hour-marker-width-quarter);
  height: var(--hour-marker-height-quarter);
}

.minute-hand {
  background-color: var(--minute-hand-color);
  left: calc(var(--clock-outer-radius) - (var(--minute-hand-width) / 2));
  bottom: var(--minute-hand-originY);
  width: var(--minute-hand-width);
  height: var(--minute-hand-height);
  transform-origin: center var(--minute-hand-rotate-originY);
}

/**
 * TODO: Make minute markers customizable
 */

.minute-marker {
  background-color: #666;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: calc(var(--clock-outer-radius) - (3px / 2));
  width: 3px;
  height: 3px;
  transform-origin: center var(--clock-outer-radius);
}

.minute-marker:nth-child(5n) {
  display: none;
}

.second-hand {
  background-color: var(--second-hand-color);
  left: calc(var(--clock-outer-radius) - (var(--second-hand-width) / 2));
  bottom: var(--second-hand-originY);
  width: var(--second-hand-width);
  height: var(--second-hand-height);
  transform-origin: center var(--second-hand-rotate-originY);
}
</style>
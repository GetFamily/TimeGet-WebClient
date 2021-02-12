<template>
  <div class="clock">
    <div v-if="hourMarkers">
      <div
        v-once
        v-for="hour in markers"
        :key="hour"
        :style="hourMarkerStyle(hour)"
        class="hour-marker"
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

import anime from 'animejs';
import moment from 'moment';

let _interval = null;

const DEGREES_TO_MOVE_SECOND_HAND = 360 / 60;
const DEGREES_TO_MOVE_MINUTE_HAND = 360 / 60;
const DEGREES_TO_MOVE_HOUR_HAND = 360 / 12;
const SECONDS_IN_HOUR = 60 * 60;
const SECONDS_IN_MINUTE = 60;

export default {
  name: 'AnalogClock',
  props: {
    hourMarkers: {
      type: Boolean,
      default: true
    },
    hourMarkerColor: {
      type: String,
      default: '#000'
    },
    hourMarkerHeight: {
      type: String,
      default: '100px'
    },
    hourMarkerWidth: {
      type: String,
      default: '1px'
    },
    hourHandColor: {
      type: String,
      default: '#000'
    },
    hourHandHeight: {
      type: String,
      default: '30px'
    },
    hourHandWidth: {
      type: String,
      default: '1px'
    },
    hourHandTail: {
      type: String,
      default: '0px'
    },
    minuteHandColor: {
      type: String,
      default: '#000'
    },
    minuteHandHeight: {
      type: String,
      default: '40px'
    },
    minuteHandWidth: {
      type: String,
      default: '1px'
    },
    minuteHandTail: {
      type: String,
      default: '0px'
    },
    secondHand: {
      type: Boolean,
      default: true
    },
    secondHandColor: {
      type: String,
      default: '#000'
    },
    secondHandHeight: {
      type: String,
      default: '50px'
    },
    secondHandWidth: {
      type: String,
      default: '1px'
    },
    secondHandTail: {
      type: String,
      default: '0px'
    },
    innerBackground: {
      type: String,
      default: '#fff'
    },
    innerBorder: {
      type: String,
      default: 'none'
    },
    innerDiameter: {
      type: String,
      default: '90px'
    },
    outerBackground: {
      type: String,
      default: 'none'
    },
    outerDiameter: {
      type: String,
      default: '100px'
    },
    outerBorder: {
      type: String,
      default: '1px solid #000'
    }
  },
  data() {
    return {
      time: null
    };
  },
  computed: {
    markers() {
      return [...Array(12).keys()].map(i => i + 1);
    },
    hours() {
      return this.time.hours();
    },
    minutes() {
      return this.time.minutes();
    },
    seconds() {
      return this.time.seconds();
    }
  },
  methods: {
    activate() {
      this.setHourHand();
      this.setMinuteHand();
      this.setSecondHand();
      _interval = setInterval(() => {
        this.time = moment();
        this.animateHourHand();
        this.animateMinuteHand();
        this.animateSecondHand();
      }, 1000);
    },
    animateHourHand() {
      this.setHourHand();
    },
    animateMinuteHand() {
      this.setMinuteHand();
    },
    animateSecondHand() {
      // immediately set rotation less than actual value
      anime.set('.second-hand', {
        rotate: (this.seconds - 1) * DEGREES_TO_MOVE_SECOND_HAND
      });
      // then animate to actual value
      anime({
        targets: '.second-hand',
        rotate: this.seconds * DEGREES_TO_MOVE_SECOND_HAND
      });
    },
    hourMarkerStyle(hour) {
      return { transform: `rotate(${hour * DEGREES_TO_MOVE_HOUR_HAND}deg)` };
    },
    setHourHand() {
      let totalSeconds = this.minutes * SECONDS_IN_MINUTE + this.seconds;
      let offset = totalSeconds * (DEGREES_TO_MOVE_HOUR_HAND / SECONDS_IN_HOUR);
      anime.set('.hour-hand', {
        rotate: this.hours * DEGREES_TO_MOVE_HOUR_HAND + offset
      });
    },
    setMinuteHand() {
      let offset =
        this.seconds * (DEGREES_TO_MOVE_MINUTE_HAND / SECONDS_IN_MINUTE);
      anime.set('.minute-hand', {
        rotate: this.minutes * DEGREES_TO_MOVE_MINUTE_HAND + offset
      });
    },
    setSecondHand() {
      anime.set('.second-hand', {
        rotate: this.seconds * DEGREES_TO_MOVE_SECOND_HAND
      });
    },
    setProperty(property, value) {
      this.$el.style.setProperty(property, value);
    },
    setProperties() {
      this.setProperty('--clock-outer-background', this.outerBackground);
      this.setProperty('--clock-outer-border', this.outerBorder);
      this.setProperty('--clock-outer-diameter', this.outerDiameter);
      this.setProperty('--clock-inner-background', this.innerBackground);
      this.setProperty('--clock-inner-border', this.innerBorder);
      this.setProperty('--clock-inner-diameter', this.innerDiameter);
      this.setProperty('--hour-marker-color', this.hourMarkerColor);
      this.setProperty('--hour-marker-width', this.hourMarkerWidth);
      this.setProperty('--hour-marker-height', this.hourMarkerHeight);
      this.setProperty('--hour-hand-color', this.hourHandColor);
      this.setProperty('--hour-hand-width', this.hourHandWidth);
      this.setProperty('--hour-hand-height', this.hourHandHeight);
      this.setProperty('--hour-hand-tail', this.hourHandTail);
      this.setProperty('--minute-hand-color', this.minuteHandColor);
      this.setProperty('--minute-hand-width', this.minuteHandWidth);
      this.setProperty('--minute-hand-height', this.minuteHandHeight);
      this.setProperty('--minute-hand-tail', this.minuteHandTail);
      this.setProperty('--second-hand-color', this.secondHandColor);
      this.setProperty('--second-hand-width', this.secondHandWidth);
      this.setProperty('--second-hand-height', this.secondHandHeight);
      this.setProperty('--second-hand-tail', this.secondHandTail);
    }
  },
  created() {
    this.time = moment();
  },
  mounted() {
    this.setProperties();
    this.activate();
  },
  beforeDestroy() {
    clearInterval(_interval);
    _interval = null;
  }
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

.second-hand {
  background-color: var(--second-hand-color);
  left: calc(var(--clock-outer-radius) - (var(--second-hand-width) / 2));
  bottom: var(--second-hand-originY);
  width: var(--second-hand-width);
  height: var(--second-hand-height);
  transform-origin: center var(--second-hand-rotate-originY);
}
</style>

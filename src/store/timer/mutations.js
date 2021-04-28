export default {
    count(state, {hours, minutes, seconds}) {
        state.hours = hours;
        state.minutes = minutes;
        state.seconds = seconds;
    },
    reset(state) {
        state.hours = '00';
        state.minutes = '00';
        state.seconds = '00';
    },
    toggle(state) {
        state.running = !state.running;
    },
    lapseCapture(state, record){
        state.lapses.push(record);
    },
    lapseClear(state){
        state.lapses = [];
    }
};
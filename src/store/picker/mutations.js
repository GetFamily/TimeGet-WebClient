import jalaali from 'jalaali-js';

export default {
    selectYear(state, value) {
        console.log(value);
        state.selectedYear = value;
        this.commit('pickerModule/updateSelectedDate');
    },
    selectMonth(state, value) {
        console.log(value);
        state.selectedYear += Math.floor((value - 1) / 12);
        state.selectedMonth = (value - 1) % 12 + 1;
        if (state.selectedMonth < 1) {
            state.selectedMonth = 12 + state.selectedMonth;
        }
        this.commit('pickerModule/updateSelectedDate');
    },
    selectDay(state, value) {
        console.log(value);
        state.selectedDay = value;
        this.commit('pickerModule/updateSelectedDate');
    },
    updateSelectedDate(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, state.selectedDay);
        state.selectedDate = new Date(gy, gm - 1, gd);
    },
};
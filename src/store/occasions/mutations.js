export default {
    setTodayOccasions(state, data ) {
        state.occasionsOfToday = data;
        console.log(data);
    },
    setMonthOccasions(state, { month, data }) {
        state.occasionsOfMonth[month] = data.sort((a, b) => a.day - b.day);
        state.holidaysOfMonth[month] = data.filter(occasion => occasion.holiday == 'true').sort((a, b) => a.day - b.day).map(occasion => `${occasion.month.toFarsi()}_${occasion.day.toFarsi()}`);
    },
};
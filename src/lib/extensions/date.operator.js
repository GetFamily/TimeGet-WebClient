Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const weekDays = {
    'شنبه': 0,
    'یکشنبه': 1,
    'دوشنبه': 2,
    'سه‌شنبه': 3,
    'چهارشنبه': 4,
    'پنجشنبه': 5,
    'جمعه': 6,
}

Date.prototype.getJalaaliWeekDayInNumeric = function() {
    const weekDay = weekDays[this.toLocaleDateString("fa-IR", { weekday: "long" })];
    return typeof weekDay === 'undefined' ? this.toLocaleDateString("fa-IR", { weekday: "long" }) : weekDay;
}

Date.prototype.getJalaaliWeekDayInFarsi = function() {
    return this.toLocaleDateString("fa-IR", { weekday: "long" });
}
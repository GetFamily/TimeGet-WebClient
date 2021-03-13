import jalaali from 'jalaali-js';
import HijrahDate from 'hijrah-date';
const farsiMonthDictionary = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
];
const arabicMonthDictionary = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
]

export default {
    selectedMonthInString(state) {
        return farsiMonthDictionary[state.selectedMonth - 1] || state.selectedMonth;
    },
    selectedMonthInStringStartHijri(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, 1);
        const startMilaadi = new Date(gy, gm - 1, gd);
        const hijrahDate = new HijrahDate(startMilaadi);
        console.log(hijrahDate);
        return arabicMonthDictionary[hijrahDate.getMonth()];
    },
    selectedMonthInStringEndHijri(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, jalaali.jalaaliMonthLength(state.selectedYear, state.selectedMonth));
        const startMilaadi = new Date(gy, gm - 1, gd);
        const hijrahDate = new HijrahDate(startMilaadi);
        console.log(hijrahDate);
        return arabicMonthDictionary[hijrahDate.getMonth()];
    },
    selectedYearHijri(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, jalaali.jalaaliMonthLength(state.selectedYear, state.selectedMonth));
        const startMilaadi = new Date(gy, gm - 1, gd);
        const hijrahDate = new HijrahDate(startMilaadi);
        return hijrahDate.getFullYear();
    },
    selectedMonthInStringStartMilaadi(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, 1);
        const startMilaadi = new Date(gy, gm - 1, gd);
        return startMilaadi.toLocaleDateString('en-IR', { month: 'long' });
    },
    selectedMonthInStringEndMilaadi(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, jalaali.jalaaliMonthLength(state.selectedYear, state.selectedMonth));
        const startMilaadi = new Date(gy, gm - 1, gd);
        return startMilaadi.toLocaleDateString('en-IR', { month: 'long' });
    },
    selectedYearMilaadi(state) {
        const { gy, gm, gd } = jalaali.toGregorian(state.selectedYear, state.selectedMonth, jalaali.jalaaliMonthLength(state.selectedYear, state.selectedMonth));
        const startMilaadi = new Date(gy, gm - 1, gd);
        return startMilaadi.toLocaleDateString('en-IR', { year: 'numeric' });
    },
};
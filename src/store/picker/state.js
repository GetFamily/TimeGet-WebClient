export default {
    selectedYear: Number(new Date().toLocaleDateString('fa-IR', {year: 'numeric'}).toEnglish()),
    selectedMonth: Number(new Date().toLocaleDateString('fa-IR', {month: 'numeric'}).toEnglish()),
    selectedDay: Number(new Date().toLocaleDateString('fa-IR', {day: 'numeric'}).toEnglish()),
    selectedDate: new Date(),
};
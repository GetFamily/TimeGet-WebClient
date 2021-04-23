import axios from 'axios';

export default {
    async getOccasionsOfToday({commit}) {
        console.log(this.state.currentModule.today);
        const response = await axios({
            baseURL: '',
            url: '/api/occasions',
            params: {
                year: this.state.currentModule.today.toLocaleDateString('fa-IR', {year: 'numeric'}).toString().toEnglish(),
                month: this.state.currentModule.today.toLocaleDateString('fa-IR', {month: 'numeric'}).toString().toEnglish(),
                day: this.state.currentModule.today.toLocaleDateString('fa-IR', {day: 'numeric'}).toString().toEnglish(),
                // day: 9,
            },
        });
        commit('setTodayOccasions', response.data);
    },
    async getOccasionsOfMonth({commit}, {year, month}) {
        const response = await axios({
            baseURL: '',
            url: '/api/occasions',
            params: {
                year,
                month,
            },
        });
        commit('setMonthOccasions', {month, data: response.data});
    }
};
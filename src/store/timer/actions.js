export default {
    reset({ commit, dispatch }) {
        this._timerStart = new Date();
        this._timerOffset = 0;
        commit('reset');
        dispatch('lapseClear');
    },
    lapseClear({commit}){
        this._lapseOffset = this._timerOffset;
        this._lapseStart = this._timerStart;
        commit('lapseClear');
    },
    lapseCapture({ commit }) {
        const lapseEnd = new Date();
        const lapseDiff = (this._lapseStart ? (lapseEnd - this._lapseStart) : 0) + this._lapseOffset;
        const lapseHours = Math.floor(lapseDiff / 1000 / 60 / 60).toString().padStart(2, '0');
        const lapseMinutes = Math.floor(lapseDiff / 1000 / 60 % 60).toString().padStart(2, '0');
        const lapseSeconds = Math.floor(lapseDiff / 1000 % 60).toString().padStart(2, '0');

        const timerEnd = new Date();
        const timerDiff = (this._timerStart ? (timerEnd - this._timerStart) : 0) + this._timerOffset;
        const timerHours = Math.floor(timerDiff / 1000 / 60 / 60).toString().padStart(2, '0');
        const timerMinutes = Math.floor(timerDiff / 1000 / 60 % 60).toString().padStart(2, '0');
        const timerSeconds = Math.floor(timerDiff / 1000 % 60).toString().padStart(2, '0');
        commit('lapseCapture', {
            until: {
                hours: timerHours,
                minutes: timerMinutes,
                seconds: timerSeconds
            },
            duration: {
                hours: lapseHours,
                minutes: lapseMinutes,
                seconds: lapseSeconds
            },
        });
        this._lapseOffset = 0;
        this._lapseStart = this._lapseStart ? new Date() : undefined;
    },
    toggle({ commit }) {
        commit('toggle');
        if (this._countingInterval) {
            clearInterval(this._countingInterval);
            this._timerOffset = (new Date() - this._timerStart) + this._timerOffset;
            this._lapseOffset = (new Date() - this._lapseStart) + this._lapseOffset;
            delete this._countingInterval;
            delete this._timerStart;
            delete this._lapseStart;
        }
        else {
            this._timerStart = new Date();
            this._lapseStart = new Date();
            this._timerOffset = this._timerOffset || 0;
            this._lapseOffset = this._lapseOffset || 0;
            this._countingInterval = setInterval(() => {
                const timerEnd = new Date();
                const diff = (timerEnd - this._timerStart) + this._timerOffset;
                const hours = Math.floor(diff / 1000 / 60 / 60).toString().padStart(2, '0');
                const minutes = Math.floor(diff / 1000 / 60 % 60).toString().padStart(2, '0');
                const seconds = Math.floor(diff / 1000 % 60).toString().padStart(2, '0');
                commit('count', { hours, minutes, seconds });
            }, 1000);
        }
    },
};
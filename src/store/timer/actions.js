export default {
    reset({ commit }) {
        this._timerStart = new Date();
        this._timerOffset = 0;
        commit('reset');
    },
    toggle({ commit }) {
        commit('toggle');
        if (this._countingInterval) {
            clearInterval(this._countingInterval);
            this._timerOffset = (new Date() - this._timerStart) + this._timerOffset;
            delete this._countingInterval;
            delete this._timerStart;
        }
        else {
            this._timerStart = new Date();
            this._timerOffset = this._timerOffset || 0;
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
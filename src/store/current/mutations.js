export default {
    runNowInterval(state) {
        setInterval(() => {
            state.now = new Date();
            if (state.now.getDate() !== state.today.getDate()) {
                state.today = state.now;
            }
        }, 1000);
    }
};
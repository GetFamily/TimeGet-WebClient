import { createStore } from "vuex";

export default createStore({
  state: {
    now: new Date(),
  },
  mutations: {
    runNowInterval(state){
      setInterval(() => {
        state.now = new Date();
      }, 1000);
    }
  },
  actions: {},
  getters: {
    now(state){
      return state.now;
    }
  },
  modules: {}
});

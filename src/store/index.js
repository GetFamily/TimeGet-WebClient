import { createStore } from "vuex";
import currentModule from './current';
import pickerModule from './picker';
import occasionsModule from './occasions';
import timerModule from './timer';

export default createStore({
  modules: {
    currentModule,
    pickerModule,
    occasionsModule,
    timerModule,
  }
});

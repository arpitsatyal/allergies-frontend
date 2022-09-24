import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

import { auth } from "./auth";
import { allergies } from "./allergies";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage
});

const store = createStore<any>({
  modules: {
    auth,
    allergies
  },
  plugins: [vuexLocalStorage.plugin],
});

export default store;

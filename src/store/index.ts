import { createStore } from "vuex";
import { IAllergyResponse } from "../types/allergies";

interface State {
  allergies: IAllergyResponse[];
}

const store = createStore<State>({
  state() {
    return {
      allergies: [] as IAllergyResponse[],
    };
  },
  mutations: {
    addAllergiesToState(state, payload) {
      state.allergies = payload;
    },
  },
});

export default store;

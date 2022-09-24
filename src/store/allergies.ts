import { IAllergyResponse } from "@/types/allergies";

interface State {
    allAllergies: IAllergyResponse[];
}

export const allergies = {
  namespaced: true,
  state() {
    return {
      allAllergies: [] as IAllergyResponse[],
    };
  },
  mutations: {
    addAllergiesToState(state: State, payload: IAllergyResponse[]) {
      state.allAllergies = payload;
    },
  },
};

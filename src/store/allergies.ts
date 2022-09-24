import { allergiesService } from "@/services/allergies";
import { IAllergyResponse } from "@/types/allergies";
import { logout } from "@/utils/logout";
import { toastError } from "@/utils/toastError";

interface State {
  allAllergies: IAllergyResponse[];
  isLoading: boolean;
}

export const allergies = {
  namespaced: true,
  state() {
    return {
      allAllergies: [] as IAllergyResponse[],
      isLoading: false,
    };
  },
  getters: {
    getAllergies: (state: State) => state.allAllergies
  },
  mutations: {
    addAllergiesToState(state: State, payload: IAllergyResponse[]) {
      state.allAllergies = payload;
    },
    setLoading(state: State, payload: boolean) {
      state.isLoading = payload;
    },
  },
  actions: {
    fetchAllergies({ commit }: any) {
      commit("setLoading", true);
      allergiesService
        .getAllergies()
        .then((data) => {
          commit("setLoading", false);
          commit("addAllergiesToState", data);
        })
        .catch((err) => {
          commit("setLoading", false);
          toastError(err);
          logout(3000);
        });
    },
  },
};

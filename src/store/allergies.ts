import { logout } from "@/utils/logout";
import { toastError } from "@/utils/toastError";
import { IAllergyResponse } from "@/types/allergies";
import { allergiesService } from "@/services/allergies";

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
    getAllergies: (state: State) => state.allAllergies,
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
    fetchAllergies(
      { commit }: any,
      paginationData: { page: number; pageSize: number }
    ) {
      commit("setLoading", true);
      allergiesService
        .getAllergies(+paginationData.page, +paginationData.pageSize)
        .then((data) => {
          commit("addAllergiesToState", data);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          toastError(err);
          logout();
        });
    },
    searchAllergies({ commit }: any, searchTerm: string) {
      commit("setLoading", true);
      allergiesService
        .searchAllergies(searchTerm)
        .then((data) => {
          commit("setLoading", false);
          commit("addAllergiesToState", data);
        })
        .catch((err) => {
          toastError(err);
          commit("setLoading", false);
        });
    },
  },
};

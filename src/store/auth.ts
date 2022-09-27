import { IUser } from "./../types/auth";

interface State {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
}

export const auth = {
  namespaced: true,
  state() {
    return {
      user: {} as IUser,
      token: "",
      refreshToken: "",
    };
  },
  mutations: {
    addUserToState(state: State, payload: IUser) {
      state.user = payload;
    },
    addTokenToState(state: State, payload: string) {
      state.token = payload;
    },
    addRefreshTokenToState(state: State, payload: string) {
      state.refreshToken = payload;
    },
    removeAllData(state: State) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
};

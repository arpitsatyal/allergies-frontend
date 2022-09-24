import { IUser } from "./../types/auth";

interface State {
  user: IUser;
  token: string;
  refreshToken: string;
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
  },
};

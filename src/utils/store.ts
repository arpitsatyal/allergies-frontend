import store from "@/store";

export const getFromStore = (field: string) => {
  let result;

  if (store) {
    const { state } = store;
    if (field === "user") {
      result = state.auth.user.id;
    } else if (field === "token") {
      result = state.auth.token;
    } else if (field === "refreshToken") {
      result = state.auth.refreshToken;
    }
  }

  return result;
};

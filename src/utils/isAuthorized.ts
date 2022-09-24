import store from "../store/index";

export const canUserAccess = (): boolean => {
  if (store && store.state && store.state.auth.token) {
    return true;
  }
  return false;
};

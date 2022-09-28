import store from "../store/index";

export const canUserAccess = (): boolean =>
  store?.state?.auth?.token ? true : false;

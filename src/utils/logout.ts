import store from "@/store";
import router from "@/router";

export function logout() {
  store.commit('auth/removeAllData');
  localStorage.clear();
  router.push('/');
}

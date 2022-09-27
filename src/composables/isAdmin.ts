import store from "@/store";
import { computed, ref, Ref } from "@vue/runtime-core";

export function isUserTheAdmin(): Ref<boolean> {
  const user = computed(() => store.state.auth.user);
  const isAdmin = ref(false);

  if (user?.value?.role === "admin") {
    isAdmin.value = true;
  }
  return isAdmin;
}

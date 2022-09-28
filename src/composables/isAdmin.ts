import store from "@/store";

export function isUserTheAdmin(): boolean {
  const user = store.state?.auth?.user;
  let isAdmin = false;

  if (user.role === "admin") {
    isAdmin = true;
  }
  return isAdmin;
}

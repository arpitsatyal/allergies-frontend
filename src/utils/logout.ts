import router from "@/router";

export function logout(timeout?: number) {
  localStorage.clear();
  timeout ? setTimeout(() => router.push("/"), timeout) : router.push("/");
}

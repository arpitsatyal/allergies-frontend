<template>
  <section>
    <div
      id="title"
      class="py-12 bg-indigo-100 flex justify-center lg:justify-start lg:px-12"
    >
      <div class="cursor-pointer flex items-center">
        <div
          class="text-xl md:text-2xl text-indigo-800 tracking-wide ml-2 font-semibold"
        >
          Allergies Manegement Application
        </div>
      </div>
    </div>
    <div
      id="form"
      class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
    >
      <h2
        class="text-center text-2xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl xl:text-bold mb-5"
      >
        {{ isLogin ? "Login" : "Sign up" }}
      </h2>
      <div>
        <form>
          <div v-if="!isLogin" class="mb-5">
            <div class="text-sm font-bold text-gray-700 tracking-wide mb-4">
              Name
            </div>
            <input
              v-model="name"
              name="name"
              type="text"
              class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Arpit"
            />
          </div>
          <!-- <Input label="Email Address" :vModel="email" name="email" placeholder="arpit@gmail.com" /> -->
          <div class="mb-5">
            <div class="text-sm font-bold text-gray-700 tracking-wide mb-4">
              Email Address
            </div>
            <input
              v-model="email"
              name="email"
              type="text"
              class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="arpit@gmail.com"
            />
          </div>
          <div class="mb-5">
            <div class="flex justify-between items-center">
              <div class="text-sm font-bold text-gray-700 tracking-wide mb-4">
                Password
              </div>
            </div>
            <input
              v-model="password"
              type="password"
              name="password"
              class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <div class="mt-10" v-if="isLogin">
            <Button
              v-if="!loading"
              :onSubmit="onSubmit"
              text="Login"
            />
            <Button
              v-else
              text="Logging in..."
            />
          </div>
          <div class="mt-10" v-else>
            <Button
              v-if="!loading"
              :onSubmit="onSubmit"
              text="Sign Up"
            />
            <Button
              v-else
              text="Signing up..."
            />
          </div>
        </form>
        <Extra v-if="isLogin" textOne="Dont have an account?" textTwo="Sign Up" path="/signup" />
        <Extra v-else textOne="Already have an account?" textTwo="Login" path="/" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref } from "@vue/runtime-core";

import router from "@/router";
import Extra from "@/components/Extra.vue";
import Button from "../components/Button.vue";
import { authService } from "../services/auth";
import { ToastService } from "../services/toast";
import { toastError } from "../utils/toastError";

export default defineComponent({
  name: "Signup",
  props: {
    isLogin: Boolean,
  },
  components: {
    Button,
    Extra
  },
  setup(props) {
    const name = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");

    const loading = ref<boolean>(false);
    const store = useStore();
    const toast = new ToastService();

    function onSubmit(e: Event) {
      e.preventDefault();
      loading.value = true;
      if (props.isLogin) {
        authService
          .login({
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            toast.success(response.message);

            store.commit("auth/addUserToState", response.data.user);
            store.commit("auth/addTokenToState", response.data.accessToken);
            store.commit(
              "auth/addRefreshTokenToState",
              response.data.refreshToken
            );

            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            toastError(err);
          })
          .finally(() => (loading.value = false));
      } else {
        authService
          .signup({
            name: name.value,
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            toast.success(response.message);
            setTimeout(() => router.push("/"), 1000);
          })
          .catch((err) => {
            toastError(err);
          })
          .finally(() => (loading.value = false));
      }
    }

    return { toast, loading, name, email, password, onSubmit };
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

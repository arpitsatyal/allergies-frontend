<template>
  <div class="info">
    <h2>Welcome to Allergy Manegement</h2>
    <p>Please login or sign up to continue.</p>
  </div>
  <div class="container">
    <div class="form">
      <form @submit="onSubmit" class="login-form">
        <input
          v-if="!isLogin"
          v-model="name"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input v-model="email" type="text" name="email" placeholder="Email" />
        <input
          v-model="password"
          type="password"
          name="password"
          placeholder="Password"
        />
        <template v-if="isLogin">
          <button type="submit" class="btn" v-if="!loading">Login</button>

          <button type="submit" class="btn" disabled v-else>Logging in...</button>
          <p class="message">
            Not registered yet? <router-link to="/signup">Sign Up</router-link>
          </p>
        </template>
        <template v-else>
          <button type="submit" class="btn" v-if="!loading">Sign up</button>
          <button type="submit" class="btn" disabled v-else>Signing up....</button>
          <p class="message">Go Back to <router-link to="/">Login</router-link></p>
        </template>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useToast } from "vue-toastification";
import { useStore } from "vuex";
import { defineComponent, ref } from "@vue/runtime-core";

import router from "@/router";
import { authService } from "../services/auth";
import { toastError } from "../utils/toastError";

export default defineComponent({
  name: "Signup",
  props: {
    isLogin: Boolean,
  },
  setup(props) {
    const name = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");

    const loading = ref<boolean>(false);
    const toast = useToast();
    const store = useStore();

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
            loading.value = false;
            toast.success(response.message);

            store.commit("auth/addUserToState", response.data.user);
            store.commit("auth/addTokenToState", response.data.accessToken);
            store.commit("auth/addRefreshTokenToState", response.data.refreshToken);

            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            loading.value = false;
            toastError(err);
          });
      } else {
        authService
          .signup({
            name: name.value,
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            loading.value = false;
            toast.success(response.message);
            setTimeout(() => router.push("/"), 1000);
          })
          .catch((err) => {
            loading.value = false;
            toastError(err);
          });
      }
    }

    return { toast, loading, name, email, password, onSubmit };
  },
  inheritAttrs: false, // disable 'non-props' warning
});
</script>

<style scoped lang="scss">
@import "../assets/login.scss";
</style>

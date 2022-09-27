<template>
  <Header />
  <a-button type="primary" class="mt-30 ml-20" @click="goBack">Go Back</a-button>
  <div class="mt-30">
    <h3 class="center">All users</h3>

    <table class="mt-30">
      <thead class="center">
        <tr class="table-headers">
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <template :key="user" v-for="user in users">
        <tbody class="center" :class="{ active: user.role === 'admin' }">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { IUser } from "@/types/auth";
import { goBack } from "@/composables/goBack";
import { authService } from "@/services/auth";
import Header from "@/components/Header.vue";
import { toastError } from "@/utils/toastError";

export default defineComponent({
  name: "Users",
  components: {
    Header,
  },

  setup() {
    const users = ref<IUser[]>([]);

    function fetchAllUsers() {
      authService
        .getAllUsers()
        .then((data) => (users.value = data))
        .catch((err) => toastError(err));
    }
    onMounted(() => fetchAllUsers());
    return { users, goBack };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
</style>

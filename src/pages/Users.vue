<template>
  <Header />
  <a-button type="primary" class="mt-30 ml-20" @click="goBack">Go Back</a-button>
  <h3 class="center">All users</h3>
  <div class="mt-30" v-if="!loading">
    <a-table :dataSource="users" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <span :class="{ active: record.role === 'admin' }">{{ record.name }}</span>
        </template>
        <template v-if="column.key === 'email'">
          <span :class="{ active: record.role === 'admin' }">{{ record.email }}</span>
        </template>
        <template v-if="column.key === 'role'">
          <span :class="{ active: record.role === 'admin' }">{{ record.role }}</span>
        </template>
      </template>
    </a-table>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import { IUser } from "@/types/auth";
import Header from "@/components/Header.vue";
import { goBack } from "@/composables/goBack";
import { authService } from "@/services/auth";
import Loading from "@/components/Loading.vue";
import { toastError } from "@/utils/toastError";

export default defineComponent({
  name: "Users",
  components: {
    Header,
    Loading,
  },

  setup() {
    const loading = ref(false);
    const users = ref<IUser[]>([]);

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        align: "center",
      },
    ];

    function fetchAllUsers() {
      loading.value = true;
      authService
        .getAllUsers()
        .then((data) => {
          loading.value = false;
          users.value = data;
        })
        .catch((err) => {
          loading.value = false;
          toastError(err);
        });
    }
    onMounted(() => fetchAllUsers());

    return { users, loading, columns, goBack };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
</style>

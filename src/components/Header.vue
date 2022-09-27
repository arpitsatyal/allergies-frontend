<template>
  <a-page-header
    @click="goToDashboard"
    style="border: 1px solid rgb(235, 237, 240)"
    class="pointer"
    title="Allergies Management"
  >
    <template #extra>
      <a-menu mode="horizontal">
        <a-sub-menu>
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>Settings</template>
          <a-menu-item-group title="Actions">
            <div v-if="isAdmin">
              <router-link :to="{ name: 'Users' }">
                <a-menu-item>All Users</a-menu-item>
              </router-link>
            </div>
            <a-menu-item @click="logout">Logout</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </template>
  </a-page-header>
  <br />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import router from "@/router";
import { logout } from "@/utils/logout";
import { isUserTheAdmin } from "../composables/isAdmin";
import { SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "Header",

  components: {
    SettingOutlined,
  },
  setup() {
    const isAdmin = isUserTheAdmin();

    function goToDashboard() {
      router.push("/dashboard");
    }
    return {
      isAdmin,
      logout,
      goToDashboard,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>

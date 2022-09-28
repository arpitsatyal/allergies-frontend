<template>
  <a-page-header
    @click="router.push('/dashboard')"
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
            <a-menu-item v-if="isAdmin" @click="router.push('/users')"
              >All Users</a-menu-item
            >
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
import { SettingOutlined } from "@ant-design/icons-vue";

import router from "@/router";
import { logout } from "@/utils/logout";
import { isUserTheAdmin } from "../composables/isAdmin";

export default defineComponent({
  name: "Header",

  components: {
    SettingOutlined,
  },
  setup() {
    const isAdmin = isUserTheAdmin();

    return {
      router,
      isAdmin,
      logout,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>

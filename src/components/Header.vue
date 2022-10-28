<template>
  <div class="mb-5 p-4 bg-white flex justify-between items-center">
    <h1 class="font-bold text-xl">Allergies Management</h1>
    <div class="flex justify-end items-center space-x-5">
      <div id="faq" class="hidden md:block">
        <FAQ />
      </div>
      <div id="settings">
        <a-menu mode="horizontal">
          <a-sub-menu>
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>
              Menu</template>
            <a-menu-item-group title="Actions">
              <a-menu-item v-if="isAdmin" @click="router.push('/users')"
                >All Users</a-menu-item
              >
              <a-menu-item @click="logout">Logout</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { SettingOutlined } from "@ant-design/icons-vue";

import FAQ from "./FAQ.vue";
import router from "@/router";
import { logout } from "@/utils/logout";
import { isUserTheAdmin } from "../composables/isAdmin";

export default defineComponent({
  name: "Header",

  components: {
    FAQ,
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

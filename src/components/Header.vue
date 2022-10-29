<template>
  <div class="mb-5 p-4 bg-white flex justify-between items-center">
    <h1 class="font-bold text-xl">Allergies Management</h1>
    <div class="flex justify-end items-center space-x-5">
      <div id="faq" class="hidden md:block">
        <Drawer />
      </div>
      <div id="settings">
        <a-menu mode="horizontal">
          <a-sub-menu>
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title> Menu</template>
            <a-menu-item-group title="Actions">
              <div class="block md:hidden">
                <a-menu-item>
                  <router-link to="/add-allergy">Add Allergy</router-link>
                </a-menu-item>
              </div>
              <div class="block md:hidden">
                <a-menu-item>
                  <router-link to="/faq">FAQ</router-link>
                </a-menu-item>
              </div>
              <a-menu-item v-if="isAdmin">
                <router-link to="/users">All Users</router-link>
              </a-menu-item>
              <a-menu-item @click="logout">Logout</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { SettingOutlined } from "@ant-design/icons-vue";

import { logout } from "@/utils/logout";
import Drawer from './Drawer.vue';
import { isUserTheAdmin } from "../composables/isAdmin";

export default defineComponent({
  name: "Header",

  components: {
    Drawer,
    SettingOutlined,
  },
  setup() {
    const isAdmin = isUserTheAdmin();

    return {
      isAdmin,
      logout,
    };
  },
});
</script>

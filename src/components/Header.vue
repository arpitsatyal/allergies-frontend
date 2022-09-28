<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Allergies Management"
  >
    <template #extra>
      <div class="headerFlex">
        <div>
          <a-button
            type="primary"
            style="width: 100px; margin-top: 8px"
            @click="showDrawer"
            >FAQ</a-button
          >
          <a-drawer
            v-model:visible="visible"
            class="custom-class"
            style="color: red"
            placement="right"
          >
            <FAQ />
          </a-drawer>
        </div>

        <div class="ml-20">
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
        </div>
      </div>
    </template>
  </a-page-header>
  <br />
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
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
    const visible = ref(false);
    const isAdmin = isUserTheAdmin();

    const showDrawer = () => (visible.value = true);

    return {
      router,
      isAdmin,
      visible,
      logout,
      showDrawer,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
.headerFlex {
  display: flex;
  justify-content: center;
}
</style>

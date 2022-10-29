<template>
  <div class="ml-10 cursor-pointer" @click="goBack">
    <RollbackOutlined style="font-size: 150%" />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
import { RollbackOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    RollbackOutlined,
  },
  setup() {
    const goBack = () => router.push("/dashboard");

    return {
      goBack,
    };
  },
});
</script>

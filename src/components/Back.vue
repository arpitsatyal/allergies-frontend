<template>
  <div class="ml-10 cursor-pointer" @click="goBack">
    <BackwardOutlined style="font-size: 200%" />
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/runtime-core";
import { BackwardOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    BackwardOutlined,
  },
  setup() {
    const goBack = () => router.push("/dashboard");

    return {
      goBack,
    };
  },
});
</script>

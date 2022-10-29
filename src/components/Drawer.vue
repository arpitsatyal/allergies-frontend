<template>
  <main>
    <div class="flex gap-2">
      <QuestionOutlined />
      <button @click="showDrawer" class="hover:text-blue-400">
        FAQ
      </button>
    </div>
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      placement="right"
    >
    <FAQ />
    </a-drawer>
  </main>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import { QuestionOutlined } from "@ant-design/icons-vue";
import FAQ from '../pages/FAQ.vue';

export default defineComponent({
  components: {
    FAQ,
    QuestionOutlined,
  },
  setup() {
    const visible = ref(false);
    const showDrawer = () => (visible.value = true);
    return {
      visible,
      showDrawer,
    };
  },
});
</script>

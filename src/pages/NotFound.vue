<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, this page is not available"
  >
    <template #extra>
      <GoBack />
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GoBack from "../components/Back.vue";

export default defineComponent({
  name: "NotFound",
  components: {
    GoBack,
  },
});
</script>

<template>
  <a-result status="404" title="404" sub-title="Sorry, this page is not available">
    <template #extra>
      <a-button type="primary" @click="goBack">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { goBack } from "@/composables/goBack";

export default defineComponent({
  name: "NotFound",
  setup() {
    return {
      goBack,
    };
  },
});
</script>

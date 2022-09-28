<template>
  <CreateAllergy :paramId="paramId" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import router from "@/router";
import CreateAllergy from "./CreateAllergy.vue";

export default defineComponent({
  components: {
    CreateAllergy,
  },
  setup() {
    return {
      paramId: router.currentRoute.value.params.id as string,
    };
  },
});
</script>

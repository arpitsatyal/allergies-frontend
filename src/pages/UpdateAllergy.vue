<template>
  <CreateAllergy :paramId="paramId" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateAllergy from "./CreateAllergy.vue";

export default defineComponent({
  components: {
    CreateAllergy,
  },
  setup() {
    const paramId = new URL(location.href).pathname.split("/")[2];
    return {
      paramId,
    };
  },
});
</script>

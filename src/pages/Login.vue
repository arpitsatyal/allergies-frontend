<template>
  <Signup :isLogin="true" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Signup from "./Signup.vue";

export default defineComponent({
  components: {
    Signup,
  },
});
</script>

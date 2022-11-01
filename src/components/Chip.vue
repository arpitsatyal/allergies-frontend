<template>
  <button
    class="bg-gray-100 w-fit text-black px-3 md:px-5 py-3 rounded-3xl text-sm hover:bg-gray-200 shadow-lg"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    textToRender: String,
  },
  setup(props) {
    return {
      text: props.textToRender,
    };
  },
});
</script>

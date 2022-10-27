<template>
  <button
    @click="onSubmitted"
    class="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
  >
    {{ textToRender }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    onSubmit: Function,
    text: String,
  },
  setup(props) {
    return {
      onSubmitted: props.onSubmit,
      textToRender: props.text,
    };
  },
});
</script>

<template>
  <div
    class="mt-12 text-sm font-display font-semibold text-gray-700 text-center"
  >
    {{ textOneToBeRendered }}
    <span class="cursor-pointer text-indigo-600 hover:text-indigo-800">
      <router-link :to="path">{{ textTwoToBeRendered }}</router-link>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    textOne: String,
    textTwo: String,
    path: String
  },
  setup(props) {
    return {
      textOneToBeRendered: props.textOne,
      textTwoToBeRendered: props.textTwo,
      pathToGo: props.path
    };
  },
});
</script>

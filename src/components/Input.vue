<template>
  <div class="mb-5">
    <div class="text-sm font-bold text-gray-700 tracking-wide mb-4">
      {{ label1 }}
    </div>
    <input
      v-model="vModel1"
      :name="name1"
      type="text"
      class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
      :placeholder="placeholder1"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: ['label', 'name', 'vModel', 'placeholder'],
  setup(props) {
    return {
      label1: props.label,
      name1: props.name,
      vModel1: props.vModel,
      placeholder1: props.placeholder
    };
  },
});
</script>

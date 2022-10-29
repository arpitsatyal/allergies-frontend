<template>
  <a-modal
    width="100%"
    wrap-class-name="full-modal"
    :title="name"
    class="text-center font-bold"
    cancelText="Close"
    @ok="handleClick"
  >
    <img :src="image" :alt="name" class="w-full" v-if="image" />
    <img src="@/assets/images/default.jpg" :alt="name" class="w-full" v-else />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    allergyImage: String,
    allergyName: String,
    handleOk: Function
  },
  setup(props) {
    return {
      image: props.allergyImage,
      name: props.allergyName,
      handleClick: props.handleOk
    };
  },
});
</script>

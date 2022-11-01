<template>
  <a-modal
    width="100%"
    wrap-class-name="full-modal"
    :title="name"
    cancelText="Close"
    @ok="handleClick"
  >
    <div class="py-3">
      <p v-html="allergyInfo"></p>
    </div>
    <img :src="image" :alt="name" class="w-full" v-if="image" />
    <img src="@/assets/images/default.jpg" :alt="name" class="w-full" v-else />
  </a-modal>
</template>

<script lang="ts">
import { toastError } from "@/utils/toastError";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import axios from "axios";

export default defineComponent({
  props: {
    allergyImage: String,
    allergyName: String,
    handleOk: Function,
  },
  setup(props) {
    let url = `https://en.wikipedia.org/w/api.php?origin=*`;

    const params = {
      action: "query",
      list: "search",
      srsearch: props.allergyName,
      format: "json",
    } as any;

    const allergyInfo = ref([]);
    Object.keys(params).forEach((key) => url += "&" + key + "=" + params[key]);

    async function fetchDetails() {
      try {
        const { data } = await axios.get(url);
        allergyInfo.value = data.query.search.map(
          (result: any) => result.snippet
        );
      } catch (e) {
        toastError(e);
      }
    }

    onMounted(() => fetchDetails());

    return {
      allergyInfo,
      image: props.allergyImage,
      name: props.allergyName,
      handleClick: props.handleOk,
    };
  },
});
</script>

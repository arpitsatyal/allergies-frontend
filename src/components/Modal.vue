<template>
  <a-modal
    width="100%"
    wrap-class-name="full-modal"
    :title="name"
    cancelText="Close"
    @ok="handleClick"
  >
    <div class="py-3">
      <!-- fetched data from wiki -->
    </div>
    <img :src="image" :alt="name" class="w-full" v-if="image" />
    <img src="@/assets/images/default.jpg" :alt="name" class="w-full" v-else />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";

export default defineComponent({
  props: {
    allergyImage: String,
    allergyName: String,
    handleOk: Function,
  },
  setup(props) {
    const allergyInfo = ref("");
    var url = "https://en.wikipedia.org/w/api.php";

    var params: any = {
      action: "query",
      list: "search",
      srsearch: props.allergyName,
      srprop: props.allergyName,
      format: "json",
    };

    function fetchDetails() {
      url = url + "?origin=*";
      Object.keys(params).forEach( (key) => url += "&" + key + "=" + params[key]);

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }

    onMounted(() => fetchDetails());

    return {
      image: props.allergyImage,
      name: props.allergyName,
      handleClick: props.handleOk,
    };
  },
});
</script>

<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <Header />
  <div class="my-20">
    <a-button type="primary" shape="round" :size="size">
      <router-link to="/add-allergy">Add Allergy</router-link>
    </a-button>
  </div>
  <section class="mt-30 card" v-if="allergies.length">
    <a-card hoverable style="width: 300px" :key="allergy.id" v-for="allergy in allergies">
      <template #cover>
        <img
          alt="example"
          :src="allergy.image"
          v-if="allergy.image"
          height="200"
          @click="goToProfile(allergy.id)"
        />
        <img
          alt="example"
          src="@/assets/images/default.jpg"
          v-else
          height="200"
          @click="goToProfile(allergy.id)"
        />
      </template>
      <template class="ant-card-actions" #actions>
        <router-link :to="{ name: 'UpdateAllergy', params: { id: allergy.id } }">
          <EditOutlined />
        </router-link>

        <div>
          <EyeOutlined v-if="allergy.highRisk" @click="markAsHighRisk(allergy, false)" />
          <EyeInvisibleOutlined v-else @click="markAsHighRisk(allergy, true)" />
        </div>

        <DeleteOutlined key="ellipsis" @click="deleteAllergy(allergy.id)" />
      </template>
      <a-card-meta :title="allergy.name" :description="allergy.severity">
        <template #avatar> </template>
      </a-card-meta>
    </a-card>
  </section>
  <div v-else>
    <Loading v-if="isLoading" />
    <a-empty v-else class="mt-90" />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import type { SizeType } from "ant-design-vue/es/config-provider";
import {
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";

import { logout } from "../utils/logout";
import Header from "@/components/Header.vue";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";
import router from "@/router";
import { IAllergyResponse } from "@/types/allergies";
import { allergiesService } from "@/services/allergies";

export default defineComponent({
  name: "Dashboard",
  components: {
    Header,
    Loading,
    EditOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
  },
  setup() {
    const toast = useToast();
    const store = useStore();
    const isLoading = ref<boolean>(false);
    const size = ref<SizeType>("large");
    const allergies = ref<IAllergyResponse[]>([]);

    function fetchAllAllergies() {
      isLoading.value = true;
      allergiesService
        .getAllergies()
        .then((data) => {
          isLoading.value = false;
          allergies.value = data;
          store.commit("addAllergiesToState", data);
        })
        .catch((err) => {
          isLoading.value = false;
          toastError(err);
          logout(3000);
        });
    }

    function deleteAllergy(id: number) {
      if (confirm("are you sure you want to delete this allergy?")) {
        allergiesService
          .deleteAllergy(id)
          .then(() => {
            toast.warning("Allergy deleted.");
            fetchAllAllergies();
          })
          .catch((err) => toastError(err));
      }
    }

    function markAsHighRisk(allergy: IAllergyResponse, body: boolean) {
      allergiesService
        .markAsHighRisk(body, allergy.id)
        .then(() => {
          if (body) {
            toast.success(`Allergy ${allergy.name} marked as high risk.`);
            fetchAllAllergies();
          } else {
            toast.warning(`Allergy ${allergy.name} un-marked as high risk.`);
            fetchAllAllergies();
          }
        })
        .catch((err) => toastError(err));
    }

    function goToProfile(id: number) {
      router.push(`/profile/${id}`);
    }

    onMounted(() => fetchAllAllergies());

    return {
      toast,
      isLoading,
      allergies,
      size,
      deleteAllergy,
      markAsHighRisk,
      goToProfile,
    };
  },
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
</style>

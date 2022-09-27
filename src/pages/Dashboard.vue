<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <Header />
  <div class="my-20">
    <a-button type="primary" shape="round" :size="size">
      <router-link to="/add-allergy">Add Allergy</router-link>
    </a-button>
  </div>
  <div class="mt-30 center">
    <a-form-item name="searchTerm">
      <a-input
        v-model:value="searchTerm"
        placeholder="Search..."
        :size="size"
        style="width: 50%; border: 1px solid black"
      />
    </a-form-item>
  </div>
  <section class="mt-30 card" v-if="searchedAllergies.length">
    <a-card
      hoverable
      style="width: 300px"
      :key="allergy.id"
      v-for="allergy in searchedAllergies"
    >
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
          <RiseOutlined v-if="allergy.highRisk" @click="markAsHighRisk(allergy, false)" />
          <FallOutlined v-else @click="markAsHighRisk(allergy, true)" />
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
  <div class="mt-30 center">
    <a-pagination
      v-if="total"
      show-size-changer
      v-model:current="page"
      v-model:pageSize="pageSize"
      :total="total + 1"
    />
    <a-spin v-else />
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import type { SizeType } from "ant-design-vue/es/config-provider";
import { defineComponent, ref, onMounted, computed, watch } from "@vue/runtime-core";
import {
  EditOutlined,
  DeleteOutlined,
  RiseOutlined,
  FallOutlined,
} from "@ant-design/icons-vue";

import router from "@/router";
import Header from "@/components/Header.vue";
import { debounce } from "../utils/debounce";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";
import { IAllergyResponse } from "@/types/allergies";
import { allergiesService } from "@/services/allergies";

export default defineComponent({
  name: "Dashboard",
  components: {
    Header,
    Loading,
    EditOutlined,
    DeleteOutlined,
    RiseOutlined,
    FallOutlined,
  },
  setup() {
    const toast = useToast();
    const store = useStore();
    const searchTerm = ref("");
    const size = ref<SizeType>("large");

    const total = ref<number | null>(null);
    const page = ref(1);
    const pageSize = ref(1);

    const isLoading = computed(() => store.state.allergies.isLoading);
    const allergies = computed(() => store.state.allergies.allAllergies);

    const fetchAllAllergies = () =>
      store.dispatch("allergies/fetchAllergies", {
        pageSize: pageSize.value,
        page: page.value,
      });

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

    function markAsHighRisk(allergy: IAllergyResponse, isHighRisk: boolean) {
      allergiesService
        .markAsHighRisk(isHighRisk, allergy.id)
        .then(() => {
          if (isHighRisk) {
            toast.success(`Allergy ${allergy.name} marked as high risk.`);
          } else {
            toast.warning(`Allergy ${allergy.name} un-marked as high risk.`);
          }
          fetchAllAllergies();
        })
        .catch((err) => toastError(err));
    }

    const goToProfile = (id: number) => router.push(`/profile/${id}`);

    onMounted(() => {
      fetchAllAllergies();
      findTotal();
    });

    const searchedAllergies = computed(() => {
      return allergies.value.filter((allergy: IAllergyResponse) => {
        if (allergy.name.includes(searchTerm.value.toLowerCase())) {
          return allergy;
        }
      });
    });

    function findTotal() {
      allergiesService
        .getAllergies(1, 100)
        .then((data) => (total.value = data.length))
        .catch((err) => toastError(err));
    }

    watch([page, pageSize], () => {
      store.dispatch("allergies/fetchAllergies", {
        pageSize: pageSize.value,
        page: page.value,
      });
    });

    watch(
      searchTerm,
      debounce(() => store.dispatch("allergies/searchAllergies", searchTerm.value))
    );

    return {
      toast,
      isLoading,
      searchedAllergies,
      size,
      searchTerm,
      page,
      pageSize,
      total,
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
</style>

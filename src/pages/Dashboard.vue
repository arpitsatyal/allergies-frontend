<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <Header />
  <div class="my-20">
    <a-button type="primary" shape="round" :size="size">
      <router-link to="/add-allergy">Add Allergy</router-link>
    </a-button>
    <h2 class="center" v-if="currentUser">
      Welcome,
      <span v-if="isAdmin">admin ;)</span>
      {{ currentUser }}
    </h2>
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
          @click="router.push(`/profile/${allergy.id}`)"
        />
        <img
          alt="example"
          src="@/assets/images/default.jpg"
          v-else
          height="200"
          @click="router.push(`/profile/${allergy.id}`)"
        />
      </template>
      <template class="ant-card-actions" #actions>
        <router-link :to="{ name: 'UpdateAllergy', params: { id: allergy.id } }">
          <EditOutlined />
        </router-link>

        <div id="components-a-tooltip-demo-color">
          <a-tooltip title="use this button to change risks." color="pink">
            <RiseOutlined
              v-if="allergy.highRisk"
              @click="markAsHighRisk(allergy, false)"
            />
            <FallOutlined v-else @click="markAsHighRisk(allergy, true)" />
          </a-tooltip>
        </div>

        <a-popconfirm
          title="Are you sure you want to delete this allergy?"
          @confirm="deleteAllergy(allergy.id)"
        >
          <DeleteOutlined key="ellipsis" />
        </a-popconfirm>
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
import { ToastService } from "@/services/toast";
import { toastError } from "../utils/toastError";
import { IAllergyResponse } from "@/types/allergies";
import { isUserTheAdmin } from "@/composables/isAdmin";
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
    const store = useStore();
    const toast = new ToastService();
    const isAdmin = isUserTheAdmin();

    const page = ref(1);
    const total = ref(0);
    const pageSize = ref(1);
    const searchTerm = ref("");
    const size = ref<SizeType>("large");

    const currentUser = computed(() => store.state.auth.user.name);
    const isLoading = computed(() => store.state.allergies.isLoading);
    const allergies = computed(() => store.state.allergies.allAllergies);

    const fetchAllAllergies = () =>
      store.dispatch("allergies/fetchAllergies", {
        pageSize: pageSize.value,
        page: page.value,
      });

    function deleteAllergy(id: number) {
      allergiesService
        .deleteAllergy(id)
        .then(() => {
          toast.warning("Allergy deleted.");
          fetchAllAllergies();
        })
        .catch((err) => toastError(err));
    }

    function markAsHighRisk(allergy: IAllergyResponse, isHighRisk: boolean) {
      allergiesService
        .markAsHighRisk(isHighRisk, allergy.id)
        .then(() => {
          isHighRisk
            ? toast.success(`${allergy.name} is now marked as high risk.`)
            : toast.warning(`${allergy.name} is no longer marked as high risk.`);
          fetchAllAllergies();
        })
        .catch((err) => toastError(err));
    }

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
      currentUser,
      isAdmin,
      router,
      deleteAllergy,
      markAsHighRisk,
    };
  },
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>

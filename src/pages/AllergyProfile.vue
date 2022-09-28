<template>
  <Header />
  <div v-if="allergy.name">
    <section class="profile">
      <header class="header">
        <div class="center flex">
          <div>
            <img
              v-if="allergy.image"
              :src="allergy.image"
              :alt="allergy.name"
              class="profile-pic"
            />
            <img
              v-else
              src="@/assets/images/default.jpg"
              :alt="allergy.name"
              class="profile-pic"
            />
            <h1 class="heading pt-7">{{ allergy.name }}</h1>
          </div>
          <div>
            <a-progress type="circle" :percent="mapSeverity[allergy.severity]" />
            <h2 class="heading">Severity: {{ allergy.severity }}</h2>
          </div>
        </div>
      </header>
    </section>

    <section>
      <h2 class="center mx-20">Symptoms</h2>
      <template v-if="allergy.symptoms && allergy.symptoms.length">
        <table>
          <thead class="center">
            <tr class="table-headers">
              <th>Name</th>
              <th>Date added</th>
            </tr>
          </thead>
          <template :key="alg" v-for="alg in allergy.symptoms">
            <tbody class="center">
              <td>{{ alg }}</td>
              <td>{{ parseDate(allergy.createdAt) }}</td>
            </tbody>
          </template>
        </table>
      </template>
      <p v-else class="center">There are no symptoms added for this allergy yet.</p>
    </section>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";

import router from "@/router";
import Header from "../components/Header.vue";
import { parseDate } from "../utils/parseDate";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";
import { IAllergyResponse } from "@/types/allergies";
import { allergiesService } from "@/services/allergies";

export default defineComponent({
  components: {
    Header,
    Loading,
  },
  setup() {
    const allergy = ref<IAllergyResponse>({
      name: "",
      severity: "",
      symptoms: [],
      image: "",
      highRisk: false,
      createdAt: new Date(),
      id: 0,
    });
    const paramId = router.currentRoute.value.params.id as string;

    const mapSeverity = ref<any>({
      Low: 25,
      Medium: 50,
      High: 75,
    });

    function getAllergy() {
      allergiesService
        .getAllergy(+paramId)
        .then((data) => (allergy.value = data))
        .catch((err) => toastError(err));
    }

    onMounted(() => getAllergy());

    return {
      paramId,
      allergy,
      mapSeverity,
      parseDate,
      getAllergy,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
</style>

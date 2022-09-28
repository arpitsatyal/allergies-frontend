<template>
  <Header />
  <a-button type="primary" class="mb-20 ml-20" @click="goBack">Go Back</a-button>
  <div v-if="allergy.name" class="relative">
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
      <h3 class="center mx-20">Symptoms</h3>
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

    <h3 class="center mx-30">Comments</h3>
    <p class="center" v-if="!allergy.comments.length">
      You can add comments regarding the allergy here.
    </p>
    <div class="absolute comments">
      <div v-if="allergy.comments.length">
        <a-comment v-for="comment in allergy.comments" :key="comment">
          <template #author
            ><p class="fw-14">{{ comment.addedBy }}</p></template
          >
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" :alt="comment.addedBy" />
          </template>
          <template #content>
            <p class="fw-14">
              {{ comment.comment }}
            </p>
          </template>

          <template #datetime>
            <a-tooltip>
              <span style="color: #4ecdc4" class="fw-14">{{
                parseDate(comment.createdAt)
              }}</span>
            </a-tooltip>
          </template>
        </a-comment>
      </div>

      <a-form-item name="comment" class="mt-20 relative">
        <a-textarea
          v-model:value="comment"
          placeholder="Please add your comment"
          allow-clear
        />
        <a-button type="primary" class="ml-10" v-if="loading" loading>Loading</a-button>
        <a-button
          type="primary"
          class="ml-10 absolute"
          style="top: 20px"
          @click="addComment"
          >Add</a-button
        >
      </a-form-item>
    </div>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";

import router from "@/router";
import Header from "../components/Header.vue";
import { parseDate } from "../utils/parseDate";
import { goBack } from "@/composables/goBack";
import Loading from "../components/Loading.vue";
import { ToastService } from "@/services/toast";
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
      comments: [],
      userId: 0,
    });

    const comment = ref("");
    const loading = ref(false);
    const toast = new ToastService();
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

    function addComment() {
      loading.value = true;
      allergiesService
        .addComment(comment.value, +paramId)
        .then(() => {
          loading.value = false;
          comment.value = "";
          toast.success("comment added successfully");
          getAllergy();
        })
        .catch((err) => {
          loading.value = false;
          toastError(err);
        });
    }

    onMounted(() => getAllergy());

    return {
      paramId,
      allergy,
      comment,
      loading,
      mapSeverity,
      goBack,
      parseDate,
      getAllergy,
      addComment,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
.comments {
  margin: 0;
  left: 25%;
  transform: translateY(-2%);
}
</style>

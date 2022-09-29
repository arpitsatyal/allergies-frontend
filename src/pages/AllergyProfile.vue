<template>
  <Header />
  <div class="mb-10">
    <a-button type="primary" class="ml-20" @click="goBack">Go Back</a-button>
    <h1 class="heading pt-7 inline-block center" style="margin-left: 38vw">
      {{ allergy.name }}
    </h1>
  </div>
  <div v-if="allergy.name" class="relative">
    <section class="profile">
      <header class="header">
        <div class="center">
          <a-progress type="circle" :percent="mapSeverity[allergy.severity]" />
          <h2 class="heading">Severity: {{ allergy.severity }}</h2>
        </div>
      </header>
    </section>

    <div class="main">
      <div class="symptomsDiv">
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
          <h3 :style="{ margin: '15px' }">Symptoms</h3>
        </div>
        <div v-if="allergy.symptoms.length" class="mt-20">
          <a-list size="large" bordered :data-source="allergy.symptoms">
            <template #renderItem="{ item }">
              <a-list-item>{{ item }}</a-list-item>
            </template>
          </a-list>
        </div>
        <p class="center mt-30 ml-10" v-else>
          no symptoms have been added for this allergy yet.
        </p>
      </div>

      <div class="commentsDiv">
        <h3 class="center mx-30 mr-120">Comments</h3>
        <p class="center mr-120" v-if="!allergy.comments.length">
          You can add comments regarding the allergy here.
        </p>
        <div class="absolute comments">
          <div v-if="allergy.comments.length">
            <a-comment v-for="comment in allergy.comments" :key="comment">
              <template #author
                ><p class="fw-16">{{ comment.addedBy.name }}</p></template
              >
              <template #avatar>
                <a-avatar
                  src="https://joeschmoe.io/api/v1/random"
                  :alt="comment.addedBy.name"
                />
              </template>
              <template #content>
                <div class="commentFlex">
                  <p
                    class="fw-14 overflow-auto text-justify"
                    v-if="comment.comment.length > 500"
                  >
                    {{ comment.comment.substring(0, 500) }}....
                  </p>
                  <p class="fw-14 overflow-auto text-justify" v-else>
                    {{ comment.comment }}
                  </p>

                  <DeleteOutlined
                    v-if="currentUser === comment.addedBy.id"
                    @click="deleteComment(comment.comment)"
                    class="ml-20"
                  />
                </div>
              </template>

              <template #datetime>
                <a-tooltip>
                  <span style="color: #4ecdc4" class="fw-14">{{
                    dayjs(comment.createdAt).fromNow()
                  }}</span>
                </a-tooltip>
              </template>
            </a-comment>
          </div>

          <a-form-item name="comment" class="mt-20 relative">
            <a-textarea
              v-model:value="comment"
              style="width: 100%"
              placeholder="add your comment"
              allow-clear
            />
            <a-button
              type="primary"
              class="ml-10 absolute"
              style="top: 20px"
              v-if="loading"
              loading
              >Loading</a-button
            >
            <a-button
              type="primary"
              v-else
              class="ml-10 absolute"
              style="top: 20px"
              @click="addComment"
              >Add</a-button
            >
          </a-form-item>
        </div>
      </div>
    </div>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import dayjs from "dayjs";
import { notification } from "ant-design-vue";
import relativeTime from "dayjs/plugin/relativeTime";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";

import router from "@/router";
import Header from "../components/Header.vue";
import { goBack } from "@/composables/goBack";
import { getFromStore } from "@/utils/store";
import Loading from "../components/Loading.vue";
import { toastError } from "../utils/toastError";
import { IAllergyResponse } from "@/types/allergies";
import { allergiesService } from "@/services/allergies";
dayjs.extend(relativeTime);

export default defineComponent({
  components: {
    Header,
    Loading,
    DeleteOutlined,
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
    const currentUser = getFromStore("user");
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
        .catch((err) => {
          toastError(err);
          router.push("/dashboard");
        });
    }

    function addComment() {
      loading.value = true;
      allergiesService
        .addComment(comment.value, +paramId)
        .then(() => {
          loading.value = false;
          comment.value = "";
          notification.success({ message: "Comment added!" });
          getAllergy();
        })
        .catch((err) => {
          loading.value = false;
          toastError(err);
        });
    }

    function deleteComment(comment: string) {
      loading.value = true;
      allergiesService
        .deleteComment(comment, +paramId)
        .then(() => {
          loading.value = false;
          notification.error({ message: "Comment deleted!" });
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
      currentUser,
      dayjs,
      goBack,
      getAllergy,
      addComment,
      deleteComment,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
@import "../assets/profile.scss";
.comments {
  margin: 0;
  width: 60%;
  left: 25%;
  transform: translateY(-2%);
}
.commentFlex {
  display: flex;
  justify-content: space-between;
}
.main {
  display: flex;
  box-sizing: border-box;

  .commentsDiv {
    width: 80%;
    margin-top: 10px;
  }
  .symptomsDiv {
    width: 20%;
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>

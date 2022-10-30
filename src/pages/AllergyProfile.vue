<template>
  <Header />
  <GoBack />
  <h1 class="font-bold text-center mb-5">
    {{ allergy.name }}
  </h1>
  <div v-if="allergy.name">
    <section
      class="bg-green-300 h-60 mt-4 flex flex-col space-y-5 justify-center items-center"
    >
      <a-progress type="circle" :percent="mapSeverity[allergy.severity]" />
      <h2 class="heading">Severity: {{ allergy.severity }}</h2>
    </section>

    <main class="flex flex-col md:flex-row mt-4">
      <div
        id="img-symp"
        class="px-1 md:px-4 w-screen md:w-1/4 md:flex-shrink-0"
      >
        <div id="img">
          <img
            v-if="allergy.image"
            :src="allergy.image"
            :alt="allergy.name"
            class="w-full h-60 object-cover cursor-pointer"
            @click="showModal"
          />
          <img
            v-else
            src="@/assets/images/default.jpg"
            :alt="allergy.name"
            @click="showModal"
            class="w-full h-60 object-cover cursor-pointer"
          />
          <ImageModal
             v-model:visible="visible"
            :allergyImage="allergy.image"
            :allergyName="allergy.name"
            :handleOk="handleOk"
          />
        </div>
        <div id="symp" class="mt-4">
          <h3 class="font-bold text-center my-5">Symptoms</h3>
          <div v-if="allergy.symptoms.length" class="mb-0 md:mb-5">
            <a-list size="large" bordered :data-source="allergy.symptoms">
              <template #renderItem="{ item }">
                <a-list-item>{{ item }}</a-list-item>
              </template>
            </a-list>
          </div>
          <p class="text-sm" v-else>
            no symptoms have been added for this allergy yet.
          </p>
        </div>
      </div>

      <div id="comments" class="md:flex-grow p-6">
        <h3 class="font-bold text-center md:text-left">Comments</h3>

        <div v-if="allergy.comments.length">
          <a-comment v-for="comment in allergy.comments" :key="comment">
            <template #avatar>
              <a-avatar
                src="https://joeschmoe.io/api/v1/random"
                :alt="comment.addedBy.name"
              />
            </template>
            <template #author
              ><p class="font-bold text-sm">
                {{ comment.addedBy.name }}
              </p>
            </template>
            <template #content>
              <div class="flex justify-between py-2">
                <p
                  class="text-justify w-11/12"
                  v-if="comment.comment.length > 500 && !seeMore"
                >
                  {{ comment.comment.substring(0, 500) }}
                  <span @click="handleSee" class="text-pink-500 cursor-pointer"
                    >see more</span
                  >
                </p>

                <p class="text-justify w-11/12" v-else-if="comment.comment.length > 500 && seeMore">
                  {{ comment.comment.substring(0, comment.comment.length) }}

                  <span @click="handleSee" class="text-pink-500 cursor-pointer"
                    >see less</span
                  >
                </p>

                <p v-else>
                  {{ comment.comment }}
                </p>

                <div class="mr-0 md:mr-10">
                  <DeleteOutlined
                    v-if="currentUser === comment.addedBy.id"
                    @click="deleteComment(comment)"
                  />
                </div>
              </div>
            </template>
            <template #datetime>
              <a-tooltip>
                <span class="text-sm text-blue-500">{{
                  dayjs(comment.createdAt).fromNow()
                }}</span>
              </a-tooltip>
            </template>
          </a-comment>
        </div>
        <p class="py-3 text-center md:text-left text-sm" v-else>
          You can add comments regarding the allergy here.
        </p>
        <div class="flex">
          <a-form-item name="comment" class="flex-1">
            <a-textarea
              class=""
              v-model:value="comment"
              placeholder="add your comment"
              allow-clear
            />
          </a-form-item>
          <div class="m-2">
            <a-button type="primary" class="" v-if="loading" loading
              >Loading</a-button
            >
            <a-button type="primary" v-else @click="addComment">Add</a-button>
          </div>
        </div>
      </div>
    </main>
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
import { getFromStore } from "@/utils/store";
import GoBack from "../components/Back.vue";
import Header from "../components/Header.vue";
import Loading from "../components/Loading.vue";
import ImageModal from "../components/Modal.vue";
import { toastError } from "../utils/toastError";
import { allergiesService } from "@/services/allergies";
import { IAllergyResponse, IComment } from "@/types/allergies";

dayjs.extend(relativeTime);

export default defineComponent({
  components: {
    GoBack,
    Header,
    Loading,
    ImageModal,
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
    const seeMore = ref(false);
    const visible = ref(false);
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
      if (comment.value) {
        allergiesService
          .addComment(comment.value, +paramId)
          .then(() => {
            comment.value = "";
            notification.success({ message: "Comment added!" });
            getAllergy();
          })
          .catch((err) => {
            toastError(err);
          })
          .finally(() => (loading.value = false));
      } else {
        loading.value = false;
        notification.warning({ message: "please add a valid comment!" });
      }
    }

    function deleteComment(commentData: Omit<IComment, "addedBy">) {
      const { comment, createdAt } = commentData;
      loading.value = true;
      allergiesService
        .deleteComment({ comment, createdAt }, +paramId)
        .then(() => {
          notification.error({ message: "Comment deleted!" });
          getAllergy();
        })
        .catch((err) => toastError(err))
        .finally(() => (loading.value = false));
    }

    const handleSee = () => (seeMore.value = !seeMore.value);

    const showModal = () => (visible.value = true);

    const handleOk = () => (visible.value = false);

    onMounted(() => getAllergy());

    return {
      paramId,
      allergy,
      comment,
      loading,
      mapSeverity,
      currentUser,
      dayjs,
      seeMore,
      visible,
      handleSee,
      getAllergy,
      addComment,
      deleteComment,
      handleOk,
      showModal,
    };
  },
});
</script>

<template>
  <Header />
    <GoBack />
  <h2 class="font-bold text-center pt-5">
    {{ paramId ? "Edit Allergy" : "Add a New Allergy" }}
  </h2>
  <section class="mt-10 w-screen overflow-hidden">
    <a-form
      class=""
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finish="onFinish"
    >
      <div class="flex flex-col justify-center items-center">
        <div class="w-10/12 md:w-1/2">
          <a-form-item
            label="Name"
            name="name"
            :rules="[
              !paramId && {
                required: true,
                message: 'Please input the name!',
              },
            ]"
          >
            <a-input
              v-model:value="formState.name"
              placeholder="Please add a name"
              :defaultValue="currentAllergy && currentAllergy.name"
            />
          </a-form-item>
        </div>

        <div class="w-10/12 md:w-1/2">
          <a-form-item
            name="severity"
            label="Severity"
            has-feedback
            :rules="[
              !paramId && {
                required: true,
                message: 'Please select a severity!',
              },
            ]"
          >
            <a-select
              v-model:value="formState.severity"
              placeholder="Please select a severity"
              :defaultValue="currentAllergy && currentAllergy.severity"
            >
              <a-select-option value="Low">Low</a-select-option>
              <a-select-option value="Medium">Medium</a-select-option>
              <a-select-option value="High">High</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <div class="w-10/12 md:w-1/2">
          <a-form-item name="symptoms" label="Symptoms">
            <a-select
              v-model:value="formState['symptoms']"
              mode="multiple"
              placeholder="Please select symptoms"
              :defaultValue="currentAllergy && currentAllergy.symptoms"
            >
              <template :key="symptomp" v-for="symptomp in symptomsList">
                <a-select-option :value="symptomp">{{
                  symptomp
                }}</a-select-option>
              </template>
            </a-select>
          </a-form-item>
        </div>

        <div class="w-10/12 md:w-1/2">
          <a-form-item name="image" label="Image">
            <a-upload
              :action="imageUrl"
              :headers="headers"
              v-model:fileList="formState.image"
              @change="handleChange"
              name="image"
              list-type="picture"
            >
              <a-button>
                <template #icon><UploadOutlined /></template>
                Click to upload
              </a-button>
            </a-upload>
          </a-form-item>
        </div>

        <div class="w-10/12 md:w-1/4 md:ml-16">
          <a-button class="w-full" type="primary" v-if="loading" loading
            >Loading</a-button
          >
          <a-button class="w-full" type="primary" v-else html-type="submit"
            >Submit</a-button
          >
        </div>
      </div>
    </a-form>
  </section>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, watch, computed } from "vue";

import router from "@/router";
import GoBack from '../components/Back.vue';
import Header from "@/components/Header.vue";
import { getFromStore } from "../utils/store";
import { ToastService } from "@/services/toast";
import { toastError } from "../utils/toastError";
import { allergiesService } from "@/services/allergies";
import { IAllergy, IAllergyResponse } from "@/types/allergies";

export default defineComponent({
  props: {
    paramId: {
      type: String,
    },
  },
  components: {
    GoBack,
    Header,
    UploadOutlined,
  },
  setup(props) {
    const toast = new ToastService();
    const loading = ref<boolean>(false);

    let iData: string;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const symptomsList = [
      "Fever",
      "Vomit",
      "Nausea",
      "Headache",
      "Stomach Pain",
    ];

    const store = useStore();

    const imageUrl = ref<string>(
      process.env.VUE_APP_API_URL + "/allergies/upload-image"
    );
    const headers = ref({
      Authorization: `Bearer ${getFromStore("token")}`,
    });

    const formState = reactive<Record<string, any>>({});

    function handleChange(info: any) {
      if (info.file.status === "done") {
        iData = info.file.response;
      } else if (info.file.status === "error") {
        toast.error(info.file.response.error ?? "error uploading image.");
      }
    }

    const onFinish = (values: IAllergy) => {
      loading.value = true;
      if (props.paramId) {
        allergiesService
          .updateAllergy({ ...values, image: iData }, +props.paramId)
          .then(() => {
            toast.success("Allergy updated successfully...");
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            toastError(err);
          })
          .finally(() => loading.value = false);
      } else {
        allergiesService
          .addAllergy({ ...values, image: iData })
          .then(() => {
            toast.success("Allergy created successfully...");
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            toastError(err);
          })
          .finally(() => loading.value = false);
      }
    };

    const matchedAllergy = computed(() => {
      return store.state.allergies.allAllergies.filter(
        (allergy: IAllergyResponse) => {
          if (props.paramId) {
            if (allergy.id === +props.paramId) {
              return allergy;
            }
          }
        }
      );
    });

    return {
      loading,
      symptomsList,
      formState,
      currentAllergy: matchedAllergy.value[0] as IAllergyResponse,
      imageUrl,
      headers,
      formItemLayout,
      onFinish,
      handleChange,
    };
  },
});
</script>

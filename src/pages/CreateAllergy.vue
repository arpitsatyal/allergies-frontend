<template>
  <Header />
  <a-button type="primary" style="margin-left: 50px" @click="goBack">Go Back</a-button>
  <h2 class="center">
    {{ paramId ? "Edit Allergy" : "Add a New Allergy" }}
  </h2>
  <section class="mt-30">
    <a-form
      class="allergyForm"
      :model="formState"
      name="validate_other"
      v-bind="formItemLayout"
      @finish="onFinish"
    >
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

      <a-form-item
        name="severity"
        label="Severity"
        has-feedback
        :rules="[!paramId && { required: true, message: 'Please select a severity!' }]"
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

      <a-form-item name="symptoms" label="Symptoms">
        <a-select
          v-model:value="formState['symptoms']"
          mode="multiple"
          placeholder="Please select symptoms"
          :defaultValue="currentAllergy && currentAllergy.symptoms"
        >
          <template :key="symptomp" v-for="symptomp in symptomsList">
            <a-select-option :value="symptomp">{{ symptomp }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>

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

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button type="primary" v-if="loading" loading>Loading</a-button>
        <a-button type="primary" v-else html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, ref, watch, computed } from "vue";

import router from "@/router";
import { debounce } from "@/utils/debounce";
import Header from "@/components/Header.vue";
import { getFromStore } from "../utils/store";
import { goBack } from "../composables/goBack";
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
    UploadOutlined,
    Header,
  },
  setup(props) {
    const toast = new ToastService();
    const loading = ref<boolean>(false);

    let iData: string;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const symptomsList = ["Fever", "Vomit", "Nausea", "Headache", "Stomach Pain"];

    const store = useStore();

    const imageUrl = ref<string>(process.env.VUE_APP_API_URL + "/allergies/upload-image");
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
      const { image, ...allergyData } = values;
      if (props.paramId) {
        allergiesService
          .updateAllergy({ ...allergyData, image: iData }, +props.paramId)
          .then(() => {
            loading.value = false;
            toast.success("Allergy updated successfully...");
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            loading.value = false;
            toastError(err);
          });
      } else {
        allergiesService
          .addAllergy({ ...allergyData, image: iData })
          .then(() => {
            loading.value = false;
            toast.success("Allergy created successfully...");
            setTimeout(() => router.push("/dashboard"), 1000);
          })
          .catch((err) => {
            loading.value = false;
            toastError(err);
          });
      }
    };

    const matchedAllergy = computed(() => {
      return store.state.allergies.allAllergies.filter((allergy: IAllergyResponse) => {
        if (props.paramId) {
          if (allergy.id === +props.paramId) {
            return allergy;
          }
        }
      });
    });

    watch(
      formState,
      debounce(() => {
        if (formState.name) {
          store.dispatch("allergies/searchAllergies", formState.name);
          const allNamedAllergies = store.state.allergies.allAllergies.map(
            (allergy: IAllergyResponse) => allergy.name
          );
          if (allNamedAllergies.includes(formState.name.toLowerCase())) {
            toast.warning("this allergy is already added!");
          }
        }
      })
    );

    return {
      loading,
      symptomsList,
      formState,
      currentAllergy: matchedAllergy.value[0] as IAllergyResponse,
      imageUrl,
      headers,
      formItemLayout,
      goBack,
      onFinish,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
@import "../assets/global.scss";
</style>

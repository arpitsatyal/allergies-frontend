import { shallowMount } from "@vue/test-utils";
import AllergyForm from "../pages/CreateAllergy.vue";

describe("AllergyForm.vue", () => {
  it("renders the correct title when `paramId` is not set", () => {
    const wrapper = shallowMount(AllergyForm);

    expect(wrapper.find("h2").text()).toBe("Add a New Allergy");
  });

  it("renders the correct title when `paramId` is set", () => {
    const wrapper = shallowMount(AllergyForm);

    expect(wrapper.find("h2").text()).toBe("Edit Allergy");
  });

  it("calls `onFinish` when form is submitted", () => {
    const wrapper = shallowMount(AllergyForm);
    const onFinish = jest.fn();

    wrapper.find("a-form").trigger("finish");

    expect(onFinish).toHaveBeenCalled();
  });

  it("displays a loading button while `loading` prop is true", () => {
    const wrapper = shallowMount(AllergyForm);

    expect(wrapper.find("a-button[loading]").exists()).toBe(true);
  });
});

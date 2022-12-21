import { mount } from '@vue/test-utils'
import Signup from '../pages/Signup.vue'
import { useStore } from "vuex";

describe('Allergies Manegement Application', () => {
  it('renders the title', () => {
    const wrapper = mount(Signup)
    expect(wrapper.find('#title').text()).toBe('Allergies Manegement Application')
  })

  it('renders the form', () => {
    const wrapper = mount(Signup)
    expect(wrapper.find('#form').exists()).toBe(true)
  })

  it('renders the login form when isLogin is true', () => {
    const wrapper = mount(Signup)
    wrapper.setData({ isLogin: true })
    expect(wrapper.find('form h2').text()).toBe('Login')
  })

  it('renders the sign up form when isLogin is false', () => {
    const wrapper = mount(Signup)
    wrapper.setData({ isLogin: false })
    expect(wrapper.find('form h2').text()).toBe('Sign up')
  })
})
it("calls the correct action when the form is submitted", () => {
  const mockStore = {
    dispatch: jest.fn(),
  };
  (useStore as jest.Mock).mockReturnValue(mockStore);

  const createUserMock = jest.fn().mockResolvedValue({});
  const loginUserMock = jest.fn().mockResolvedValue({});

  const wrapper = mount(Signup);
  wrapper.setMethods({ createUser: createUserMock, loginUser: loginUserMock });

  // Set the component data
  wrapper.setData({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
    isLogin: false,
  });

  // Trigger the onSubmit method
  wrapper.find("form").trigger("submit.prevent");

  expect(createUserMock).toHaveBeenCalledWith({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  });
  expect(loginUserMock).not.toHaveBeenCalled();
});

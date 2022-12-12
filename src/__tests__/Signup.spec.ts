import { mount } from '@vue/test-utils'
import Signup from '../pages/Signup.vue'

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
import { shallowMount } from '@vue/test-utils'
import Dashboard from '../pages/Dashboard.vue'

describe('Dashboard component', () => {
  it('should render the correct elements', () => {
    const wrapper = shallowMount(Dashboard)
    expect(wrapper.find('Header').exists()).toBe(true)
    expect(wrapper.find('a-button').exists()).toBe(true)
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('a-form-item').exists()).toBe(true)
    expect(wrapper.find('a-input').exists()).toBe(true)
    expect(wrapper.find('section').exists()).toBe(true)
    expect(wrapper.find('a-card').exists()).toBe(true)
    expect(wrapper.find('a-tooltip').exists()).toBe(true)
    expect(wrapper.find('a-popconfirm').exists()).toBe(true)
    expect(wrapper.find('Loading').exists()).toBe(true)
    expect(wrapper.find('a-empty').exists()).toBe(true)
    expect(wrapper.find('a-pagination').exists()).toBe(true)
  })  

  it('should not render the `Add Allergy` button if the current user is not an admin', () => {
    const wrapper = shallowMount(Dashboard);
    wrapper.setData({ isAdmin: false });
    expect(wrapper.find('a-button').exists()).toBe(false);
  });
})


  

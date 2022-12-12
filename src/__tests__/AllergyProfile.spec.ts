import { shallowMount } from '@vue/test-utils'
import Allergy from '../pages/AllergyProfile.vue'

describe('Allergy.vue', () => {
  it('renders allergy name', () => {
    const allergy = {
      name: 'Peanut allergy',
      severity: 'Severe',
      image: 'https://example.com/peanut-allergy.jpg',
      symptoms: ['Sneezing', 'Rash', 'Difficulty breathing'],
      comments: [
        {
          addedBy: {
            id: 'user1',
            name: 'John Doe'
          },
          comment: 'I have had a peanut allergy for as long as I can remember.',
          dateAdded: '2022-01-01T12:00:00.000Z'
        }
      ]
    }
    const wrapper = shallowMount(Allergy)

    expect(wrapper.find('.font-bold.text-center.mb-5').text()).toBe(allergy.name)

    expect(wrapper.vm.visible).toBe(false)

    wrapper.vm.showModal()
    expect(wrapper.vm.visible).toBe(true)

    wrapper.vm.handleOk()
    expect(wrapper.vm.visible).toBe(false)
  })
})

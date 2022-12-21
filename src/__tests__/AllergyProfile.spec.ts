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
  test('getAllergy renders allergy correctly', () => {
    // create an allergy object
    const allergy = {
      name: 'Peanut allergy',
      severity: 'Severe',
      image: 'https://example.com/peanut-allergy.jpg',
      symptoms: ['Hives', 'Swelling', 'Difficulty breathing'],
      comments: []
    }
  
    getAllergy(allergy);
  
    expect(document.querySelector('.font-bold').textContent).toBe('Peanut allergy');
    expect(document.querySelector('.heading').textContent).toBe('Severity: Severe');
    expect(document.querySelector('img').src).toBe('https://example.com/peanut-allergy.jpg');
    expect(document.querySelectorAll('.chip')[0].textContent).toBe('Hives');
    expect(document.querySelectorAll('.chip')[1].textContent).toBe('Swelling');
    expect(document.querySelectorAll('.chip')[2].textContent).toBe('Difficulty breathing');
  });
  
  test('addComment adds and renders comment correctly', () => {
    const newComment = {
      addedBy: { name: 'Jane Doe' },
      comment: 'I have a peanut allergy and it can be very severe.',
      timestamp: '2022-01-01 12:00:00'
    }
  
    addComment(newComment);
  
  
})
})
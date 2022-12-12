import { shallowMount } from '@vue/test-utils';
import Users from '../pages/Users.vue';
import { authService } from "@/services/auth";

describe('Users', () => {
  it('renders a table of users', () => {
    const wrapper = shallowMount(Users);

    // Assert the component renders a table with the specified columns
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        align: 'center',
      },
    ];
    expect(wrapper.find('a-table-stub').attributes('columns')).toEqual(columns);

    // Assert the component is initially in a loading state
    expect(wrapper.find('loading-stub').exists()).toBe(true);
  });

  it('fetches a list of users and renders them in the table', async () => {
    // Mock the getAllUsers method to return a list of users
    const mockUsers = [
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: 'user',
      },
    ];
    jest.spyOn(authService, 'getAllUsers').mockResolvedValue(mockUsers);

    const wrapper = shallowMount(Users);
    await wrapper.vm.$nextTick();

    // Assert the component is no longer in a loading state
    expect(wrapper.find('loading-stub').exists()).toBe(false);

    // Assert the table is populated with the list of users
    expect(wrapper.findAll('a-table-stub tbody tr').length).toBe(mockUsers.length);
  });
});

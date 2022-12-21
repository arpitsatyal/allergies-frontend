import Users from '../pages/Users.vue';
import { authService } from "@/services/auth";
import { shallowMount } from '@vue/test-utils';

describe('Users', () => {
  it('renders a table of users', () => {
    const wrapper = shallowMount(Users);

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

    expect(wrapper.find('loading-stub').exists()).toBe(true);
  });

  it('fetches a list of users and renders them in the table', async () => {
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

    expect(wrapper.find('loading-stub').exists()).toBe(false);

    expect(wrapper.findAll('a-table-stub tbody tr').length).toBe(mockUsers.length);
  });
});

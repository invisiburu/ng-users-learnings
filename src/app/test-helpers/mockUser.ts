import { UserEntry } from '@/services/users/users.types';

export const mockUserEntry = (id = 1): UserEntry => ({
  id,
  name: `John Doe #${id}`,
  avatar: '',
  email: `test${id}@mail.com`,
  learnings: [],
});

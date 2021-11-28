import { UserEntry } from '@/services/users/users.types';

export const mockUserEntry = (): UserEntry => ({
  id: 1,
  name: 'John Doe',
  avatar: '',
  email: 'test@mail.com',
  learnings: [],
});

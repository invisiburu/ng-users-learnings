import { LearningEntry } from '@/services/learning/learnings.types';

export const mockLearningEntry = (id = 1): LearningEntry => ({
  id,
  name: 'John Doe',
  is_active: true,
  users: [],
});

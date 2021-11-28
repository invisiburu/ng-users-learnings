import { LearningEntry } from '@/services/learning/learnings.types';

export const mockLearningEntry = (id = 1, isActive = true): LearningEntry => ({
  id,
  name: `Learning #${id}`,
  is_active: isActive,
  users: [],
});

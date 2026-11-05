import { describe, expect, it } from 'vitest';
import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementQueryKeys';
describe('coaching exercise cache isolation', () => {
 it('scopes exercise datasets under the existing workout cache namespace', () => {
  expect(TRAINER_WORKOUT_QUERY_KEYS.exercisesAll()).toEqual(['trainer_workout','exercises']);
 });
});

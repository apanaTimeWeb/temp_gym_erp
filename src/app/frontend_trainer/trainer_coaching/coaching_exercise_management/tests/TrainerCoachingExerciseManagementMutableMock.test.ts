import { afterEach, describe, expect, it } from 'vitest';
import { resetTrainerCoachingExerciseManagementMocks, trainerCoachingExerciseManagementMockHandlers } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/mocks/handlers/TrainerCoachingExerciseManagementMockHandlers';
afterEach(resetTrainerCoachingExerciseManagementMocks);
describe('exercise mutable MSW fixture', () => {
 it('provides GET/POST/PATCH/DELETE handlers and a reset function', () => {
  expect(trainerCoachingExerciseManagementMockHandlers).toHaveLength(4);
  expect(resetTrainerCoachingExerciseManagementMocks).toBeTypeOf('function');
 });
});

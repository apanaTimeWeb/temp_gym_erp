import { describe, expect, it } from 'vitest';
import { TrainerWorkoutCreateExerciseSchema } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/schemas/TrainerCoachingExerciseManagementDomainSchemas';
import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/trainer_coaching_exercise_management.url_config';
describe('isolated exercise-management source contract', () => {
 it('preserves the exact existing workout exercise endpoint', () => {
  expect(TRAINER_WORKOUT_URLS.API.EXERCISES).toBe('/trainer/trainer_workout/exercises');
 });
 it('rejects malformed exercise create forms', () => {
  expect(TrainerWorkoutCreateExerciseSchema.safeParse({name:'',muscle:'',difficulty:'Beginner'}).success).toBe(false);
 });
});

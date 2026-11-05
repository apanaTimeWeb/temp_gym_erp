import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/config/manager_workout_diet_library_assigned_workout_plans.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_workout API URL contract', () => {
  it('matches the feature API contract for ASSIGNMENTS', () => { expect(MANAGER_WORKOUT_PLANS_API.ASSIGNMENTS).toBe("/api/v1/manager/workout/assignments"); });
  it('matches the feature API contract for EXERCISE', () => { expect(MANAGER_WORKOUT_PLANS_API.EXERCISE('sample-id')).toBe("/api/v1/manager/workouts/exercises/sample-id"); });
  it('matches the feature API contract for EXERCISES_BASE', () => { expect(MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE).toBe("/api/v1/manager/workouts/exercises"); });
  it('matches the feature API contract for WORKOUT', () => { expect(MANAGER_WORKOUT_PLANS_API.WORKOUT('sample-id')).toBe("/api/v1/manager/workouts/sample-id"); });
  it('matches the feature API contract for WORKOUTS_BASE', () => { expect(MANAGER_WORKOUT_PLANS_API.WORKOUTS_BASE).toBe("/api/v1/manager/workouts"); });
  it('matches the feature API contract for WORKOUT_EXERCISES', () => { expect(MANAGER_WORKOUT_PLANS_API.WORKOUT_EXERCISES('page=2')).toBe("/api/v1/manager/workouts/exercises?page=2"); });
});

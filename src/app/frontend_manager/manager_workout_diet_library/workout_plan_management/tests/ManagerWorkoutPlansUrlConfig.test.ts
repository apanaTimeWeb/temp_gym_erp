import { MANAGER_WORKOUT_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/config/manager_workout_diet_library_workout_plan_management.url_config';
import { describe, expect, it } from 'vitest';



describe('Manager Workout URL contract', () => {
  it('keeps the workout, exercise, and assignment APIs on their documented resource paths', () => {
    expect(MANAGER_WORKOUT_PLANS_API.WORKOUTS_BASE).toBe('/api/v1/manager/workouts');
    expect(MANAGER_WORKOUT_PLANS_API.WORKOUT('workout / 1')).toBe('/api/v1/manager/workouts/workout%20%2F%201');
    expect(MANAGER_WORKOUT_PLANS_API.EXERCISES_BASE).toBe('/api/v1/manager/workouts/exercises');
    expect(MANAGER_WORKOUT_PLANS_API.EXERCISE('exercise/one')).toBe('/api/v1/manager/workouts/exercises/exercise%2Fone');
    expect(MANAGER_WORKOUT_PLANS_API.ASSIGNMENTS).toBe('/api/v1/manager/workout/assignments');
  });

  it('does not advertise a stats endpoint without an approved API contract', () => {
    expect('STATS' in MANAGER_WORKOUT_PLANS_API).toBe(false);
  });
});

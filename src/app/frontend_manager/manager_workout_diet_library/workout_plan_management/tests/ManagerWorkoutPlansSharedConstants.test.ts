import { describe, expect, it } from 'vitest';
import { WORKOUT_LEVEL_FILTER_OPTIONS, WORKOUT_LEVEL_OPTIONS } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/constants/manager_workout_plans_shared.constants';

describe('ManagerWorkoutPlansSharedConstants', () => {
  it('keeps workout-level options and filter defaults complete', () => {
    expect(WORKOUT_LEVEL_OPTIONS).toEqual(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
    expect(WORKOUT_LEVEL_FILTER_OPTIONS.map((option) => option.value)).toEqual(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
  });
});

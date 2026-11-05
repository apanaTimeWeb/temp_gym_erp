import { describe, expect, it } from 'vitest';

import { EQUIPMENT_OPTIONS, EXERCISE_DIFFICULTY_OPTIONS, EXERCISE_TABLE_HEADERS, WORKOUT_LEVEL_OPTIONS, WORKOUT_TAB_OPTIONS } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans_shared.constants';


describe('ManagerWorkoutPlansSharedConstants', () => {
  it('keeps workout filters and table columns complete', () => {
    expect(WORKOUT_LEVEL_OPTIONS).toContain('ADVANCED');
    expect(EXERCISE_DIFFICULTY_OPTIONS).toEqual(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
    expect(EQUIPMENT_OPTIONS).toContain('Bodyweight');
    expect(WORKOUT_TAB_OPTIONS).toEqual(['Workout Plans', 'Exercise Library']);
    expect(EXERCISE_TABLE_HEADERS).toHaveLength(5);
  });
});

import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansSortConstants';




describe('TrainerWorkoutSortConstants', () => {
  it('exposes covered utility/constants contracts', () => {
    expect(moduleUnderTest.TRAINER_WORKOUT_SORT_FIELDS).toBeDefined();
    expect(moduleUnderTest.TRAINER_WORKOUT_SORT_DIRECTIONS).toBeDefined();
    expect(Object.keys(moduleUnderTest).length).toBeGreaterThan(0);
  });
});

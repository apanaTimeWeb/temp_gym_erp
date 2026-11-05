import { describe, expect, it } from 'vitest';

import { ManagerWorkoutPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/api/manager_workout_diet_library_workout_plan_management.query_keys';

describe('manager_workout query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerWorkoutPlansQueryKeys.all).toEqual(['manager_workout']);
  });
});

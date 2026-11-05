import { describe, expect, it } from 'vitest';

import { ManagerLibraryDietPlansQueryKeys } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/api/manager_library_diet_plans.query_keys';

describe('manager_library query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerLibraryDietPlansQueryKeys.all).toEqual(['manager_library']);
  });
});

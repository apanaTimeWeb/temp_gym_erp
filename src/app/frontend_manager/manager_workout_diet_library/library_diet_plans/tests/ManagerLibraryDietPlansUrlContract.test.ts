import { MANAGER_LIBRARY_DIET_PLANS_API } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/config/manager_library_diet_plans.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_library API URL contract', () => {
  it('matches the feature API contract for DIET_PLANS_BASE', () => { expect(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLANS_BASE).toBe("/api/v1/manager/library/diet-plans"); });
  it('matches the feature API contract for DIET_PLAN_DELETE', () => { expect(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLAN_DELETE('sample-id')).toBe("/api/v1/manager/library/diet-plans/sample-id"); });
  it('matches the feature API contract for DIET_PLAN_UPDATE', () => { expect(MANAGER_LIBRARY_DIET_PLANS_API.DIET_PLAN_UPDATE('sample-id')).toBe("/api/v1/manager/library/diet-plans/sample-id"); });
  it('matches the feature API contract for EXERCISES_BASE', () => { expect(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISES_BASE).toBe("/api/v1/manager/library/exercises"); });
  it('matches the feature API contract for EXERCISE_DELETE', () => { expect(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISE_DELETE('sample-id')).toBe("/api/v1/manager/library/exercises/sample-id"); });
  it('matches the feature API contract for EXERCISE_UPDATE', () => { expect(MANAGER_LIBRARY_DIET_PLANS_API.EXERCISE_UPDATE('sample-id')).toBe("/api/v1/manager/library/exercises/sample-id"); });
});

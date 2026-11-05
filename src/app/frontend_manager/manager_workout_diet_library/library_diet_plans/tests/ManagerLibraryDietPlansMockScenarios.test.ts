// RESPONSIBILITY: Guards the required eight-state mock catalog for library_diet_plans.
import { describe, expect, it } from 'vitest';
import { MANAGERLIBRARYDIETPLANS_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/scenarios/ManagerLibraryDietPlansMockScenarios';

describe('ManagerLibraryDietPlans mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERLIBRARYDIETPLANS_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});

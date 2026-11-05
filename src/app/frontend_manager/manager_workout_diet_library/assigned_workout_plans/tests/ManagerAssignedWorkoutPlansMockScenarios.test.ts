// Guards the route-local mock scenario catalog and its required transport/UI states.
import { describe, expect, it } from 'vitest';
import { MANAGERASSIGNEDWORKOUTPLANS_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/scenarios/ManagerAssignedWorkoutPlansMockScenarios';

describe('assigned_workout_plans mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERASSIGNEDWORKOUTPLANS_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});

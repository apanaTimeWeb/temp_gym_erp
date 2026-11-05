// Guards this autonomous leaf's complete transport and UI scenario catalog.
import { describe, expect, it } from 'vitest';
import { MANAGERWORKOUTPLANMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/mocks/scenarios/ManagerWorkoutPlanManagementMockScenarios';

describe('workout_plan_management mock scenario catalog', () => {
  it('declares the required transport and UI states', () => {
    expect(Object.keys(MANAGERWORKOUTPLANMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});

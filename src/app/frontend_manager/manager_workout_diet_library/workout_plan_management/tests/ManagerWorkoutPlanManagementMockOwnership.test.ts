import { describe, expect, it } from 'vitest';
import { managerWorkoutHandlers, resetManagerWorkoutPlanManagementMockState } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/mocks/handlers/ManagerWorkoutPlanManagementMockHandlers';

describe('workout_plan_management mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerWorkoutHandlers)).toBe(true);
    expect(typeof resetManagerWorkoutPlanManagementMockState).toBe('function');
  });
});

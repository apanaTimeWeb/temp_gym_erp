import { describe, expect, it } from 'vitest';
import { managerWorkoutHandlers, resetManagerAssignedWorkoutPlansMockState } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/handlers/ManagerAssignedWorkoutPlansMockHandlers';

describe('assigned_workout_plans mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerWorkoutHandlers)).toBe(true);
    expect(typeof resetManagerAssignedWorkoutPlansMockState).toBe('function');
  });
});

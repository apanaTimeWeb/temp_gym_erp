import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansForm';




describe('useManagerWorkoutPlansForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerWorkoutPlansForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerWorkoutPlansForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});

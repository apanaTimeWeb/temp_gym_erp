import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/hooks/useManagerPtAssignmentsAssignmentForm';




describe('useManagerPtAssignmentsAssignmentForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerPtAssignmentsAssignmentForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerPtAssignmentsAssignmentForm as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook('' as never));
    expect(result.current).toBeDefined();
  });
});

import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/state/useManagerMembershipLifecycleUiStore';




describe('useManagerMembershipLifecycleUiStore co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerMembershipLifecycleUiStore).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerMembershipLifecycleUiStore as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});

import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_reports_referrals/reports_overview/state/useManagerReportsOverviewUiStore';




describe('useManagerReportsOverviewUiStore co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerReportsOverviewUiStore).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerReportsOverviewUiStore as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});

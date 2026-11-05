import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore';




describe('useManagerFinancePaymentsAndSummaryUiStore co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerFinancePaymentsAndSummaryUiStore).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerFinancePaymentsAndSummaryUiStore as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});

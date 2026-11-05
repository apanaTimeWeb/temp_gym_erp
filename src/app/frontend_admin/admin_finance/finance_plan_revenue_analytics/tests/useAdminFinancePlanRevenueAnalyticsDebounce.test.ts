// RESPONSIBILITY: Defines regression tests for useAdminFinancePlanRevenueAnalyticsDebounce.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_plan_revenue_analytics/tests/useAdminFinancePlanRevenueAnalyticsDebounce.test.ts)

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminPlansRevenueDebounce } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsDebounce';

describe('useAdminPlansRevenueDebounce', () => {
  it('returns the latest value only after the debounce delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useAdminPlansRevenueDebounce(value, delay), { initialProps: { value: 'first', delay: 300 } });
    expect(result.current).toBe('first');
    rerender({ value: 'second', delay: 300 });
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(299));
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe('second');
    vi.useRealTimers();
  });
});

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import { useAdminPlansRevenueLogic } from '../hooks/useAdminFinancePlanRevenueAnalyticsLogic';
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('../hooks/useAdminFinancePlanRevenueAnalyticsUrlQuerySync', () => ({ useAdminPlansRevenueUrlQuerySync: vi.fn() }));
vi.mock('../hooks/useAdminFinancePlanRevenueAnalyticsDebounce', () => ({ useAdminPlansRevenueDebounce: (value: string) => value }));
vi.mock('../api/admin_finance_plan_revenue_analytics_api', () => ({ AdminPlansRevenueApi: { fetchPlanRevenue: vi.fn() } }));
describe('RBG114 filter-driven page recovery', () => {
  beforeEach(() => vi.clearAllMocks());
  it('clamps to the last successful response page', () => {
    vi.mocked(useQuery).mockReturnValue({ data: { data: [], meta: { total: 0, totalPages: 1 } }, isPending: false, isError: false, refetch: vi.fn() } as never);
    const { result } = renderHook(() => useAdminPlansRevenueLogic());
    act(() => result.current.setCurrentPage(500));
    expect(result.current.currentPage).toBe(1);
  });
  it('does not correct the page on failed or pending queries', () => {
    vi.mocked(useQuery).mockReturnValue({ data: undefined, isPending: true, isError: false, refetch: vi.fn() } as never);
    const { result, rerender } = renderHook(() => useAdminPlansRevenueLogic());
    act(() => result.current.setCurrentPage(9));
    expect(result.current.currentPage).toBe(9);
    vi.mocked(useQuery).mockReturnValue({ data: { data: [], meta: { total: 1, totalPages: 1 } }, isPending: false, isError: true, refetch: vi.fn() } as never);
    rerender();
    expect(result.current.currentPage).toBe(9);
  });
});

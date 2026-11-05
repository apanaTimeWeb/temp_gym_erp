// RESPONSIBILITY: Defines regression tests for useAdminFinancePlanRevenueAnalyticsLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_plan_revenue_analytics/tests/useAdminFinancePlanRevenueAnalyticsLogic.test.ts)

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminPlansRevenueLogic } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsLogic';
import { useAdminPlansRevenueDebounce } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsDebounce';
import { useAdminPlansRevenueUrlQuerySync } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsUrlQuerySync';
import { useQuery } from '@tanstack/react-query';
import { AdminPlansRevenueApi } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/api/admin_finance_plan_revenue_analytics_api';
import type { PlanRevenueRecord } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsDebounce', () => ({ useAdminPlansRevenueDebounce: vi.fn((value: string) => value) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsUrlQuerySync', () => ({ useAdminPlansRevenueUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/api/admin_finance_plan_revenue_analytics_api', () => ({ AdminPlansRevenueApi: { fetchPlanRevenue: vi.fn() } }));

const records: PlanRevenueRecord[] = [
  { id: 'plan-a', planName: 'Alpha', tier: 'BASIC', totalRevenue: 100, activeSubscriptions: 4, newSignups: 1, renewalRate: 60 },
  { id: 'plan-b', planName: 'Beta', tier: 'PREMIUM', totalRevenue: 300, activeSubscriptions: 6, newSignups: 3, renewalRate: 100 },
];

describe('useAdminPlansRevenueLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuery).mockReturnValue({
      data: { data: records, meta: { total: 2, totalPages: 1 } },
      isPending: false,
      isError: false,
      refetch: vi.fn(),
    } as never);
    vi.mocked(AdminPlansRevenueApi.fetchPlanRevenue).mockResolvedValue({ data: records } as never);
    vi.mocked(useAdminPlansRevenueDebounce).mockImplementation(((value: any) => value) as any);
  });

  it('derives revenue aggregates from the server response and exposes pagination metadata', () => {
    const { result } = renderHook(() => useAdminPlansRevenueLogic());

    expect(result.current.aggregates.totalRevenue).toBe(400);
    expect(result.current.aggregates.totalSubscriptions).toBe(10);
    expect(result.current.aggregates.avgRenewalRate).toBe(80);
    expect(result.current.aggregates.topPerformingPlanName).toBe('Beta');
    expect(result.current.totalPages).toBe(1);
    expect(result.current.totalItems).toBe(2);
  });

  it('toggles sort direction and resets pagination when the same column is selected', () => {
    const { result } = renderHook(() => useAdminPlansRevenueLogic());
    act(() => result.current.handleSort('totalRevenue'));

    expect(result.current.sortDir).toBe('asc');
    expect(result.current.currentPage).toBe(1);
  });
});

// RESPONSIBILITY: Defines regression tests for useAdminDashboardOverviewLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/hooks/useAdminDashboardOverviewLogic.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';

const searchParams = new URLSearchParams('branchId=branch-2&range=this_month&startDate=2026-10-01&endDate=2026-10-05');
vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_dashboard/dashboard_overview/api/admin_dashboard_overview_api', () => ({ AdminDashboardApi: { fetchDashboardStats: vi.fn().mockResolvedValue({ data: { totalMembers: 7 } }) } }));

describe('useAdminDashboardLogic', () => {
  it('never exposes private backend diagnostics in dashboard error state', () => {
    vi.mocked(useQuery).mockReturnValue({ data: undefined, status: 'error', error: new Error('Private SQL connection string: password=secret'), refetch: vi.fn() } as never);
    const { result } = renderHook(() => useAdminDashboardLogic());
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('dashboard.DashboardError.text_22b2c820bf');
    expect(result.current.error).not.toContain('password=secret');
  });

  it('keeps branch/date identity in both the query key and request', async () => {
    vi.mocked(useQuery).mockReturnValue({ data: { totalMembers: 7 }, status: 'success', error: null } as never);
    const { result } = renderHook(() => useAdminDashboardLogic());
    expect(result.current.stats).toEqual({ totalMembers: 7 });
    const options = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown> };
    expect(JSON.stringify(options.queryKey)).toContain('branch-2');
    await expect(options.queryFn()).resolves.toEqual({ totalMembers: 7 });
  });
});

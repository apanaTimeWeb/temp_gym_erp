import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { analyticsApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/api/superadmin_analytics_dashboard.api';
import { useSuperadminAnalyticsDashboardPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardPage';

import type { ReactNode } from 'react';


vi.mock('next/navigation', () => ({ useSearchParams: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/api/superadmin_analytics_dashboard.api', () => ({
  analyticsApi: { fetchRevenueMetrics: vi.fn() },
}));


const metrics = {
  mrr: 15000000,
  arr: 180000000,
  cancellationRate: 2.5,
  ltv: 50000,
  cac: 2000,
  currency: 'INR',
  activeTenants: 125,
  arpu: 1200,
  mrrDeltaPercent: 5.2,
  arrDeltaPercent: 12.5,
  cancellationDeltaPercent: -0.5,
};
const monthly = [{ month: 'Jan', mrr: 10000000, tenantCount: 100, cancelledCount: 2 }];

describe('useSuperadminAnalyticsDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('range=this_month') as never);
  });

  it('calls the API facade method and exposes metrics and monthly records from the declared response shape', async () => {
    vi.mocked(analyticsApi.fetchRevenueMetrics).mockResolvedValue({ success: true, message: 'ok', data: { metrics, monthly, planRevenue: [] } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardPage(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.isError).toBe(false);
    expect(result.current.metrics).toMatchObject({ currency: 'INR', mrr: 15000000 });
    expect(result.current.monthlyData).toEqual(monthly);
    expect(analyticsApi.fetchRevenueMetrics).toHaveBeenCalledWith({ timeRange: 'this_month' });
  });

  it('does not issue an API request for malformed or inverted custom bounds', async () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('range=custom&startDate=2026-10-20&endDate=2026-10-10') as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardPage(), { wrapper });
    expect(result.current.isPending).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe('ui.analytics_custom_range_invalid');
    expect(analyticsApi.fetchRevenueMetrics).not.toHaveBeenCalled();
  });
});

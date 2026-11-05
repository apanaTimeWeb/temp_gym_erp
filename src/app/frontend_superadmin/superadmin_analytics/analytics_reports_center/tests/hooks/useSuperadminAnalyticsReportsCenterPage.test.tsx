import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminReportsApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.api';
import { useSuperadminAnalyticsReportsCenterPage } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterPage';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center.api', () => ({ superadminReportsApi: { fetchRevenueData: vi.fn(), fetchCancellationsData: vi.fn(), fetchHealthData: vi.fn() } }));

describe('useSuperadminAnalyticsReportsCenterPage', () => {
  it('treats a resolved ApiFailure envelope as a query error', async () => {
    vi.mocked(superadminReportsApi.fetchRevenueData).mockResolvedValue({ success: false, message: 'denied', data: null , errorCode: 'TEST_FAILURE', statusCode: 500, requestId: 'test-request-id'} as never);
    vi.mocked(superadminReportsApi.fetchCancellationsData).mockResolvedValue({ success: true, message: 'ok', data: [] , requestId: 'test-request-id'} as never);
    vi.mocked(superadminReportsApi.fetchHealthData).mockResolvedValue({ success: true, message: 'ok', data: [] , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminAnalyticsReportsCenterPage({ preset: 'THIS_MONTH' }), { wrapper });
    await waitFor(() => expect(result.current.revenue.isError).toBe(true));
    expect(result.current.revenue.data).toBeUndefined();
  });

  it('keeps revenue, cancellation, and health requests on the same URL-derived parameters', async () => {
    const response = { success: true, message: 'ok', data: [] , requestId: 'test-request-id'};
    vi.mocked(superadminReportsApi.fetchRevenueData).mockResolvedValue(response as never);
    vi.mocked(superadminReportsApi.fetchCancellationsData).mockResolvedValue(response as never);
    vi.mocked(superadminReportsApi.fetchHealthData).mockResolvedValue(response as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const params = { preset: 'THIS_MONTH', startDate: '2026-01-01', endDate: '2026-01-31', search: 'gym', plan: 'PRO' };
    const revenueParams = { preset: 'THIS_MONTH', startDate: '2026-01-01', endDate: '2026-01-31' };
    const { result } = renderHook(() => useSuperadminAnalyticsReportsCenterPage(params), { wrapper });
    await waitFor(() => expect(result.current.health.isPending).toBe(false));
    expect(superadminReportsApi.fetchRevenueData).toHaveBeenCalledWith(revenueParams);
    expect(superadminReportsApi.fetchCancellationsData).toHaveBeenCalledWith(params);
    expect(superadminReportsApi.fetchHealthData).toHaveBeenCalledWith(params);
  });
});

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en' }));
import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { superadminReportsExportApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center_export.api';
import { useSuperadminAnalyticsReportsCenterExportMutation } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/hooks/useSuperadminAnalyticsReportsCenterExportMutation';



vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center_export.api', () => ({ superadminReportsExportApi: { requestExport: vi.fn() } }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminAnalyticsReportsCenterExportMutation', () => {
  it('uses one key for the export intent and clears it after success', async () => {
    vi.mocked(superadminReportsExportApi.requestExport).mockResolvedValue({ success: true, message: 'Export started' , requestId: 'test-request-id'} as never);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminAnalyticsReportsCenterExportMutation(), { wrapper });
    await act(async () => { await result.current.requestExport(); });
    expect(superadminReportsExportApi.requestExport).toHaveBeenCalledWith(expect.any(String));
  });
  it('keeps the same idempotency key when the API reports an application-level failure', async () => {
    vi.mocked(superadminReportsExportApi.requestExport)
      .mockResolvedValue({ success: false, message: 'Export rejected' , data: null, errorCode: 'TEST_FAILURE', statusCode: 500, requestId: 'test-request-id'} as never);
    const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminAnalyticsReportsCenterExportMutation(), { wrapper });
    await act(async () => { await expect(result.current.requestExport()).rejects.toThrow('Export rejected'); });
    await act(async () => { await expect(result.current.requestExport()).rejects.toThrow('Export rejected'); });
    const calls = vi.mocked(superadminReportsExportApi.requestExport).mock.calls;
    expect(calls).toHaveLength(2);
    expect(calls[1][0]).toBe(calls[0][0]);
  });

});

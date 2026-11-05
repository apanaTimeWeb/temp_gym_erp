import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usageMetersApi } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/api/superadmin_billing_usage_meters_dashboard.api';
import { useSuperadminBillingUsageMetersDashboardPage } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/hooks/useSuperadminBillingUsageMetersDashboardPage';
import { MOCK_SUPERADMIN_BILLING_USAGE_METERS } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/fixtures/SuperadminBillingUsageMetersDashboardMockFixtures';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/api/superadmin_billing_usage_meters_dashboard.api', () => ({ usageMetersApi: { fetchUsageMeters: vi.fn() } }));
const params = { range: 'this_month' };
function wrapperFactory() { const client = new QueryClient({ defaultOptions: { queries: { retry: false } } }); return ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>; }

describe('useSuperadminBillingUsageMetersDashboardPage', () => {
  beforeEach(() => vi.clearAllMocks());
  it('calls the owning API facade with normalized parameters and reaches success', async () => {
    vi.mocked(usageMetersApi.fetchUsageMeters).mockResolvedValue({ success: true, message: 'ok', data: MOCK_SUPERADMIN_BILLING_USAGE_METERS });
    const { result } = renderHook(() => useSuperadminBillingUsageMetersDashboardPage(params), { wrapper: wrapperFactory() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(usageMetersApi.fetchUsageMeters).toHaveBeenCalledWith(params);
    expect(result.current.data?.data).toEqual(MOCK_SUPERADMIN_BILLING_USAGE_METERS);
  });

  it('surfaces a rejected request as query error and does not fabricate empty success data', async () => {
    vi.mocked(usageMetersApi.fetchUsageMeters).mockRejectedValue(new Error('network failure'));
    const { result } = renderHook(() => useSuperadminBillingUsageMetersDashboardPage(params), { wrapper: wrapperFactory() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });

  it('treats a resolved ApiFailure envelope as a query error', async () => {
    vi.mocked(usageMetersApi.fetchUsageMeters).mockResolvedValue({ success: false, message: 'denied', data: null } as never);
    const { result } = renderHook(() => useSuperadminBillingUsageMetersDashboardPage(params), { wrapper: wrapperFactory() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });

  it('does not request data when the date interval is invalid', () => {
    const { result } = renderHook(() => useSuperadminBillingUsageMetersDashboardPage({ range: 'custom', from: '2026-02-02', to: '2026-02-01' }, false), { wrapper: wrapperFactory() });
    expect(usageMetersApi.fetchUsageMeters).not.toHaveBeenCalled();
    expect(result.current.fetchStatus).toBe('idle');
  });
});

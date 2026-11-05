// RESPONSIBILITY: Renders and orchestrates the useAdminUsageLogic.test UI for the Admin admin_usage feature; business/API access remains in module-owned hooks and API services.
// DATA FLOW: module API / client state → useAdminUsageLogic.test → consuming Admin feature component.

import React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAdminUsageLogic } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsLogic';
import { AdminUsageApi } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore';
import type { AdminUsageData } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';

vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api', () => ({
  AdminUsageApi: {
    fetchMyUsage: vi.fn(),
    requestUpgrade: vi.fn(),
  },
}));

vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm', () => ({
  useAdminNavigationLayoutConfirm: vi.fn(),
}));

vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore', () => ({
  useAdminNavigationLayoutToastStore: vi.fn(),
}));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

const usageData: AdminUsageData = {
  tenantId: 't1',
  planName: 'Growth',
  planTier: 'Growth',
  billingCycleEnd: '2026-11-15T00:00:00Z',
  monthlyPrice: 4999,
  smsSent: 8500,
  smsLimit: 10000,
  databaseGb: 3.5,
  mediaGb: 15.2,
  storageLimitGb: 25,
  activeMembers: 12500,
  memberLimit: 15000,
  staffCount: 125,
  staffLimit: 200,
  branchCount: 4,
  branchLimit: 5,
  apiCallsToday: 45000,
  apiCallsLimit: 100000,
  usageHistory: [],
};

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useAdminUsageLogic upgrade workflow', () => {
  const confirm = vi.fn();
  const showToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AdminUsageApi.fetchMyUsage).mockResolvedValue({ success: true, message: 'ok', data: usageData  , requestId: "mock-admin-usage-usage-analytics-tests-hooks-useadminusageanalyticslogic-test-tsx-64"});
    vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({ confirm });
    vi.mocked(useAdminNavigationLayoutToastStore).mockReturnValue({ toast: null, showToast, hideToast: vi.fn() });
    confirm.mockResolvedValue(true);
    vi.mocked(AdminUsageApi.requestUpgrade).mockResolvedValue({
      success: true,
      message: 'Upgrade request sent.',
      data: { requestId: 'upgrade-1', planName: 'Pro', status: 'pending', requestedAt: '2026-09-18T00:00:00.000Z' },
     requestId: "mock-admin-usage-usage-analytics-tests-hooks-useadminusageanalyticslogic-test-tsx-68"});
  });

  it('confirms, submits the selected plan, shows success, and clears pending state', async () => {
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(confirm).toHaveBeenCalledOnce();
    expect(AdminUsageApi.requestUpgrade).toHaveBeenCalledWith('Pro', expect.any(String));
    expect(showToast).toHaveBeenCalledWith('Upgrade request sent.', 'success', 'usage-upgrade-success-Pro');
    expect(result.current.pendingUpgradePlan).toBeNull();
  });

  it('does not submit when confirmation is declined', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(AdminUsageApi.requestUpgrade).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });

  it('surfaces API failure through the Admin toast', async () => {
    vi.mocked(AdminUsageApi.requestUpgrade).mockRejectedValueOnce(new Error('Upgrade service unavailable.'));
    const { result } = renderHook(() => useAdminUsageLogic(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.data?.planName).toBe('Growth'));

    await act(async () => {
      await result.current.requestUpgrade('Pro');
    });

    expect(showToast).toHaveBeenCalledWith('usage.admin_usage_main.upgradeError', 'error', 'usage-upgrade-error-Pro');
    expect(JSON.stringify(showToast.mock.calls)).not.toContain('Upgrade service unavailable.');
    expect(result.current.pendingUpgradePlan).toBeNull();
  });

  it('exports the module-owned hook for feature orchestration', () => {
    expect(typeof useAdminUsageLogic).toBe('function');
  });

});

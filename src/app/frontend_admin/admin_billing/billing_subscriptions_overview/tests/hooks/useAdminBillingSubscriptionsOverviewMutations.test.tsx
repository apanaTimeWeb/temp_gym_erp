// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_subscriptions/subscriptions_overview/tests/hooks/useAdminSubscriptionsManagementMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/api/admin_billing_subscriptions_overview_api';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/hooks/useAdminBillingSubscriptionsOverviewMutations';

import { adminToast } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/feedback/AdminBillingSubscriptionsOverviewToastService';

vi.mock('@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/feedback/AdminBillingSubscriptionsOverviewToastService', () => ({ adminToast: { error: vi.fn(), success: vi.fn() } }));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscriptions_overview/api/admin_billing_subscriptions_overview_api', () => ({
  AdminSubscriptionsApi: {
    upgradePlan: vi.fn().mockResolvedValue({ message: 'ok' }),
    toggleAutoRenew: vi.fn().mockResolvedValue({ message: 'ok' }),
    setDefaultPaymentMethod: vi.fn().mockResolvedValue({ message: 'ok' }),
    removePaymentMethod: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminSubscriptionsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsMutations(), { wrapper });
    await act(async () => { await result.current.upgradeMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminSubscriptionsApi.upgradePlan).toHaveBeenCalled());
  });

  it('does not reveal backend exception details in failure toast', async () => {
    vi.mocked(AdminSubscriptionsApi.upgradePlan).mockRejectedValueOnce(new Error('PRIVATE_DB_CONNECTION_STRING'));
    const { result } = renderHook(() => useAdminSubscriptionsMutations(), { wrapper });
    await act(async () => {
      await expect(result.current.upgradeMutation.mutateAsync({ planId: 'plan-1', idempotencyKey: 'test-idempotency' })).rejects.toThrow('PRIVATE_DB_CONNECTION_STRING');
    });
    expect(adminToast.error).toHaveBeenCalledWith('subscriptions.AdminRepair.requestFailed', expect.stringMatching(/^admin-error-/));
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('PRIVATE_DB_CONNECTION_STRING');
  });
});

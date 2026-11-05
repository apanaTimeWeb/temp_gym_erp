// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_payment_methods/tests/hooks/useAdminSubscriptionsManagementMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
// Hook now uses localized error fallback; keep host-independent tests deterministic.
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/api/admin_billing_subscription_payment_methods_api';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsMutations';

vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/api/admin_billing_subscription_payment_methods_api', () => ({
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

  it('passes the recorded direction-specific idempotency key to the existing API toggle', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsMutations(), { wrapper });
    await act(async () => {
      await result.current.autoRenewMutation.mutateAsync({
        intentId: 'toggle-auto-renew:off', idempotencyKey: 'idem-off',
      });
    });
    await waitFor(() => expect(AdminSubscriptionsApi.toggleAutoRenew).toHaveBeenCalledWith('idem-off'));
  });
});

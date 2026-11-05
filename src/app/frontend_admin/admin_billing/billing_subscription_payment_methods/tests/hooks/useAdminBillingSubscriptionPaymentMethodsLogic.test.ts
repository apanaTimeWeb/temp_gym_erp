// RESPONSIBILITY: Defines regression tests for useAdminSubscriptionsManagementLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_payment_methods/tests/hooks/useAdminSubscriptionsManagementLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsLogic';

const confirm = vi.fn();
const upgradeMutation = { mutateAsync: vi.fn().mockResolvedValue({}), isPending: false };
const autoRenewMutation = { mutateAsync: vi.fn().mockResolvedValue({}), isPending: false };
const setDefaultPMMutation = { mutateAsync: vi.fn().mockResolvedValue({}), isPending: false };
const removePMMutation = { mutateAsync: vi.fn().mockResolvedValue({}), isPending: false };
const clearIntentKey = vi.fn();
const getIntentKey = vi.fn((id: string) => `idem:${id}`);

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/state/useAdminBillingSubscriptionPaymentMethodsStore', () => ({ useAdminSubscriptionsStore: () => ({ showUpgradeConfirm: false, setShowUpgradeConfirm: vi.fn(), currentInvoicePage: 1, setCurrentInvoicePage: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsQueries', () => ({
  useAdminSubscriptionsQueries: () => ({ subscription: { autoRenew: true }, plans: [], invoices: [], invoiceTotal: 0, invoiceTotalPages: 0, paymentMethods: [], kpis: {}, status: 'success', isPending: false }),
}));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsMutations', () => ({
  useAdminSubscriptionsMutations: () => ({ upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey }),
}));

describe('useAdminSubscriptionsLogic', () => {
  beforeEach(() => {
    confirm.mockReset();
    upgradeMutation.mutateAsync.mockReset();
    autoRenewMutation.mutateAsync.mockReset();
    setDefaultPMMutation.mutateAsync.mockReset();
    removePMMutation.mutateAsync.mockReset();
    for (const mutation of [upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation]) mutation.mutateAsync.mockResolvedValue({});
    clearIntentKey.mockReset();
    confirm.mockResolvedValue(true);
  });

  it('requires confirmation and submits the upgrade mutation with the stable intent key', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await result.current.handleUpgrade('plan-pro', 'Pro');
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'info' }));
    expect(upgradeMutation.mutateAsync).toHaveBeenCalledWith({ planId: 'plan-pro', idempotencyKey: 'idem:upgrade-plan:plan-pro' });
  });

  it('does not mutate when destructive confirmation is declined', async () => {
    confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await result.current.handleRemovePaymentMethod('pm-1');
    expect(removePMMutation.mutateAsync).not.toHaveBeenCalled();
    expect(clearIntentKey).toHaveBeenCalledWith('remove-payment-method:pm-1');
  });

  it('uses an off-specific idempotency intent when disabling auto-renew', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await result.current.toggleAutoRenew();
    expect(autoRenewMutation.mutateAsync).toHaveBeenCalledWith({
      intentId: 'toggle-auto-renew:off',
      idempotencyKey: 'idem:toggle-auto-renew:off',
    });
  });
});

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsLogic';

const m = vi.hoisted(() => ({
  confirm: vi.fn(), getIntentKey: vi.fn((id: string) => `key:${id}`), clearIntentKey: vi.fn(),
  upgrade: vi.fn(), autoRenew: vi.fn(), setDefault: vi.fn(), remove: vi.fn(),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm: m.confirm }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/state/useAdminBillingSubscriptionPaymentMethodsStore', () => ({ useAdminSubscriptionsStore: () => ({ showUpgradeConfirm: null, setShowUpgradeConfirm: vi.fn(), currentInvoicePage: 1, setCurrentInvoicePage: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsQueries', () => ({ useAdminSubscriptionsQueries: () => ({ subscription: { autoRenew: true }, paymentMethods: [{ id: 'default', isDefault: true }, { id: 'secondary', isDefault: false }], plans: [], invoices: [], invoiceTotal: 0, invoiceTotalPages: 1, kpis: {}, status: 'success', isPending: false }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/hooks/useAdminBillingSubscriptionPaymentMethodsMutations', () => ({ useAdminSubscriptionsMutations: () => ({
  upgradeMutation: { mutateAsync: m.upgrade, isPending: false }, autoRenewMutation: { mutateAsync: m.autoRenew, isPending: false },
  setDefaultPMMutation: { mutateAsync: m.setDefault, isPending: false }, removePMMutation: { mutateAsync: m.remove, isPending: false },
  getIntentKey: m.getIntentKey, clearIntentKey: m.clearIntentKey,
}) }));

beforeEach(() => { Object.values(m).forEach(fn => fn.mockClear()); m.confirm.mockResolvedValue(true); m.upgrade.mockResolvedValue({}); m.autoRenew.mockResolvedValue({}); m.setDefault.mockResolvedValue({}); m.remove.mockResolvedValue({}); });

describe('billing financial confirmation single-flight', () => {
  it('prevents a second financial write while the first API call is pending', async () => {
    let complete!: () => void;
    m.remove.mockImplementation(() => new Promise<void>(resolve => { complete = resolve; }));
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    let request!: Promise<void>;
    await act(async () => { request = result.current.handleRemovePaymentMethod('secondary'); await Promise.resolve(); });
    expect(m.remove).toHaveBeenCalledTimes(1);
    await act(async () => { await result.current.setDefaultPaymentMethod('secondary'); });
    expect(m.confirm).toHaveBeenCalledTimes(1); expect(m.setDefault).not.toHaveBeenCalled();
    await act(async () => { complete(); await request; });
    await act(async () => { await result.current.setDefaultPaymentMethod('secondary'); });
    expect(m.setDefault).toHaveBeenCalledTimes(1);
  });
  it('does not issue a write for the existing default method', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await act(async () => { await result.current.handleRemovePaymentMethod('default'); await result.current.setDefaultPaymentMethod('default'); });
    expect(m.confirm).not.toHaveBeenCalled(); expect(m.remove).not.toHaveBeenCalled(); expect(m.setDefault).not.toHaveBeenCalled();
  });
  it('keeps retry identity on API failure and clears only on explicit cancellation', async () => {
    m.remove.mockRejectedValueOnce(new Error('network'));
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await act(async () => { await result.current.handleRemovePaymentMethod('secondary'); });
    expect(m.clearIntentKey).not.toHaveBeenCalled();
    m.confirm.mockResolvedValueOnce(false);
    await act(async () => { await result.current.handleRemovePaymentMethod('secondary'); });
    expect(m.clearIntentKey).toHaveBeenCalledWith('remove-payment-method:secondary');
  });
});

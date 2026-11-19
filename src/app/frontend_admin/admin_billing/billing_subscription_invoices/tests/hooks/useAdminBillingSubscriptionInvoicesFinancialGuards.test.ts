import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesLogic';

const confirm = vi.fn();
const clearIntentKey = vi.fn();
const getIntentKey = vi.fn((id: string) => `key:${id}`);
const upgradeMutation = { mutateAsync: vi.fn(), isPending: false };
const autoRenewMutation = { mutateAsync: vi.fn(), isPending: false };
const setDefaultPMMutation = { mutateAsync: vi.fn(), isPending: false };
const removePMMutation = { mutateAsync: vi.fn(), isPending: false };
let subscription: { autoRenew: boolean } | null = { autoRenew: true };
let methods = [{ id: 'primary', isDefault: true }, { id: 'secondary', isDefault: false }];
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('page=1'), usePathname: () => '/invoices', useRouter: () => ({ replace: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/state/useAdminBillingSubscriptionInvoicesStore', () => ({ useAdminSubscriptionsStore: () => ({ showUpgradeConfirm: null, setShowUpgradeConfirm: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesQueries', () => ({ useAdminSubscriptionsQueries: () => ({ subscription, paymentMethods: methods, plans: [], invoices: [], invoiceTotal: 0, invoiceTotalPages: 1, invoicesStatus: 'success' }) }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesMutations', () => ({ useAdminSubscriptionsMutations: () => ({ upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation, getIntentKey, clearIntentKey }) }));

describe('RBG130 financial action lifecycle', () => {
  beforeEach(() => { subscription = { autoRenew: true }; methods = [{ id: 'primary', isDefault: true }, { id: 'secondary', isDefault: false }]; confirm.mockReset().mockResolvedValue(true); clearIntentKey.mockReset(); getIntentKey.mockClear(); for (const mutation of [upgradeMutation, autoRenewMutation, setDefaultPMMutation, removePMMutation]) mutation.mutateAsync.mockReset().mockResolvedValue({}); });
  it('holds single-flight lock until pending invoice-adjacent financial API settles', async () => {
    let resolve!: (value: unknown) => void;
    removePMMutation.mutateAsync.mockImplementation(() => new Promise(r => { resolve = r; }));
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    let pending!: Promise<unknown>;
    await act(async () => { pending = result.current.handleRemovePaymentMethod('secondary'); await Promise.resolve(); });
    await act(async () => { await result.current.toggleAutoRenew(); await result.current.setDefaultPaymentMethod('secondary'); });
    expect(removePMMutation.mutateAsync).toHaveBeenCalledTimes(1);
    expect(autoRenewMutation.mutateAsync).not.toHaveBeenCalled();
    expect(setDefaultPMMutation.mutateAsync).not.toHaveBeenCalled();
    await act(async () => { resolve({}); await pending; });
    await act(async () => { await result.current.toggleAutoRenew(); });
    expect(autoRenewMutation.mutateAsync).toHaveBeenCalledTimes(1);
  });
  it('blocks default removal and same-default redundant mutation', async () => {
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await act(async () => { await result.current.handleRemovePaymentMethod('primary'); await result.current.setDefaultPaymentMethod('primary'); });
    expect(confirm).not.toHaveBeenCalled();
  });
  it('blocks unknown auto-renew state and keeps failure keys for retry', async () => {
    subscription = null;
    const { result } = renderHook(() => useAdminSubscriptionsLogic());
    await act(async () => { await result.current.toggleAutoRenew(); });
    expect(confirm).not.toHaveBeenCalled();
    removePMMutation.mutateAsync.mockRejectedValue(new Error('backend failure'));
    await act(async () => { await result.current.handleRemovePaymentMethod('secondary'); });
    expect(clearIntentKey).not.toHaveBeenCalledWith('remove-payment-method:secondary');
  });
});

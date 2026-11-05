// RESPONSIBILITY: Protect billing subscription invoice mutations from exposing backend exceptions.
import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAdminSubscriptionsMutations } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/hooks/useAdminBillingSubscriptionInvoicesMutations';
import { adminToast } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/feedback/AdminBillingSubscriptionInvoicesToastService';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })),
  useMutation: vi.fn((config: unknown) => config),
}));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/components/feedback/AdminBillingSubscriptionInvoicesToastService', () => ({ adminToast: { error: vi.fn(), success: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_billing/billing_subscription_invoices/state/useAdminBillingSubscriptionInvoicesStore', () => ({ useAdminSubscriptionsStore: () => ({ setShowUpgradeConfirm: vi.fn() }) }));
import en from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/locales/admin_billing_subscription_invoices_en.json';
import hi from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/locales/admin_billing_subscription_invoices_hi.json';

describe('Billing subscription invoice generic mutation feedback', () => {
  it('has localized safe retry guidance in both locales', () => {
    for (const messages of [en, hi]) {
      const message = messages.subscriptions.AdminRepair.requestFailed;
      expect(message.length).toBeGreaterThan(12);
      expect(message).not.toContain('secret-database');
    }
  });

  it('all four mutation error handlers redact backend exceptions', () => {
    vi.mocked(useMutation).mockClear();
    vi.mocked(adminToast.error).mockClear();
    renderHook(() => useAdminSubscriptionsMutations());
    expect(useMutation).toHaveBeenCalledTimes(4);
    for (const [options] of vi.mocked(useMutation).mock.calls) {
      const onError = (options as { onError: (error: unknown) => void }).onError;
      onError(new Error('PRIVATE_BACKEND_TOKEN'));
      expect(vi.mocked(adminToast.error).mock.lastCall?.[0]).toBe('subscriptions.AdminRepair.requestFailed');
    }
    expect(JSON.stringify(vi.mocked(adminToast.error).mock.calls)).not.toContain('PRIVATE_BACKEND_TOKEN');
  });
});

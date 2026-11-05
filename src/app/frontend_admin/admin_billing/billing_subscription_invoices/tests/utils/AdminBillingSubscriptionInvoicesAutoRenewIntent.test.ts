// RESPONSIBILITY: Regression proof for this leaf's auto-renew intent identity.
import { describe, expect, it } from 'vitest';
import { adminBillingSubscriptionInvoicesAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesAutoRenewIntent';
describe('billing_subscription_invoices auto-renew retry identity', () => {
  it('separates enabling and disabling while keeping retries stable', () => {
    expect(adminBillingSubscriptionInvoicesAutoRenewIntent(false)).toBe('toggle-auto-renew:on');
    expect(adminBillingSubscriptionInvoicesAutoRenewIntent(true)).toBe('toggle-auto-renew:off');
    expect(adminBillingSubscriptionInvoicesAutoRenewIntent(true)).not.toBe(adminBillingSubscriptionInvoicesAutoRenewIntent(false));
    expect(adminBillingSubscriptionInvoicesAutoRenewIntent(true)).toBe(adminBillingSubscriptionInvoicesAutoRenewIntent(true));
  });
});

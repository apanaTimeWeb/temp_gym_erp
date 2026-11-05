// RESPONSIBILITY: Guards auto-renew mutation intent identity in the standalone billing_subscription_payment_methods leaf.
// DATA FLOW: current boolean subscription state → direction-specific idempotency intent.
import { describe, expect, it } from 'vitest';
import { adminBillingSubscriptionPaymentMethodsAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/utils/AdminBillingSubscriptionPaymentMethodsAutoRenewIntent';

describe('SubscriptionPaymentMethods auto-renew intent', () => {
  it('uses different identities for enable and disable', () => {
    expect(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(false)).toBe('toggle-auto-renew:on');
    expect(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(true)).toBe('toggle-auto-renew:off');
    expect(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(false)).not.toBe(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(true));
  });
  it('keeps a stable identity for a repeated attempt of the same direction', () => {
    expect(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(false)).toBe(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(false));
    expect(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(true)).toBe(adminBillingSubscriptionPaymentMethodsAutoRenewIntent(true));
  });
});

// RESPONSIBILITY: Guards auto-renew mutation intent identity in the standalone billing_subscription_plans leaf.
// DATA FLOW: current boolean subscription state → direction-specific idempotency intent.
import { describe, expect, it } from 'vitest';
import { adminBillingSubscriptionPlansAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscription_plans/utils/AdminBillingSubscriptionPlansAutoRenewIntent';

describe('SubscriptionPlans auto-renew intent', () => {
  it('uses different identities for enable and disable', () => {
    expect(adminBillingSubscriptionPlansAutoRenewIntent(false)).toBe('toggle-auto-renew:on');
    expect(adminBillingSubscriptionPlansAutoRenewIntent(true)).toBe('toggle-auto-renew:off');
    expect(adminBillingSubscriptionPlansAutoRenewIntent(false)).not.toBe(adminBillingSubscriptionPlansAutoRenewIntent(true));
  });
  it('keeps a stable identity for a repeated attempt of the same direction', () => {
    expect(adminBillingSubscriptionPlansAutoRenewIntent(false)).toBe(adminBillingSubscriptionPlansAutoRenewIntent(false));
    expect(adminBillingSubscriptionPlansAutoRenewIntent(true)).toBe(adminBillingSubscriptionPlansAutoRenewIntent(true));
  });
});

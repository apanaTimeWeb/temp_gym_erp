// RESPONSIBILITY: Regression proof for this leaf's auto-renew intent identity.
import { describe, expect, it } from 'vitest';
import { adminBillingSubscriptionsOverviewAutoRenewIntent } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewAutoRenewIntent';
describe('billing_subscriptions_overview auto-renew retry identity', () => {
  it('separates enabling and disabling while keeping retries stable', () => {
    expect(adminBillingSubscriptionsOverviewAutoRenewIntent(false)).toBe('toggle-auto-renew:on');
    expect(adminBillingSubscriptionsOverviewAutoRenewIntent(true)).toBe('toggle-auto-renew:off');
    expect(adminBillingSubscriptionsOverviewAutoRenewIntent(true)).not.toBe(adminBillingSubscriptionsOverviewAutoRenewIntent(false));
    expect(adminBillingSubscriptionsOverviewAutoRenewIntent(true)).toBe(adminBillingSubscriptionsOverviewAutoRenewIntent(true));
  });
});

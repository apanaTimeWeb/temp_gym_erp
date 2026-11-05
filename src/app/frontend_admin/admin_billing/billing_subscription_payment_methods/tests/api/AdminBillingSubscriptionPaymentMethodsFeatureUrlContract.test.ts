import { describe, expect, it } from 'vitest';
import { ADMIN_SUBSCRIPTIONS_ROUTES, ADMIN_SUBSCRIPTIONS_API } from '@/app/frontend_admin/admin_billing/billing_subscription_payment_methods/config/admin_billing_subscription_payment_methods.url_config';

describe('finance_subscription_payment_methods route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_SUBSCRIPTIONS_ROUTES.root).toBe('/frontend_admin/admin_billing/billing_subscription_payment_methods'));
});

import { describe, expect, it } from 'vitest';
import { ADMIN_SUBSCRIPTIONS_ROUTES, ADMIN_SUBSCRIPTIONS_API, ADMIN_SUBSCRIPTIONS_URLS } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/config/admin_billing_subscription_invoices.url_config';

describe('finance_subscription_invoices route and API contract', () => {
  it('declares its canonical internal route and keeps the base alias aligned', () => {
    expect(ADMIN_SUBSCRIPTIONS_ROUTES.root).toBe('/frontend_admin/admin_billing/billing_subscription_invoices');
    expect(ADMIN_SUBSCRIPTIONS_URLS.base).toBe(ADMIN_SUBSCRIPTIONS_ROUTES.root);
    expect(ADMIN_SUBSCRIPTIONS_API.base).toBe(ADMIN_SUBSCRIPTIONS_ROUTES.root);
  });
});

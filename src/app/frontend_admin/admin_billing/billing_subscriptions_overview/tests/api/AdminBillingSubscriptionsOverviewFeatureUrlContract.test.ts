import { describe, expect, it } from 'vitest';
import { ADMIN_SUBSCRIPTIONS_ROUTES, ADMIN_SUBSCRIPTIONS_API } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/config/admin_billing_subscriptions_overview.url_config';

describe('subscriptions_overview route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_SUBSCRIPTIONS_ROUTES.root).toBe('/frontend_admin/admin_billing/billing_subscriptions_overview'));
});

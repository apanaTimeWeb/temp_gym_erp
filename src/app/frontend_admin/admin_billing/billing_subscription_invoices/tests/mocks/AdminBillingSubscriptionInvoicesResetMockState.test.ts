// RESPONSIBILITY: Validates deterministic MSW subscription/payment-method seed restoration.
// DATA FLOW: isolated MSW handlers -> state mutation -> harness reset -> seed fixture comparison.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { MOCK_CURRENT_SUBSCRIPTION, MOCK_PAYMENT_METHODS } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/mocks/fixtures/AdminBillingSubscriptionInvoicesMockFixtures';
import { adminFeatureMockServer, resetAdminFeatureMockServer } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/tests/harness/bootstrap';

const url = 'https://feature-test.invalid/admin/subscriptions/';
const json = async (path: string, init?: RequestInit) => {
  const response = await fetch(`${url}${path}`, init);
  expect(response.ok).toBe(true);
  return response.json() as Promise<{ data: unknown }>;
};

beforeAll(() => adminFeatureMockServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => resetAdminFeatureMockServer());
afterAll(() => adminFeatureMockServer.close());

describe('invoice MSW fixture reset', () => {
  it('restores subscription and payment methods after state-changing operations', async () => {
    const start = await json('fetchSubscription');
    expect(start.data).toEqual(MOCK_CURRENT_SUBSCRIPTION);
    await json('upgradePlan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ planId: 'plan_pro' }) });
    await json('toggleAutoRenew', { method: 'POST' });
    await json('setDefaultPaymentMethod', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ paymentMethodId: 'pm2' }) });
    const changed = await json('fetchSubscription');
    expect(changed.data).not.toEqual(MOCK_CURRENT_SUBSCRIPTION);
    resetAdminFeatureMockServer();
    expect((await json('fetchSubscription')).data).toEqual(MOCK_CURRENT_SUBSCRIPTION);
    expect((await json('fetchPaymentMethods')).data).toEqual(MOCK_PAYMENT_METHODS);
  });
});

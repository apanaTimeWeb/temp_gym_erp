import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminSubscriptionsMockHandlers } from '../../mocks/handlers/AdminBillingSubscriptionsOverviewMockHandlers';

const server = setupServer(...adminSubscriptionsMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('BillingSubscriptionsOverview isolated mock pagination', () => {
  it('falls back for malformed pages and limits without changing response shape', async () => {
    const url = new URL('https://app.example.test/admin/subscriptions/fetchInvoices');
    url.searchParams.set('page', 'Infinity');
    url.searchParams.set('limit', '1e5');
    const response = await fetch(url);
    expect(response.ok).toBe(true);
    const body = await response.json();
    expect(body.meta.page).toBe(1);
    expect(body.meta.limit).toBe(10);
    expect(body.success).toBe(true);
  });
  it('accepts finite integer pagination requests', async () => {
    const url = new URL('https://app.example.test/admin/subscriptions/fetchInvoices');
    url.searchParams.set('page', '3');
    url.searchParams.set('limit', '4');
    const body = await (await fetch(url)).json();
    expect(body.meta.page).toBe(3);
    expect(body.meta.limit).toBe(4);
  });
});

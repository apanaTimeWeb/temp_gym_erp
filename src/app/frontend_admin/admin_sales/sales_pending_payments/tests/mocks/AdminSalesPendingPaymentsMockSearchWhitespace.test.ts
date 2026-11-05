// RESPONSIBILITY: Ensures the leaf-owned MSW search matches the UI search helper for surrounding spaces.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminSalesMockHandlers } from '@/app/frontend_admin/admin_sales/sales_pending_payments/mocks/handlers/AdminSalesPendingPaymentsMockHandlers';
const server = setupServer(...adminSalesMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('pending payments mock search whitespace', () => {
  it('matches a member while trimming surrounding whitespace in all-time mode', async () => {
    const response = await fetch('https://example.test/admin/sales/pending-payments?range=monthly&search=%20%20RAVI%20%20');
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.members.some((member: { id: string }) => member.id === 'm1')).toBe(true);
  });
});

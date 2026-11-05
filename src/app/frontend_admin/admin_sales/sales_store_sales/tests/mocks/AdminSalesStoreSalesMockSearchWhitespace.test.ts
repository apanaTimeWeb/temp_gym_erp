// RESPONSIBILITY: Store Sales mock search should trim outer spaces like the owning filter helper.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { setupServer } from 'msw/node';
import { adminSalesMockHandlers } from '@/app/frontend_admin/admin_sales/sales_store_sales/mocks/handlers/AdminSalesStoreSalesMockHandlers';
const server = setupServer(...adminSalesMockHandlers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('Store Sales mock search whitespace', () => {
  it('finds the expected order with padded upper-case search and an all-time range', async () => {
    const response = await fetch('https://example.test/admin/sales/store-orders?range=monthly&search=%20%20ORD-1001%20%20');
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data.orders.some((order: { id: string }) => order.id === 'ord-1001')).toBe(true);
  });
});

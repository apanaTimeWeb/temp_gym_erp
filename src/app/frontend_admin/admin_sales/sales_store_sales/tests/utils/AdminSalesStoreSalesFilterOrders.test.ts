import { describe, expect, it } from 'vitest';
import type { StoreOrder } from '@/app/frontend_admin/admin_sales/sales_store_sales/types/AdminSalesStoreSalesTypes';
import { filterAdminSalesStoreSalesOrders } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesFilterOrders';

const orders: StoreOrder[] = [
  { id: 'o1', total: 150, method: 'UPI', status: 'PAID', createdAt: '2026-10-01', items: [{ id: 'i1', qty: 1, price: 150, product: { name: 'Bottle' } }] },
  { id: 'o2', total: 300, method: 'CARD', status: 'PENDING', createdAt: '2026-10-02', items: [{ id: 'i2', qty: 1, price: 300, product: { name: 'Towel' } }] },
];
describe('filterAdminSalesStoreSalesOrders', () => {
  it('filters orders by item, order id, method, or status', () => expect(filterAdminSalesStoreSalesOrders(orders, 'towel')[0]?.id).toBe('o2'));
  it('returns all orders for blank search', () => expect(filterAdminSalesStoreSalesOrders(orders, ' ')).toEqual(orders));
});

import { describe, expect, it } from 'vitest';
import { normalizeAdminSalesPendingPaymentsUrlPage } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsUrlPage';
describe('Sales Pending Payments URL pagination boundary', () => {
  it('rejects malformed and unsafe query/page-action values', () => {
    for (const value of [null, '', '0', '-2', '2abc', '1e3', '1.5', 'Infinity', 'NaN', ' 2', '02', '9007199254740992', Infinity, NaN, 2.5]) expect(normalizeAdminSalesPendingPaymentsUrlPage(value)).toBe(1);
    expect(normalizeAdminSalesPendingPaymentsUrlPage('3')).toBe(3);
    expect(normalizeAdminSalesPendingPaymentsUrlPage(4)).toBe(4);
    expect(normalizeAdminSalesPendingPaymentsUrlPage('100001')).toBe(100000);
  });
});

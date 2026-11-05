import { describe, expect, it } from 'vitest';
import { normalizeAdminSalesStoreSalesUrlPage } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesUrlPage';

describe('AdminSalesStoreSales URL pagination', () => {
  it('preserves valid page values and bounds huge requests', () => {
    expect(normalizeAdminSalesStoreSalesUrlPage('2')).toBe(2);
    expect(normalizeAdminSalesStoreSalesUrlPage(3)).toBe(3);
    expect(normalizeAdminSalesStoreSalesUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inbound page strings and outgoing actions', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e4', 'Infinity', ' 2 ', '9007199254740992']) expect(normalizeAdminSalesStoreSalesUrlPage(raw)).toBe(1);
    expect(normalizeAdminSalesStoreSalesUrlPage(1.25)).toBe(1);
    expect(normalizeAdminSalesStoreSalesUrlPage(Infinity)).toBe(1);
  });
});

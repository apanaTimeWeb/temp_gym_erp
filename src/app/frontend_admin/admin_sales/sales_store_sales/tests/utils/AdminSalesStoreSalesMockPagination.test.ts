import { describe, expect, it } from 'vitest';
import { normalizeAdminSalesStoreSalesMockPagination } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesMockPagination';

describe('AdminSalesStoreSales mock pagination', () => {
  it('preserves normal positive page and list defaults', () => {
    expect(normalizeAdminSalesStoreSalesMockPagination(null, 1)).toBe(1);
    expect(normalizeAdminSalesStoreSalesMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminSalesStoreSalesMockPagination(null, 10, 100)).toBe(10);
  });
  it('rejects noncanonical, nonfinite, fractional and unsafe values', () => {
    for (const raw of ['0', '-1', '', ' 2 ', '1.5', '1e5', 'Infinity', 'NaN', '2abc', '9007199254740992']) {
      expect(normalizeAdminSalesStoreSalesMockPagination(raw, 10, 100)).toBe(10);
    }
  });
  it('bounds page and page-size computations', () => {
    expect(normalizeAdminSalesStoreSalesMockPagination('1000000', 1)).toBe(100000);
    expect(normalizeAdminSalesStoreSalesMockPagination('101', 10, 100)).toBe(100);
  });
});

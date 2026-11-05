import { describe, expect, it } from 'vitest';
import { normalizeAdminSalesMembershipsMockPagination } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsMockPagination';

describe('AdminSalesMemberships mock pagination', () => {
  it('preserves normal positive page and list defaults', () => {
    expect(normalizeAdminSalesMembershipsMockPagination(null, 1)).toBe(1);
    expect(normalizeAdminSalesMembershipsMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminSalesMembershipsMockPagination(null, 10, 100)).toBe(10);
  });
  it('rejects noncanonical, nonfinite, fractional and unsafe values', () => {
    for (const raw of ['0', '-1', '', ' 2 ', '1.5', '1e5', 'Infinity', 'NaN', '2abc', '9007199254740992']) {
      expect(normalizeAdminSalesMembershipsMockPagination(raw, 10, 100)).toBe(10);
    }
  });
  it('bounds page and page-size computations', () => {
    expect(normalizeAdminSalesMembershipsMockPagination('1000000', 1)).toBe(100000);
    expect(normalizeAdminSalesMembershipsMockPagination('101', 10, 100)).toBe(100);
  });
});

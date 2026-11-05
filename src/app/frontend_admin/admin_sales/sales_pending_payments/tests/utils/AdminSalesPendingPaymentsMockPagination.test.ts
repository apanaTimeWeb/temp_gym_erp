import { describe, expect, it } from 'vitest';
import { normalizeAdminSalesPendingPaymentsMockPagination } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsMockPagination';

describe('AdminSalesPendingPayments mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminSalesPendingPaymentsMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminSalesPendingPaymentsMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminSalesPendingPaymentsMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminSalesPendingPaymentsMockPagination(raw, 8)).toBe(8);
    }
  });
});

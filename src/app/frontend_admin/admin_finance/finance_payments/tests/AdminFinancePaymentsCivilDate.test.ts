import { describe, expect, it } from 'vitest';
import { isValidAdminFinanceDateKey, isValidAdminFinanceDateRange, toAdminFinanceDateKey } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsDateRangeUtils';
describe('RBG118 strict payment reporting dates', () => {
  it('rejects impossible dates and preserves genuine leap days', () => {
    for (const key of ['0000-01-01','2026-02-29','2028-02-30','2026-13-01','2026-01-00','2026-1-01']) expect(isValidAdminFinanceDateKey(key)).toBe(false);
    expect(isValidAdminFinanceDateKey('2028-02-29')).toBe(true);
    expect(isValidAdminFinanceDateKey('0042-02-28')).toBe(true);
    expect(isValidAdminFinanceDateRange('2028-02-29','2028-02-28')).toBe(false);
  });
  it('formats civil years with four digits', () => {
    const date = new Date(0); date.setFullYear(42, 1, 28);
    expect(toAdminFinanceDateKey(date)).toBe('0042-02-28');
  });
});

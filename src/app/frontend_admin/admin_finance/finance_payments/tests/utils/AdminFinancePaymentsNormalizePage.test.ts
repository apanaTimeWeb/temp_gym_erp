import { describe, expect, it } from 'vitest';
import { normalizeAdminFinancePaymentsPage } from '../../utils/AdminFinancePaymentsNormalizePage';

describe('FinancePayments URL page normalization', () => {
  it('normalizes malformed and non-finite values to one', () => {
    for (const input of [null, undefined, '0', '-2', '1.5', '1e6', 'Infinity', 'NaN', '9007199254740992', 0, 1.5, Number.POSITIVE_INFINITY]) {
      expect(normalizeAdminFinancePaymentsPage(input)).toBe(1);
    }
  });
  it('accepts only positive safe integer pages', () => {
    expect(normalizeAdminFinancePaymentsPage('2')).toBe(2);
    expect(normalizeAdminFinancePaymentsPage(5)).toBe(5);
    expect(normalizeAdminFinancePaymentsPage('9007199254740991')).toBe(Number.MAX_SAFE_INTEGER);
  });
});

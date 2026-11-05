import { describe, expect, it } from 'vitest';
import { normalizeAdminFinanceSummaryPage } from '../../utils/AdminFinanceSummaryNormalizePage';

describe('FinanceSummary URL page normalization', () => {
  it('normalizes malformed and non-finite values to one', () => {
    for (const input of [null, undefined, '0', '-2', '1.5', '1e6', 'Infinity', 'NaN', '9007199254740992', 0, 1.5, Number.POSITIVE_INFINITY]) {
      expect(normalizeAdminFinanceSummaryPage(input)).toBe(1);
    }
  });
  it('accepts only positive safe integer pages', () => {
    expect(normalizeAdminFinanceSummaryPage('2')).toBe(2);
    expect(normalizeAdminFinanceSummaryPage(5)).toBe(5);
    expect(normalizeAdminFinanceSummaryPage('9007199254740991')).toBe(Number.MAX_SAFE_INTEGER);
  });
});

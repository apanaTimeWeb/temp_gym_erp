// RESPONSIBILITY: Test hostile URL page input normalization with the actual feature-owned utility.
import { describe, expect, it } from 'vitest';
import { normalizeAdminFinanceExpensesPage } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesNormalizePage';

describe('Finance Expenses pagination normalization', () => {
  it.each([null, undefined, '', '0', '-5', 'NaN', 'Infinity', '-Infinity', '2.5', '1e3', '01', '9007199254740992', 2.5, Number.POSITIVE_INFINITY, Number.NaN])('returns page one for %s', (value) => {
    expect(normalizeAdminFinanceExpensesPage(value)).toBe(1);
  });
  it.each([['1', 1], ['2', 2], ['9007199254740991', Number.MAX_SAFE_INTEGER], [3, 3]])('accepts positive safe integer %s', (value, expected) => {
    expect(normalizeAdminFinanceExpensesPage(value)).toBe(expected);
  });
});

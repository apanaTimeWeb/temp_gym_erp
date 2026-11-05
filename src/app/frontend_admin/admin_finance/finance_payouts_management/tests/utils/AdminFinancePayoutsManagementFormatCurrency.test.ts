// RESPONSIBILITY: Defines regression tests for AdminFinancePayoutsManagementFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payouts_management/tests/utils/AdminFinancePayoutsManagementFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminPayoutsFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementFormatCurrency';

describe('AdminPayoutsFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminPayoutsFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminPayoutsFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminPayoutsFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminPayoutsFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminPayoutsFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});

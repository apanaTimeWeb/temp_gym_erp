// RESPONSIBILITY: Defines regression tests for AdminFinanceStaffLedgerManagementFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_ledger_management/tests/utils/AdminFinanceStaffLedgerManagementFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminFinanceStaffLedgerManagementFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementFormatCurrency';

describe('AdminFinanceStaffLedgerManagementFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminFinanceStaffLedgerManagementFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminFinanceStaffLedgerManagementFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminFinanceStaffLedgerManagementFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminFinanceStaffLedgerManagementFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminFinanceStaffLedgerManagementFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});

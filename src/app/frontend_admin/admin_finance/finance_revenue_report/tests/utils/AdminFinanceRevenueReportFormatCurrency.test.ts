// RESPONSIBILITY: Defines regression tests for AdminFinanceRevenueReportFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_revenue_report/tests/utils/AdminFinanceRevenueReportFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminFinanceRevenueReportFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportFormatCurrency';

describe('AdminFinanceRevenueReportFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminFinanceRevenueReportFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminFinanceRevenueReportFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminFinanceRevenueReportFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminFinanceRevenueReportFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminFinanceRevenueReportFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});

// RESPONSIBILITY: Defines regression tests for AdminFinanceProfitAndLossReportFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_profit_and_loss_report/tests/utils/AdminFinanceProfitAndLossReportFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminFinanceProfitAndLossReportFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportFormatCurrency';

describe('AdminFinanceProfitAndLossReportFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminFinanceProfitAndLossReportFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminFinanceProfitAndLossReportFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });

  it('does not infer currency identity from locale and rejects fractional minor units', () => {
    expect(AdminFinanceProfitAndLossReportFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminFinanceProfitAndLossReportFormatCurrency(123456, 'IN', 'en-IN')).toBe('—');
    expect(AdminFinanceProfitAndLossReportFormatCurrency(123456.7, 'INR', 'en-IN')).toBe('—');
  });
});

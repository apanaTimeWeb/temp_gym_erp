import { describe, expect, it } from 'vitest';
import { isValidAdminFinancePayrollReportDateRange } from '../utils/AdminFinancePayrollReportDateRangeUtils';

describe('RBG122 Payroll Report civil date validation', () => {
  it('rejects impossible dates, year zero, empty endpoints and reversed ranges', () => {
    expect(isValidAdminFinancePayrollReportDateRange('2028-02-30', '2028-03-01')).toBe(false);
    expect(isValidAdminFinancePayrollReportDateRange('0000-01-01', '0001-01-01')).toBe(false);
    expect(isValidAdminFinancePayrollReportDateRange('', '2028-01-01')).toBe(false);
    expect(isValidAdminFinancePayrollReportDateRange('2028-03-02', '2028-03-01')).toBe(false);
  });
  it('accepts leap day and inclusive equal endpoints', () => {
    expect(isValidAdminFinancePayrollReportDateRange('2028-02-29', '2028-02-29')).toBe(true);
  });
});

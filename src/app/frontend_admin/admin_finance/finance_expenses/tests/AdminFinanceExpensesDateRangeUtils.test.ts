// RESPONSIBILITY: Defines regression tests for AdminFinanceOverviewDateRangeUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_expenses/tests/AdminFinanceOverviewDateRangeUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminFinancePresetDateRange, isValidAdminFinanceDateRange, toAdminFinanceDateKey } from '@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesDateRangeUtils';

describe('AdminFinanceDateRangeUtils', () => {
  it('formats calendar dates without UTC day shifts', () => {
    expect(toAdminFinanceDateKey(new Date(2026, 0, 2))).toBe('2026-01-02');
  });
  it('uses the current month plus two prior months for a three-month preset', () => {
    expect(getAdminFinancePresetDateRange('last_3_months', new Date(2026, 9, 13))).toEqual({ startDate: '2026-08-01', endDate: '2026-10-31' });
  });
  it('uses the current month plus five prior months for a six-month preset', () => {
    expect(getAdminFinancePresetDateRange('last_6_months', new Date(2026, 0, 13))).toEqual({ startDate: '2025-08-01', endDate: '2026-01-31' });
  });
  it('rejects missing, malformed, impossible, and reversed custom ranges', () => {
    expect(isValidAdminFinanceDateRange('', '2026-01-01')).toBe(false);
    expect(isValidAdminFinanceDateRange('2026-02-30', '2026-03-01')).toBe(false);
    expect(isValidAdminFinanceDateRange('2026-02-01', '2026-01-31')).toBe(false);
    expect(isValidAdminFinanceDateRange('2026-01-01', '2026-01-31')).toBe(true);
  });
});

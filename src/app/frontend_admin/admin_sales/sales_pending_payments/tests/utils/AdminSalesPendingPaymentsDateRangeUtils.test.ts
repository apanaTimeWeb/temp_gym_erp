// RESPONSIBILITY: Defines regression tests for AdminSalesAnalyticsDateRangeUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_pending_sales_payments/tests/utils/AdminSalesAnalyticsDateRangeUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminSalesPendingPaymentsPresetDateRange, isValidAdminSalesPendingPaymentsDateRange, toAdminSalesPendingPaymentsDateKey } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsDateRangeUtils';

describe('AdminSalesDateRangeUtils', () => {
  const today = new Date(2026, 9, 13, 12);
  it('returns inclusive local bounds for month/year presets', () => {
    expect(getAdminSalesPendingPaymentsPresetDateRange('this_month', today)).toEqual({ startDate: '2026-10-01', endDate: '2026-10-31' });
    expect(getAdminSalesPendingPaymentsPresetDateRange('last_month', today)).toEqual({ startDate: '2026-09-01', endDate: '2026-09-30' });
    expect(getAdminSalesPendingPaymentsPresetDateRange('this_year', today)).toEqual({ startDate: '2026-01-01', endDate: '2026-12-31' });
  });
  it('uses exact three- and six-month inclusive periods without off-by-one months', () => {
    expect(getAdminSalesPendingPaymentsPresetDateRange('last_3_months', today)).toEqual({ startDate: '2026-08-01', endDate: '2026-10-31' });
    expect(getAdminSalesPendingPaymentsPresetDateRange('last_6_months', today)).toEqual({ startDate: '2026-05-01', endDate: '2026-10-31' });
  });
  it('does not pretend all-time/custom periods have preset bounds', () => {
    expect(getAdminSalesPendingPaymentsPresetDateRange('custom', today)).toBeNull();
    expect(getAdminSalesPendingPaymentsPresetDateRange('monthly', today)).toBeNull();
    expect(getAdminSalesPendingPaymentsPresetDateRange('yearly', today)).toBeNull();
  });
  it('validates calendar dates and ordered bounds', () => {
    expect(toAdminSalesPendingPaymentsDateKey(new Date(2026, 0, 2, 0))).toBe('2026-01-02');
    expect(isValidAdminSalesPendingPaymentsDateRange('2026-01-01', '2026-02-01')).toBe(true);
    expect(isValidAdminSalesPendingPaymentsDateRange('2026-02-30', '2026-03-01')).toBe(false);
    expect(isValidAdminSalesPendingPaymentsDateRange('2026-03-02', '2026-03-01')).toBe(false);
  });
});

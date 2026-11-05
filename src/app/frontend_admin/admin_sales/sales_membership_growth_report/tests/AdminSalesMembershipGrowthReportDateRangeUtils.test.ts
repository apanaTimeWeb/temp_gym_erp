// RESPONSIBILITY: Defines regression tests for AdminSalesMembershipGrowthReportAnalyticsDateRangeUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_sales/sales_membership_growth_report/tests/AdminSalesMembershipGrowthReportAnalyticsDateRangeUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminSalesMembershipGrowthReportPresetDateRange, isValidAdminSalesMembershipGrowthReportDateRange, parseAdminSalesMembershipGrowthReportDateKey, toAdminSalesMembershipGrowthReportDateKey } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportDateRangeUtils';

describe('AdminSalesMembershipGrowthReportDateRangeUtils', () => {
  it('uses local calendar keys without UTC conversion', () => {
    expect(toAdminSalesMembershipGrowthReportDateKey(new Date(2026, 0, 2))).toBe('2026-01-02');
  });
  it('generates correct inclusive current and prior month windows', () => {
    const today = new Date(2026, 9, 13);
    expect(getAdminSalesMembershipGrowthReportPresetDateRange('this_month', today)).toEqual({ startDate: '2026-10-01', endDate: '2026-10-31' });
    expect(getAdminSalesMembershipGrowthReportPresetDateRange('last_3_months', today)).toEqual({ startDate: '2026-08-01', endDate: '2026-10-31' });
    expect(getAdminSalesMembershipGrowthReportPresetDateRange('last_6_months', today)).toEqual({ startDate: '2026-05-01', endDate: '2026-10-31' });
  });
  it('rejects malformed, impossible, reversed, and empty ranges', () => {
    expect(isValidAdminSalesMembershipGrowthReportDateRange('', '2026-01-31')).toBe(false);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2026-02-30', '2026-03-01')).toBe(false);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2026-02-02', '2026-02-01')).toBe(false);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2026-02-01', '2026-02-28')).toBe(true);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2028-02-29', '2028-03-01')).toBe(true);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2027-02-29', '2027-03-01')).toBe(false);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2026-02-01', '2026-04-31')).toBe(false);
    expect(isValidAdminSalesMembershipGrowthReportDateRange('2026-02-01junk', '2026-04-30')).toBe(false);
  });
  it('uses one strict date-key parser for both the filter and calendar', () => {
    expect(parseAdminSalesMembershipGrowthReportDateKey('2026-02-30')).toBeNull();
    expect(parseAdminSalesMembershipGrowthReportDateKey('2026-02-28')?.getDate()).toBe(28);
    expect(parseAdminSalesMembershipGrowthReportDateKey('0099-01-02')?.getFullYear()).toBe(99);
    expect(parseAdminSalesMembershipGrowthReportDateKey('2026-02-01T00:00:00Z')).toBeNull();
  });
});

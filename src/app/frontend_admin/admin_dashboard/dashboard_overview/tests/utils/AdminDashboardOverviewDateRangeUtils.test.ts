// RESPONSIBILITY: Defines regression tests for AdminDashboardOverviewDateRangeUtils.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/utils/AdminDashboardOverviewDateRangeUtils.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminDashboardPresetDateRange, isValidAdminDashboardDateRange, toAdminDashboardDateKey } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewDateRangeUtils';

describe('AdminDashboardDateRangeUtils', () => {
  const today = new Date(2026, 9, 13, 12);
  it('resolves the inclusive current month in local calendar time', () => {
    expect(getAdminDashboardPresetDateRange('this_month', today)).toEqual({ startDate: '2026-10-01', endDate: '2026-10-31' });
  });
  it('resolves last three and six months without off-by-one months', () => {
    expect(getAdminDashboardPresetDateRange('last_3_months', today)).toEqual({ startDate: '2026-08-01', endDate: '2026-10-31' });
    expect(getAdminDashboardPresetDateRange('last_6_months', today)).toEqual({ startDate: '2026-05-01', endDate: '2026-10-31' });
  });
  it('returns null for all-time and custom ranges', () => {
    expect(getAdminDashboardPresetDateRange('custom', today)).toBeNull();
    expect(getAdminDashboardPresetDateRange('monthly', today)).toBeNull();
  });
  it('keeps local date-only keys timezone-safe and validates order/calendar dates', () => {
    expect(toAdminDashboardDateKey(new Date(2026, 0, 2, 0))).toBe('2026-01-02');
    expect(isValidAdminDashboardDateRange('2026-01-01', '2026-01-02')).toBe(true);
    expect(isValidAdminDashboardDateRange('2026-02-30', '2026-03-01')).toBe(false);
    expect(isValidAdminDashboardDateRange('2026-04-01', '2026-03-31')).toBe(false);
  });
});

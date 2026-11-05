import { describe, expect, it } from 'vitest';

import { EXPENSE_CATEGORY_STYLES, REPORT_DATE_RANGE_OPTIONS, REPORT_TABS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/constants/manager_reports_overview_shared.constants';


describe('ManagerReportsOverviewSharedConstants', () => {
  it('keeps report tabs and date-range options stable', () => {
    expect(REPORT_TABS).toEqual(['Revenue', 'Attendance', 'Members', 'Expenses']);
    expect(REPORT_DATE_RANGE_OPTIONS.map((item) => item.value)).toEqual(['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly']);
    expect(EXPENSE_CATEGORY_STYLES.Rent?.text).toBe('text-danger-text');
  });
});

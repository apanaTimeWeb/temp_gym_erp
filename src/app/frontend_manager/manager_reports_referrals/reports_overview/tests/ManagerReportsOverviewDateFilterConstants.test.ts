import { describe, expect, it } from 'vitest';

import { MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/constants/manager_reports_overview_date_filter.constants';


describe('ManagerReportsOverviewDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS).toBeDefined();
  });
});

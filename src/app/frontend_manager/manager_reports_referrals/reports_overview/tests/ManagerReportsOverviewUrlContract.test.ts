import { MANAGER_REPORTS_OVERVIEW_API } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/config/manager_reports_overview.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_reports API URL contract', () => {
  it('matches the feature API contract for SUMMARY', () => { expect(MANAGER_REPORTS_OVERVIEW_API.SUMMARY).toBe("/api/v1/manager/reports/summary"); });
});

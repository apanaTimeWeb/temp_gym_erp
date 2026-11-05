import { describe, expect, it } from 'vitest';

import { ManagerReportsOverviewQueryKeys } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/api/manager_reports_overview.query_keys';

describe('manager_reports query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerReportsOverviewQueryKeys.all).toEqual(['manager_reports']);
  });
});

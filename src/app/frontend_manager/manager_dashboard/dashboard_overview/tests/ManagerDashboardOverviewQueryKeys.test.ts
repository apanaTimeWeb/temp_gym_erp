import { describe, expect, it } from 'vitest';

import { ManagerDashboardOverviewQueryKeys } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/api/manager_dashboard_overview.query_keys';

describe('manager_dashboard query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerDashboardOverviewQueryKeys.all).toEqual(['manager_dashboard']);
  });
});

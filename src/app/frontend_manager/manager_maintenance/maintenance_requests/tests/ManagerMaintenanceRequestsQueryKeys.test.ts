import { describe, expect, it } from 'vitest';

import { ManagerMaintenanceRequestsQueryKeys } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/api/manager_maintenance_requests.query_keys';

describe('manager_maintenance query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerMaintenanceRequestsQueryKeys.all).toEqual(['manager_maintenance']);
  });
});

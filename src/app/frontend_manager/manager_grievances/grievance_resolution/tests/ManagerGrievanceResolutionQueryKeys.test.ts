import { describe, expect, it } from 'vitest';

import { ManagerGrievanceResolutionQueryKeys } from '@/app/frontend_manager/manager_grievances/grievance_resolution/api/manager_grievance_resolution.query_keys';

describe('manager_grievance query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerGrievanceResolutionQueryKeys.all).toEqual(['manager_grievance']);
  });
});

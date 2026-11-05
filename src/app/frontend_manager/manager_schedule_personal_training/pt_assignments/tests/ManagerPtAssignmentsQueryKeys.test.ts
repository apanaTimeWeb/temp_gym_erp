import { describe, expect, it } from 'vitest';

import { ManagerPtAssignmentsQueryKeys } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/api/manager_pt_assignments.query_keys';

describe('manager_pt query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerPtAssignmentsQueryKeys.all).toEqual(['manager_pt']);
  });
});

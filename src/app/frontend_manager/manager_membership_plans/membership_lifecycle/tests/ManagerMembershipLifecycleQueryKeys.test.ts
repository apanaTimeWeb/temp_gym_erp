import { describe, expect, it } from 'vitest';

import { ManagerMembershipLifecycleQueryKeys } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/api/manager_membership_lifecycle.query_keys';

describe('manager_plans query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerMembershipLifecycleQueryKeys.all).toEqual(['manager_plans']);
  });
});

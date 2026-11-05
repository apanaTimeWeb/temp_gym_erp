import { describe, expect, it } from 'vitest';

import { ManagerProfileAndSecurityQueryKeys } from '@/app/frontend_manager/manager_dashboard/profile_and_security/api/manager_profile_and_security.query_keys';

describe('manager_profile query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerProfileAndSecurityQueryKeys.all).toEqual(['manager_profile']);
  });
});

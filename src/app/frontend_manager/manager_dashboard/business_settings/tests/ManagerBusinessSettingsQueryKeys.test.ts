import { describe, expect, it } from 'vitest';

import { ManagerBusinessSettingsQueryKeys } from '@/app/frontend_manager/manager_dashboard/business_settings/api/manager_business_settings.query_keys';

describe('manager_settings query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerBusinessSettingsQueryKeys.all).toEqual(['manager_settings']);
  });
});

import { beforeEach, describe, expect, it } from 'vitest';

import { useSuperadminGymsDirectoryGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryGymGhostLoginStore';

describe('useSuperadminGymsDirectoryGymGhostLoginStore', () => {
  beforeEach(() => {
    sessionStorage.clear();
    useSuperadminGymsDirectoryGymGhostLoginStore.setState({ ghostTenantId: null });
  });

  it('keeps only the tenant identifier in memory and does not write browser storage', () => {
    useSuperadminGymsDirectoryGymGhostLoginStore.getState().startGhostLogin('gym-1');

    expect(useSuperadminGymsDirectoryGymGhostLoginStore.getState().ghostTenantId).toBe('gym-1');
    expect(sessionStorage.length).toBe(0);

    useSuperadminGymsDirectoryGymGhostLoginStore.getState().clearGhostLogin();
    expect(useSuperadminGymsDirectoryGymGhostLoginStore.getState().ghostTenantId).toBeNull();
    expect(sessionStorage.length).toBe(0);
  });
});

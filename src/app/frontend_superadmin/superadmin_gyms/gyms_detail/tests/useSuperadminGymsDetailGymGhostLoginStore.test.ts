import { beforeEach, describe, expect, it } from 'vitest';

import { useSuperadminGymsDetailGymGhostLoginStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/state/useSuperadminGymsDetailGymGhostLoginStore';

describe('useSuperadminGymsDetailGymGhostLoginStore', () => {
  beforeEach(() => {
    sessionStorage.clear();
    useSuperadminGymsDetailGymGhostLoginStore.setState({ ghostTenantId: null });
  });

  it('keeps only the tenant identifier in memory and does not write browser storage', () => {
    useSuperadminGymsDetailGymGhostLoginStore.getState().startGhostLogin('gym-1');

    expect(useSuperadminGymsDetailGymGhostLoginStore.getState().ghostTenantId).toBe('gym-1');
    expect(sessionStorage.length).toBe(0);

    useSuperadminGymsDetailGymGhostLoginStore.getState().clearGhostLogin();
    expect(useSuperadminGymsDetailGymGhostLoginStore.getState().ghostTenantId).toBeNull();
    expect(sessionStorage.length).toBe(0);
  });
});

import { describe, expect, it } from 'vitest';

import { MANAGER_MEMBERSHIP_LIFECYCLE_MESSAGES, TIERS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle_shared.constants';


describe('ManagerMembershipLifecycleSharedConstants', () => {
  it('keeps plan tiers and documented request messages stable', () => {
    expect(TIERS).toEqual(['BASIC', 'GOLD', 'PREMIUM']);
    expect(MANAGER_MEMBERSHIP_LIFECYCLE_MESSAGES.CHANGE_REQUEST_SUCCESS).toContain('admin');
    expect(MANAGER_MEMBERSHIP_LIFECYCLE_MESSAGES.CHANGE_REQUEST_ERROR).toContain('Try again');
  });
});

import { MANAGER_MEMBERSHIP_LIFECYCLE_API } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/config/manager_membership_lifecycle.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_plans API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.BASE).toBe("/api/v1/manager/plans"); });
  it('matches the feature API contract for CHANGE_REQUESTS', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.CHANGE_REQUESTS).toBe("/api/v1/manager/plans/change-requests"); });
  it('matches the feature API contract for GET_ONE', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.GET_ONE('sample-id')).toBe("/api/v1/manager/plans/sample-id"); });
  it('matches the feature API contract for MEMBERSHIP_ACTIVATE', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_ACTIVATE).toBe("/api/v1/manager/plans/membership-activate"); });
  it('matches the feature API contract for MEMBERSHIP_FREEZE', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_FREEZE).toBe("/api/v1/manager/plans/membership-freeze"); });
  it('matches the feature API contract for MEMBERSHIP_OVERVIEW', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_OVERVIEW).toBe("/api/v1/manager/plans/membership-overview"); });
  it('matches the feature API contract for MEMBERSHIP_RENEW', () => { expect(MANAGER_MEMBERSHIP_LIFECYCLE_API.MEMBERSHIP_RENEW).toBe("/api/v1/manager/plans/membership-renew"); });
});

import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_members API URL contract', () => {
  it('matches the feature API contract for ATTENDANCE', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.ATTENDANCE('sample-id')).toBe("/api/v1/manager/members/sample-id/attendance"); });
  it('matches the feature API contract for BASE', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.BASE).toBe("/api/v1/manager/members"); });
  it('matches the feature API contract for DIET_ASSIGN', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.DIET_ASSIGN('sample-id')).toBe("/api/v1/manager/members/sample-id/diet-plans"); });
  it('matches the feature API contract for DIET_PLANS', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.DIET_PLANS).toBe("/api/v1/manager/members/diet-plans"); });
  it('matches the feature API contract for EXPORT', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.EXPORT).toBe("/api/v1/manager/members/export"); });
  it('matches the feature API contract for GET_ONE', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.GET_ONE('sample-id')).toBe("/api/v1/manager/members/sample-id"); });
  it('matches the feature API contract for PAYMENTS', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.PAYMENTS('sample-id')).toBe("/api/v1/manager/members/sample-id/payments"); });
  it('matches the feature API contract for PLANS_SNAPSHOT', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.PLANS_SNAPSHOT).toBe("/api/v1/manager/members/plans"); });
  it('matches the feature API contract for RENEW', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.RENEW('sample-id')).toBe("/api/v1/manager/members/sample-id/renew"); });
  it('matches the feature API contract for STATS', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.STATS).toBe("/api/v1/manager/members/stats"); });
  it('matches the feature API contract for TRAINERS', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.TRAINERS).toBe("/api/v1/manager/members/trainers"); });
  it('matches the feature API contract for WORKOUTS', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.WORKOUTS).toBe("/api/v1/manager/members/workouts"); });
  it('matches the feature API contract for WORKOUT_ASSIGN', () => { expect(MANAGER_MEMBERS_DIRECTORY_API.WORKOUT_ASSIGN('sample-id')).toBe("/api/v1/manager/members/sample-id/workouts"); });
});

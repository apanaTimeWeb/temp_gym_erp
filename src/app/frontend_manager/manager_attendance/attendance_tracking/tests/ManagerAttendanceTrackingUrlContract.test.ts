import { MANAGER_ATTENDANCE_TRACKING_API } from '@/app/frontend_manager/manager_attendance/attendance_tracking/config/manager_attendance_tracking.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_attendance API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_ATTENDANCE_TRACKING_API.BASE).toBe("/api/v1/manager/attendance"); });
  it('matches the feature API contract for HISTORY', () => { expect(MANAGER_ATTENDANCE_TRACKING_API.HISTORY).toBe("/api/v1/manager/attendance/history"); });
  it('matches the feature API contract for MEMBERS', () => { expect(MANAGER_ATTENDANCE_TRACKING_API.MEMBERS).toBe("/api/v1/manager/attendance/members"); });
  it('matches the feature API contract for STAFF', () => { expect(MANAGER_ATTENDANCE_TRACKING_API.STAFF).toBe("/api/v1/manager/attendance/staff"); });
  it('matches the feature API contract for STATS', () => { expect(MANAGER_ATTENDANCE_TRACKING_API.STATS).toBe("/api/v1/manager/attendance/stats"); });
});

import { describe, expect, it } from 'vitest';

import { ManagerAttendanceTrackingQueryKeys } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.query_keys';

describe('manager_attendance query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerAttendanceTrackingQueryKeys.all).toEqual(['manager_attendance']);
  });
});

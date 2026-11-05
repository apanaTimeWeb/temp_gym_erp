// RESPONSIBILITY: Guards the required eight-state mock catalog for attendance_tracking.
import { describe, expect, it } from 'vitest';
import { MANAGERATTENDANCEMANAGEMENT_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/mocks/scenarios/ManagerAttendanceTrackingMockScenarios';

describe('ManagerAttendanceTracking mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERATTENDANCEMANAGEMENT_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});

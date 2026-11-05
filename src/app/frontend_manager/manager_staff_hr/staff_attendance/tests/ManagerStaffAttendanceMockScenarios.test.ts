// Guards the route-local mock scenario catalog and its required transport/UI states.
import { describe, expect, it } from 'vitest';
import { MANAGERSTAFFATTENDANCE_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/mocks/scenarios/ManagerStaffAttendanceMockScenarios';

describe('staff_attendance mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERSTAFFATTENDANCE_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});

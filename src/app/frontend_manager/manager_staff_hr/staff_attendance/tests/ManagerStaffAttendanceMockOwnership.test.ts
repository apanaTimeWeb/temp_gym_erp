import { describe, expect, it } from 'vitest';
import { managerHrHandlers, resetManagerStaffAttendanceMockState } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/mocks/handlers/ManagerStaffAttendanceMockHandlers';

describe('staff_attendance mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerHrHandlers)).toBe(true);
    expect(typeof resetManagerStaffAttendanceMockState).toBe('function');
  });
});

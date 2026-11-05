// RESPONSIBILITY: Defines regression tests for AdminAttendanceDashboardSchemas.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_dashboard/tests/schemas/AdminAttendanceDashboardSchemas.test.ts)

import { describe, expect, it } from 'vitest';
import { adminAttendanceRecordSchema } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/schemas/AdminAttendanceDashboardSchemas';

const validRecord = {
  id: 'attendance-1',
  memberId: 'member-1',
  memberName: 'Example Member',
  memberPhone: '9876543210',
  branchId: 'branch-1',
  branchName: 'Example Branch',
  checkInTime: '2026-10-06T06:30:00Z',
  checkOutTime: '2026-10-06T08:00:00Z',
  date: '2026-10-06',
  status: 'present',
  planName: 'Standard',
};

describe('AdminAttendanceSchemas', () => {
  it('accepts ISO timestamps used by the module API fixtures', () => {
    expect(adminAttendanceRecordSchema.safeParse(validRecord).success).toBe(true);
  });

  it('rejects display-only or arbitrary timestamp text at the API boundary', () => {
    expect(adminAttendanceRecordSchema.safeParse({ ...validRecord, checkInTime: '9:00 AM' }).success).toBe(false);
    expect(adminAttendanceRecordSchema.safeParse({ ...validRecord, checkInTime: 'tomorrow sometime' }).success).toBe(false);
  });
});

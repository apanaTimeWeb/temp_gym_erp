// RESPONSIBILITY: Validates Attendance-owned member and staff snapshots returned by the API boundary.
import { z } from 'zod';

import { ATTENDANCE_MEMBER_STATUS_VALUES, ATTENDANCE_STAFF_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';

/**
 * @description Provides the ManagerAttendanceTrackingSnapshotSchema implementation for the attendance module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerAttendanceMemberSnapshotSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string(),
  status: z.enum(ATTENDANCE_MEMBER_STATUS_VALUES),
  planName: z.string().optional(),
  joinDate: z.string().optional(),
});

export const managerAttendanceStaffSnapshotSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  phone: z.string(),
  status: z.enum(ATTENDANCE_STAFF_STATUS_VALUES),
});

export const managerAttendanceMemberSnapshotResponseSchema = z.object({
  members: z.array(managerAttendanceMemberSnapshotSchema),
});

export const managerAttendanceStaffSnapshotResponseSchema = z.object({
  staff: z.array(managerAttendanceStaffSnapshotSchema),
});

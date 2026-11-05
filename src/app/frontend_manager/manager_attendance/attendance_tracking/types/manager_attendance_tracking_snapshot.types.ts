// RESPONSIBILITY: Defines feature-owned attendance snapshot contracts returned by attendance endpoints.
import type { ATTENDANCE_MEMBER_STATUS_VALUES, ATTENDANCE_STAFF_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';
export type ManagerAttendanceTrackingMemberStatus = typeof ATTENDANCE_MEMBER_STATUS_VALUES[number];
export type ManagerAttendanceTrackingStaffStatus = typeof ATTENDANCE_STAFF_STATUS_VALUES[number];

export interface MemberSnapshot {
  id: string;
  name: string;
  phone: string;
  status: ManagerAttendanceTrackingMemberStatus;
  planName?: string;
  joinDate?: string;
}

export interface StaffSnapshot {
  id: string;
  name: string;
  role: string;
  phone: string;
  status: ManagerAttendanceTrackingStaffStatus;
}

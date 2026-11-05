// RESPONSIBILITY: Defines the typed props for the Attendance check-in method badge.
import type { CheckInMethod } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';

export interface ManagerAttendanceTrackingCheckInMethodBadgeProps {
  method?: CheckInMethod;
}

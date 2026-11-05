// RESPONSIBILITY: Validates Attendance view identifiers and resolves legacy scanner bookmarks.
import type { ManagerAttendanceTrackingViewId } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';
import { MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW, MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID, MANAGER_ATTENDANCE_TRACKING_VIEW_IDS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_view.constants';

export function isManagerAttendanceTrackingView(value: string | null | undefined): value is ManagerAttendanceTrackingViewId {
  return value !== null && value !== undefined && (MANAGER_ATTENDANCE_TRACKING_VIEW_IDS as readonly string[]).includes(value);
}

export function resolveManagerAttendanceTrackingView(value: string | null | undefined, legacyScannerOpen = false): ManagerAttendanceTrackingViewId {
  if (isManagerAttendanceTrackingView(value)) return value;
  if ((value === null || value === undefined) && legacyScannerOpen) return MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID;
  return MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW;
}

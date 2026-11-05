import type { ManagerAttendanceTrackingViewId } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';
// RESPONSIBILITY: Defines validated Manager Attendance screen IDs and legacy scanner-query compatibility.
export const MANAGER_ATTENDANCE_TRACKING_VIEW_IDS = ['attendance', 'qr-scanner'] as const satisfies readonly ManagerAttendanceTrackingViewId[];
export const MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW: ManagerAttendanceTrackingViewId = 'attendance';
export const MANAGER_ATTENDANCE_TRACKING_VIEW_QUERY_PARAM = 'view';
export const MANAGER_ATTENDANCE_TRACKING_LEGACY_SCANNER_QUERY_PARAM = 'qrScanner';
export const MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID: ManagerAttendanceTrackingViewId = 'qr-scanner';

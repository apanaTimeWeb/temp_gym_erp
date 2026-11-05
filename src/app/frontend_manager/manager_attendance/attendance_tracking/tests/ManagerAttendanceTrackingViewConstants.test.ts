import { MANAGER_ATTENDANCE_TRACKING_ROUTES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/config/manager_attendance_tracking.url_config';
import { describe, expect, it } from 'vitest';



import { MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW, MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_view.constants';
import { isManagerAttendanceTrackingView, resolveManagerAttendanceTrackingView } from '@/app/frontend_manager/manager_attendance/attendance_tracking/utils/ManagerAttendanceTrackingResolveView';

describe('Manager Attendance view URL contract', () => {
  it.each(['attendance', 'qr-scanner'])('accepts canonical view %s', (view) => {
    expect(isManagerAttendanceTrackingView(view)).toBe(true);
    expect(resolveManagerAttendanceTrackingView(view)).toBe(view);
  });
  it.each([null, undefined, '', 'unknown', '__proto__'])('falls back safely for invalid view %s', (view) => {
    expect(isManagerAttendanceTrackingView(view)).toBe(false);
    expect(resolveManagerAttendanceTrackingView(view)).toBe(MANAGER_ATTENDANCE_TRACKING_DEFAULT_VIEW);
  });
  it('migrates the legacy scanner flag to the scanner view when no canonical view exists', () => {
    expect(resolveManagerAttendanceTrackingView(null, true)).toBe('qr-scanner');
  });
  it('uses a canonical scanner view ID for the navigation shortcut', () => {
    expect(MANAGER_ATTENDANCE_TRACKING_QR_SCANNER_VIEW_ID).toBe('qr-scanner');
    expect(MANAGER_ATTENDANCE_TRACKING_ROUTES.UI.QR_SCANNER).toBe('/frontend_manager/manager_attendance?view=qr-scanner');
  });
});

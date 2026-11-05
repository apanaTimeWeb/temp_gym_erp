// RESPONSIBILITY: Owns every route path used by the Manager attendance module.
/**
 * @description Canonical Manager attendance URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_ATTENDANCE_TRACKING_UI_PAGE_HOME_URL = '/frontend_manager/manager_attendance/attendance_tracking';
const MANAGER_ATTENDANCE_TRACKING_UI_QR_SCANNER_URL = `${MANAGER_ATTENDANCE_TRACKING_UI_PAGE_HOME_URL}?view=qr-scanner`;
const MANAGER_ATTENDANCE_TRACKING_BACKEND_API_BASE_URL = '/api/v1/manager/attendance';
const MANAGER_ATTENDANCE_TRACKING_BACKEND_API_STATS_URL = '/api/v1/manager/attendance/stats';
const MANAGER_ATTENDANCE_TRACKING_BACKEND_API_HISTORY_URL = '/api/v1/manager/attendance/history';
const MANAGER_ATTENDANCE_TRACKING_BACKEND_API_MEMBERS_URL = '/api/v1/manager/attendance/members';
const MANAGER_ATTENDANCE_TRACKING_BACKEND_API_STAFF_URL = '/api/v1/manager/attendance/staff';

export const MANAGER_ATTENDANCE_TRACKING_ROUTES = {
  UI: {
    HOME: MANAGER_ATTENDANCE_TRACKING_UI_PAGE_HOME_URL,
    QR_SCANNER: MANAGER_ATTENDANCE_TRACKING_UI_QR_SCANNER_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_attendance' as const, LEAF: '/frontend_manager/manager_attendance/attendance_tracking' as const }
} as const;

export const MANAGER_ATTENDANCE_TRACKING_API = {
  BASE: MANAGER_ATTENDANCE_TRACKING_BACKEND_API_BASE_URL,
    STATS: MANAGER_ATTENDANCE_TRACKING_BACKEND_API_STATS_URL,
    HISTORY: MANAGER_ATTENDANCE_TRACKING_BACKEND_API_HISTORY_URL,
    MEMBERS: MANAGER_ATTENDANCE_TRACKING_BACKEND_API_MEMBERS_URL,
    STAFF: MANAGER_ATTENDANCE_TRACKING_BACKEND_API_STAFF_URL
} as const;

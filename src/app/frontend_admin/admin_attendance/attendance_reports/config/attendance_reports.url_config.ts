// RESPONSIBILITY: Owns internal routes and only the attendance report backend contract for this leaf.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
// Existing backend endpoint literals are retained exactly; export remains contract-gated.
export const ADMIN_ATTENDANCE_REPORTS_ROUTES = { root: '/frontend_admin/admin_attendance/attendance_reports' as const } as const;
export const ADMIN_ATTENDANCE_REPORTS_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_ATTENDANCE_REPORTS_BASE_URL = '/frontend_admin/admin_attendance' as const;
export const ADMIN_ATTENDANCE_REPORTS_ATTENDANCE_URL = '/admin/reports/attendance' as const;
export const ADMIN_ATTENDANCE_REPORTS_EXPORT_URL = '/admin/reports/export' as const;
export const ADMIN_ATTENDANCE_REPORTS_URLS = { branchReference: ADMIN_ATTENDANCE_REPORTS_BRANCH_REFERENCE_URL, base: ADMIN_ATTENDANCE_REPORTS_BASE_URL, attendance: ADMIN_ATTENDANCE_REPORTS_ATTENDANCE_URL, export: ADMIN_ATTENDANCE_REPORTS_EXPORT_URL } as const;
export const ADMIN_ATTENDANCE_REPORTS_API = ADMIN_ATTENDANCE_REPORTS_URLS;

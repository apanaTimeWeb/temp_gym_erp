// RESPONSIBILITY: Centralizes route and endpoint constants for attendance_dashboard; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_attendance_dashboard.url_config.ts → internal route constants or existing backend API URLs.

// admin_attendance_url_config.ts
// Owned by: frontend_admin/admin_attendance feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_ATTENDANCE_ROUTES = {
  root: '/frontend_admin/admin_attendance/attendance_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_ATTENDANCE_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_ATTENDANCE_RECORDS_URL = '/admin/attendance/records' as const;
export const ADMIN_ATTENDANCE_SUMMARY_URL = '/admin/attendance/summary' as const;
export const ADMIN_ATTENDANCE_TREND_URL = '/admin/attendance/trend' as const;

export const ADMIN_ATTENDANCE_URLS = {
  branchReference: ADMIN_ATTENDANCE_BRANCH_REFERENCE_URL,
  records: ADMIN_ATTENDANCE_RECORDS_URL,
  summary: ADMIN_ATTENDANCE_SUMMARY_URL,
  trend: ADMIN_ATTENDANCE_TREND_URL,
} as const;

export const ADMIN_ATTENDANCE_API = ADMIN_ATTENDANCE_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

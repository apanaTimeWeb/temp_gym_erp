// RESPONSIBILITY: Centralizes route and endpoint constants for hr_performance_analytics; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_hr_performance_analytics.url_config.ts → internal route constants or existing backend API URLs.

/** Canonical Staff Performance route and preserved API path sourced from the existing typed API client. */
export const ADMIN_HR_PERFORMANCE_ROUTES = { root: '/frontend_admin/admin_hr/hr_performance_analytics' as const } as const;
// The existing API client used the legacy page-shaped path; preserve it pending host API contract confirmation.
export const ADMIN_HR_PERFORMANCE_API_URL = '/frontend_admin/admin_staff_franchise/admin_hr/admin_hr_performance' as const;

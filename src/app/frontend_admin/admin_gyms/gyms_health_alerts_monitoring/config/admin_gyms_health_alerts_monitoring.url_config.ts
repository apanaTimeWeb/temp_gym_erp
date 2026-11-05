// RESPONSIBILITY: Centralizes route and endpoint constants for gym_health_alerts_monitoring; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_gyms_health_alerts_monitoring.url_config.ts → internal route constants or existing backend API URLs.

// admin_gym_health_alerts_url_config.ts
// Owned by: frontend_admin/admin_gym_health_alerts feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminGymsHealthAlertsMonitoringPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_GYM_HEALTH_ALERTS_ROUTES = {
  root: '/frontend_admin/admin_gyms/gyms_health_alerts_monitoring' as const,
  members: '/frontend_admin/admin_members' as const,
  finance: '/frontend_admin/admin_finance' as const,
  hr: '/frontend_admin/admin_hr' as const,
  attendance: '/frontend_admin/admin_attendance' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_GYM_HEALTH_ALERTS_ALERTS_URL = '/frontend_admin/admin_gyms/gyms_health_alerts_monitoring' as const;
export const ADMIN_GYM_HEALTH_ALERTS_SUMMARY_URL = '/admin/gym-health-alerts/summary' as const;
export const ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL = (id: string) => `/admin/gym-health-alerts/${encodeAdminGymsHealthAlertsMonitoringPathSegment(id)}/dismiss` as const;

export const ADMIN_GYM_HEALTH_ALERTS_URLS = {
  alerts: ADMIN_GYM_HEALTH_ALERTS_ALERTS_URL,
  summary: ADMIN_GYM_HEALTH_ALERTS_SUMMARY_URL,
  dismiss: ADMIN_GYM_HEALTH_ALERTS_DISMISS_URL,
} as const;

export const ADMIN_GYM_HEALTH_ALERTS_API = ADMIN_GYM_HEALTH_ALERTS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

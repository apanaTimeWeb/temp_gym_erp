// RESPONSIBILITY: Centralizes route and endpoint constants for dashboard_overview; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_dashboard_overview.url_config.ts → internal route constants or existing backend API URLs.

// admin_dashboard_url_config.ts
// Owned by: frontend_admin/admin_dashboard feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_DASHBOARD_ROUTES = {
  root: '/frontend_admin/admin_dashboard/dashboard_overview' as const,
  auditLogs: '/frontend_admin/admin_security/security_audit_logs_explorer' as const,
  members: '/frontend_admin/admin_members' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_DASHBOARD_BASE_URL = '/frontend_admin/admin_dashboard' as const;
export const ADMIN_DASHBOARD_STATS_URL = '/admin/dashboard/fetchDashboardStats' as const;

export const ADMIN_DASHBOARD_URLS = {
  base: ADMIN_DASHBOARD_BASE_URL,
  stats: ADMIN_DASHBOARD_STATS_URL,
} as const;

export const ADMIN_DASHBOARD_API = ADMIN_DASHBOARD_URLS;

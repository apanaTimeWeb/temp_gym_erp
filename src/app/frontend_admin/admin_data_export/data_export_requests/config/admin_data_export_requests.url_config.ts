// RESPONSIBILITY: Centralizes route and endpoint constants for data_export_requests; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_data_export_requests.url_config.ts → internal route constants or existing backend API URLs.

// admin_data_export_url_config.ts
// Owned by: frontend_admin/admin_data_export feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_DATA_EXPORT_ROUTES = {
  root: '/frontend_admin/admin_data_export/data_export_requests' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_DATA_EXPORT_API = {
} as const;

// Canonical module URL registry. Backend endpoints remain intentionally empty until an authoritative contract is supplied.
export const ADMIN_DATA_EXPORT_URLS = {
  ROUTES: ADMIN_DATA_EXPORT_ROUTES,
  API: ADMIN_DATA_EXPORT_API,
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

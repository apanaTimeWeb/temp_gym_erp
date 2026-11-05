// RESPONSIBILITY: Centralizes route and endpoint constants for permissions_management; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_security_permissions_management.url_config.ts → internal route constants or existing backend API URLs.

// admin_permissions_url_config.ts
// Owned by: frontend_admin/admin_permissions feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Keep server-provided IDs within one route segment; dot-only values are
 * reserved by URL normalization and must never become parent paths. */
function encodeSecurityPermissionsManagementPathSegment(id: string): string {
  if (id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_PERMISSIONS_ROUTES = {
  root: '/frontend_admin/admin_security/security_permissions_management' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PERMISSIONS_PERMISSIONS_URL = '/frontend_admin/admin_security/security_permissions_management' as const;
export const ADMIN_PERMISSIONS_OVERRIDES_URL = '/admin/permissions/overrides' as const;
export const ADMIN_PERMISSIONS_STAFF_URL = (staffId: string) => `/admin/permissions/${encodeSecurityPermissionsManagementPathSegment(staffId)}` as const;
export const ADMIN_PERMISSIONS_RESET_URL = (staffId: string) => `/admin/permissions/${encodeSecurityPermissionsManagementPathSegment(staffId)}/reset` as const;

export const ADMIN_PERMISSIONS_URLS = {
  permissions: ADMIN_PERMISSIONS_PERMISSIONS_URL,
  overrides: ADMIN_PERMISSIONS_OVERRIDES_URL,
  staff: ADMIN_PERMISSIONS_STAFF_URL,
  reset: ADMIN_PERMISSIONS_RESET_URL,
} as const;

export const ADMIN_PERMISSIONS_API = ADMIN_PERMISSIONS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

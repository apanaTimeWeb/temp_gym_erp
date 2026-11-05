// RESPONSIBILITY: Centralizes route and endpoint constants for branches_directory; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_gyms_branches_directory.url_config.ts → internal route constants or existing backend API URLs.

// admin_branches_url_config.ts
// Owned by: frontend_admin/admin_branches feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminGymsBranchesDirectoryPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_BRANCHES_ROUTES = {
  root: '/frontend_admin/admin_gyms/gyms_branches_directory' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_BRANCHES_BASE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_BRANCHES_DETAIL_URL = (branchId: string) => `/admin/branches/${encodeAdminGymsBranchesDirectoryPathSegment(branchId)}` as const;
export const ADMIN_BRANCHES_DETAIL_ROUTE_PATTERN = '/admin/branches/:branchId' as const;

export const ADMIN_BRANCHES_URLS = {
  base: ADMIN_BRANCHES_BASE_URL,
  detail: ADMIN_BRANCHES_DETAIL_URL,
  detailPattern: ADMIN_BRANCHES_DETAIL_ROUTE_PATTERN,
} as const;

export const ADMIN_BRANCHES_API = ADMIN_BRANCHES_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

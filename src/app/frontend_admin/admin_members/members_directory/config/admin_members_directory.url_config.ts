// RESPONSIBILITY: Centralizes route and endpoint constants for members_directory; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_members_directory.url_config.ts → internal route constants or existing backend API URLs.

// admin_members_url_config.ts
// Owned by: frontend_admin/admin_members feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminMembersDirectoryPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_MEMBERS_ROUTES = {
  root: '/frontend_admin/admin_members/members_directory' as const,
  detail: (memberId: string) => `${ADMIN_MEMBERS_ROUTES.root}?memberId=${encodeURIComponent(memberId)}` as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_MEMBERS_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_MEMBERS_BASE_URL = '/frontend_admin/admin_members' as const;
export const ADMIN_MEMBERS_SUMMARY_URL = '/admin/members/summary' as const;
export const ADMIN_MEMBERS_LIST_URL = '/admin/members/list' as const;
export const ADMIN_MEMBERS_DETAIL_URL = (memberId: string) => `/admin/members/${encodeAdminMembersDirectoryPathSegment(memberId)}` as const;
export const ADMIN_MEMBERS_EXPORT_URL = '/admin/members/export' as const;

export const ADMIN_MEMBERS_URLS = {
  branchReference: ADMIN_MEMBERS_BRANCH_REFERENCE_URL,
  base: ADMIN_MEMBERS_BASE_URL,
  summary: ADMIN_MEMBERS_SUMMARY_URL,
  list: ADMIN_MEMBERS_LIST_URL,
  detail: ADMIN_MEMBERS_DETAIL_URL,
  export: ADMIN_MEMBERS_EXPORT_URL,
} as const;

export const ADMIN_MEMBERS_API = ADMIN_MEMBERS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

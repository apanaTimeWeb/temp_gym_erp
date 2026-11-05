// RESPONSIBILITY: Centralizes route and endpoint constants for blacklist_management; it does not perform navigation or implement transport behavior.
// DATA FLOW: page/navigation/API client → this URL contract → canonical route or request endpoint (admin_blacklist/blacklist_management/config/admin_members_blacklist_management.url_config.ts)

// admin_blacklist_url_config.ts
// Owned by: frontend_admin/admin_blacklist feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminMembersBlacklistManagementPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_BLACKLIST_ROUTES = {
  root: '/frontend_admin/admin_members/members_blacklist_management' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_BLACKLIST_BASE_URL = '/admin/blacklist' as const;
export const ADMIN_BLACKLIST_KPIS_URL = '/admin/blacklist/kpis' as const;
export const ADMIN_BLACKLIST_DETAIL_URL = (id: string) => `/admin/blacklist/${encodeAdminMembersBlacklistManagementPathSegment(id)}` as const;
export const ADMIN_BLACKLIST_REMOVE_URL = (id: string) => `/admin/blacklist/${encodeAdminMembersBlacklistManagementPathSegment(id)}/remove` as const;
export const ADMIN_BLACKLIST_PROPAGATE_URL = (id: string) => `/admin/blacklist/${encodeAdminMembersBlacklistManagementPathSegment(id)}/propagate` as const;

export const ADMIN_BLACKLIST_URLS = {
  base: ADMIN_BLACKLIST_BASE_URL,
  kpis: ADMIN_BLACKLIST_KPIS_URL,
  detail: ADMIN_BLACKLIST_DETAIL_URL,
  remove: ADMIN_BLACKLIST_REMOVE_URL,
  propagate: ADMIN_BLACKLIST_PROPAGATE_URL,
} as const;

export const ADMIN_BLACKLIST_API = ADMIN_BLACKLIST_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

// RESPONSIBILITY: Centralizes route and endpoint constants for profile_overview; it does not perform navigation or implement transport behavior.
// DATA FLOW: page/navigation/API client → this URL contract → canonical route or request endpoint (admin_profile/profile_overview/config/admin_profile_overview.url_config.ts)

// admin_profile_url_config.ts
// Owned by: frontend_admin/admin_profile feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
// The supplied snapshot is the authoritative contract for these profile endpoint paths; do not normalize paths without an explicit backend contract.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_PROFILE_ROUTES = {
  root: '/frontend_admin/admin_profile/profile_overview' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PROFILE_BASE_URL = '/frontend_admin/admin_profile' as const;
export const ADMIN_PROFILE_FETCH_PROFILE_URL = '/admin/adminProfile/fetchProfile' as const;
export const ADMIN_PROFILE_UPDATE_PROFILE_URL = '/admin/adminProfile/updateProfile' as const;
export const ADMIN_PROFILE_UPDATE_PASSWORD_URL = '/admin/adminProfile/updatePassword' as const;

export const ADMIN_PROFILE_URLS = {
  base: ADMIN_PROFILE_BASE_URL,
  fetchProfile: ADMIN_PROFILE_FETCH_PROFILE_URL,
  updateProfile: ADMIN_PROFILE_UPDATE_PROFILE_URL,
  updatePassword: ADMIN_PROFILE_UPDATE_PASSWORD_URL,
} as const;

export const ADMIN_PROFILE_API = ADMIN_PROFILE_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

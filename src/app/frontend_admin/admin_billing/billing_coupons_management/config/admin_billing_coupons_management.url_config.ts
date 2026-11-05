// RESPONSIBILITY: Centralizes route and endpoint constants for coupons_management; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_billing_coupons_management.url_config.ts → internal route constants or existing backend API URLs.

// admin_coupons_url_config.ts
// Owned by: frontend_admin/admin_coupons feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminBillingCouponsManagementPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_COUPONS_ROUTES = {
  root: '/frontend_admin/admin_billing/billing_coupons_management' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_COUPONS_BASE_URL = '/admin/coupons' as const;
export const ADMIN_COUPONS_KPIS_URL = '/admin/coupons/kpis' as const;
export const ADMIN_COUPONS_DETAIL_URL = (id: string) => `/admin/coupons/${encodeAdminBillingCouponsManagementPathSegment(id)}` as const;
export const ADMIN_COUPONS_TOGGLE_URL = (id: string) => `/admin/coupons/${encodeAdminBillingCouponsManagementPathSegment(id)}/toggle` as const;

export const ADMIN_COUPONS_URLS = {
  base: ADMIN_COUPONS_BASE_URL,
  kpis: ADMIN_COUPONS_KPIS_URL,
  detail: ADMIN_COUPONS_DETAIL_URL,
  toggle: ADMIN_COUPONS_TOGGLE_URL,
} as const;

export const ADMIN_COUPONS_API = ADMIN_COUPONS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

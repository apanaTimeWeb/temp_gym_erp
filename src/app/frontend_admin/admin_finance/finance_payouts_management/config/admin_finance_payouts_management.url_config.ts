// RESPONSIBILITY: Centralizes route and endpoint constants for finance_payouts_management; it does not perform navigation or implement transport behavior.
// DATA FLOW: page/navigation/API client → this URL contract → canonical route or request endpoint (admin_finance/finance_payouts_management/config/admin_finance_payouts_management.url_config.ts)

// admin_payouts_url_config.ts
// Owned by: frontend_admin/admin_finance/finance_payouts_management
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminFinancePayoutsManagementPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_PAYOUTS_ROUTES = {
  root: '/frontend_admin/admin_finance/finance_payouts_management' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PAYOUTS_BASE_URL = '/admin/payouts' as const;
export const ADMIN_PAYOUTS_PNL_URL = '/admin/payouts/pnl' as const;
export const ADMIN_PAYOUTS_KPIS_URL = '/admin/payouts/kpis' as const;
export const ADMIN_PAYOUTS_DETAIL_URL = (id: string) => `/admin/payouts/${encodeAdminFinancePayoutsManagementPathSegment(id)}` as const;

export const ADMIN_PAYOUTS_URLS = {
  base: ADMIN_PAYOUTS_BASE_URL,
  pnl: ADMIN_PAYOUTS_PNL_URL,
  kpis: ADMIN_PAYOUTS_KPIS_URL,
  detail: ADMIN_PAYOUTS_DETAIL_URL,
} as const;

export const ADMIN_PAYOUTS_API = ADMIN_PAYOUTS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

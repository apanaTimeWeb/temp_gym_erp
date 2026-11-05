// RESPONSIBILITY: Centralizes route and endpoint constants for finance_summary; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_finance_summary.url_config.ts → internal route constants or existing backend API URLs.

// admin_finance_url_config.ts
// Owned by: frontend_admin/admin_finance feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Keep server-provided IDs within one route segment; dot-only values are
 * reserved by URL normalization and must never become parent paths. */
function encodeFinanceSummaryPathSegment(id: string): string {
  if (id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_FINANCE_ROUTES = {
  root: '/frontend_admin/admin_finance/finance_summary' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_FINANCE_PAYMENTS_BASE_URL = '/admin/finance/payments' as const;
export const ADMIN_FINANCE_PAYMENTS_URL = '/admin/finance/payments/fetchPayments' as const;
export const ADMIN_FINANCE_EXPENSES_URL = '/admin/finance/payments/fetchExpenses' as const;
export const ADMIN_FINANCE_SUMMARY_URL = '/admin/finance/summary' as const;
export const ADMIN_FINANCE_PENDING_DUES_URL = '/admin/finance/pending-dues' as const;
export const ADMIN_FINANCE_PAYMENTS_BY_MEMBER_URL = (memberId: string) => `/admin/finance/payments/member/${encodeFinanceSummaryPathSegment(memberId)}` as const;

export const ADMIN_FINANCE_URLS = {
  paymentsBase: ADMIN_FINANCE_PAYMENTS_BASE_URL,
  payments: ADMIN_FINANCE_PAYMENTS_URL,
  expenses: ADMIN_FINANCE_EXPENSES_URL,
  summary: ADMIN_FINANCE_SUMMARY_URL,
  pendingDues: ADMIN_FINANCE_PENDING_DUES_URL,
  paymentsByMember: ADMIN_FINANCE_PAYMENTS_BY_MEMBER_URL,
} as const;

export const ADMIN_FINANCE_API = ADMIN_FINANCE_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

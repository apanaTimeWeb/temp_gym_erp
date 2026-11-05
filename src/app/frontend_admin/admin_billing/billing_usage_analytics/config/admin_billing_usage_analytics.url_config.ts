// RESPONSIBILITY: Centralizes route and endpoint constants for usage_analytics; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_billing_usage_analytics.url_config.ts → internal route constants or existing backend API URLs.

// admin_usage_url_config.ts
// Owned by: frontend_admin/admin_usage feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_USAGE_ROUTES = {
  root: '/frontend_admin/admin_billing/billing_usage_analytics' as const,
  subscriptions: '/frontend_admin/admin_billing/billing_subscriptions_overview' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_USAGE_MY_USAGE_URL = '/admin/usage' as const;
export const ADMIN_USAGE_UPGRADE_REQUEST_URL = '/admin/usage/upgrade-request' as const;

export const ADMIN_USAGE_URLS = {
  myUsage: ADMIN_USAGE_MY_USAGE_URL,
  upgradeRequest: ADMIN_USAGE_UPGRADE_REQUEST_URL,
} as const;

export const ADMIN_USAGE_API = ADMIN_USAGE_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

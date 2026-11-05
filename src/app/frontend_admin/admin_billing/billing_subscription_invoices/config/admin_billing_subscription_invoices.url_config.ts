// RESPONSIBILITY: Centralizes route and endpoint constants for finance_subscription_invoices; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_billing_subscription_invoices.url_config.ts → internal route constants or existing backend API URLs.

// admin_subscriptions_url_config.ts
// Owned by: frontend_admin/admin_subscriptions feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_SUBSCRIPTIONS_ROUTES = {
  root: '/frontend_admin/admin_billing/billing_subscription_invoices' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_SUBSCRIPTIONS_BASE_URL = ADMIN_SUBSCRIPTIONS_ROUTES.root;
export const ADMIN_SUBSCRIPTIONS_SALES_EMAIL_URL = 'mailto:sales@gymsmart.in' as const;
export const ADMIN_SUBSCRIPTIONS_EXTERNAL_URLS = { salesEmail: ADMIN_SUBSCRIPTIONS_SALES_EMAIL_URL } as const;
export const ADMIN_SUBSCRIPTIONS_SUBSCRIPTION_URL = '/admin/subscriptions/fetchSubscription' as const;
export const ADMIN_SUBSCRIPTIONS_PLANS_URL = '/admin/subscriptions/fetchPlans' as const;
export const ADMIN_SUBSCRIPTIONS_INVOICES_URL = '/admin/subscriptions/fetchInvoices' as const;
export const ADMIN_SUBSCRIPTIONS_PAYMENT_METHODS_URL = '/admin/subscriptions/fetchPaymentMethods' as const;
export const ADMIN_SUBSCRIPTIONS_KPIS_URL = '/admin/subscriptions/fetchKPIs' as const;
export const ADMIN_SUBSCRIPTIONS_UPGRADE_PLAN_URL = '/admin/subscriptions/upgradePlan' as const;
export const ADMIN_SUBSCRIPTIONS_TOGGLE_AUTO_RENEW_URL = '/admin/subscriptions/toggleAutoRenew' as const;
export const ADMIN_SUBSCRIPTIONS_SET_DEFAULT_PAYMENT_METHOD_URL = '/admin/subscriptions/setDefaultPaymentMethod' as const;
export const ADMIN_SUBSCRIPTIONS_REMOVE_PAYMENT_METHOD_URL = '/admin/subscriptions/removePaymentMethod' as const;

export const ADMIN_SUBSCRIPTIONS_URLS = {
  base: ADMIN_SUBSCRIPTIONS_BASE_URL,
  subscription: ADMIN_SUBSCRIPTIONS_SUBSCRIPTION_URL,
  plans: ADMIN_SUBSCRIPTIONS_PLANS_URL,
  invoices: ADMIN_SUBSCRIPTIONS_INVOICES_URL,
  paymentMethods: ADMIN_SUBSCRIPTIONS_PAYMENT_METHODS_URL,
  kpis: ADMIN_SUBSCRIPTIONS_KPIS_URL,
  upgradePlan: ADMIN_SUBSCRIPTIONS_UPGRADE_PLAN_URL,
  toggleAutoRenew: ADMIN_SUBSCRIPTIONS_TOGGLE_AUTO_RENEW_URL,
  setDefaultPaymentMethod: ADMIN_SUBSCRIPTIONS_SET_DEFAULT_PAYMENT_METHOD_URL,
  removePaymentMethod: ADMIN_SUBSCRIPTIONS_REMOVE_PAYMENT_METHOD_URL,
} as const;

export const ADMIN_SUBSCRIPTIONS_API = ADMIN_SUBSCRIPTIONS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;

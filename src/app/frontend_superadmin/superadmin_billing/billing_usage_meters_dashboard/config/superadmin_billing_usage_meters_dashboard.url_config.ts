/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_BILLING_USAGE_METERS_DASHBOARD_ROUTES = { MAIN: "/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard" } as const;

export const SUPERADMIN_BILLING_USAGE_METERS_DASHBOARD_API = { BASE: "/superadmin/usage-meters" } as const;



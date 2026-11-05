/** Canonical URL contracts for the autonomous Superadmin Coupons Management sub-module. */
export const SUPERADMIN_BILLING_COUPONS_MANAGEMENT_ROUTES = { MAIN: "/frontend_superadmin/superadmin_billing/billing_coupons_management" } as const;

const SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE = "/superadmin/saas-billing/coupons";
export const SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API = {
  BASE: SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE,
  LIST: SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE,
  CREATE: SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE,
  UPDATE: (id: string) => `${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE}/${encodeURIComponent(id)}`,
  DELETE: (id: string) => `${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE}/${encodeURIComponent(id)}`,
  RESTORE: (id: string) => `${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE}/${encodeURIComponent(id)}/restore`,
  STATUS: (id: string) => `${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE}/${encodeURIComponent(id)}/status`,
  REDEMPTIONS: (id: string) => `${SUPERADMIN_BILLING_COUPONS_MANAGEMENT_API_BASE}/${encodeURIComponent(id)}/redemptions`,
} as const;


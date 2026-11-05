/** Canonical URL contracts for the autonomous Superadmin Plans Management sub-module. */
export const SUPERADMIN_BILLING_PLANS_MANAGEMENT_ROUTES = { MAIN: "/frontend_superadmin/superadmin_billing/billing_plans_management" } as const;

export const SUPERADMIN_BILLING_PLANS_MANAGEMENT_API = {
  BASE: '/superadmin/saas-billing/plans',
  BY_ID: (planId: string) => `/superadmin/saas-billing/plans/${encodeURIComponent(planId)}`,
  ARCHIVE: (planId: string) => `/superadmin/saas-billing/plans/${encodeURIComponent(planId)}/archive`,
  BUSINESS_CONTROLS: { BACKEND_API: { BASE: '/superadmin/saas-billing/plans/business-controls' } },
} as const;


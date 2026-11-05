/**
 * @description Central query-key registry for the owning feature.
 * @dependencies None.
 * @edge-case Query keys are the sole TanStack Query cache identity source for this feature.
 */

export const SUPERADMIN_BILLING_COUPONS_QUERY_KEYS = {
  all: ["superadmin_coupons"] as const,
  list: (params: unknown) => ["superadmin_coupons", "list", params] as const,
  overview: ["superadmin_coupons", "overview"] as const,
  tenants: ["superadmin_coupons", "tenants"] as const,
  subscriptionPlans: ["superadmin_coupons", "subscription-plans"] as const,
  modalTenants: ["superadmin_coupons", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_coupons", "modal-recipient-count"] as const,
  redemptions: (id: string | null) => ["superadmin_coupons", "redemptions", id] as const,
  detailBusinessOverview: (id: string) => ["superadmin_coupons", "detail-business-overview", id] as const,
} as const;

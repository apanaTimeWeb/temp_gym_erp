/** Canonical URL contracts for the autonomous Superadmin Affiliates Management sub-module. */
export const SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES = { DESTINATION_1: "/frontend_superadmin/superadmin_affiliates/affiliates_payout_history", 
  MAIN: "/frontend_superadmin/superadmin_affiliates/affiliates_management",
} as const;

export const SUPERADMIN_AFFILIATES_MANAGEMENT_API = {
  BASE: "/superadmin/affiliates",
  LIST: "/superadmin/affiliates",
  CREATE: "/superadmin/affiliates",
  DETAIL: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}`,
  STATUS: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}/status`,
  DELETE: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}`,
  PAY_COMMISSION: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}/pay`,
  PAYOUT_HISTORY: "/superadmin/affiliates/payout-history",
} as const;


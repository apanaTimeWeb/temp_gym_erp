
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_affiliates/affiliates_payout_history', LEGACY: '/frontend_superadmin/superadmin_affiliates/affiliates_management' } as const),
  SUPERADMIN_AFFILIATES_MANAGEMENT_ROUTES: ({ DESTINATION_1: "/frontend_superadmin/superadmin_affiliates/affiliates_management", 
  MAIN: "/frontend_superadmin/superadmin_affiliates/affiliates_management",
} as const),
} as const;
export const SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_API = {
  ...({
  BASE: "/superadmin/affiliates",
  LIST: "/superadmin/affiliates",
  CREATE: "/superadmin/affiliates",
  DETAIL: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}`,
  STATUS: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}/status`,
  DELETE: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}`,
  PAY_COMMISSION: (id: string) => `/superadmin/affiliates/${encodeURIComponent(id)}/pay`,
  PAYOUT_HISTORY: "/superadmin/affiliates/payout-history",
} as const),
  SUPERADMIN_AFFILIATES_PAYOUT_HISTORY_EXISTING_ENDPOINTS: ({
  "PAYOUT_HISTORY": "/superadmin/affiliates/payout-history"
} as const),
} as const;

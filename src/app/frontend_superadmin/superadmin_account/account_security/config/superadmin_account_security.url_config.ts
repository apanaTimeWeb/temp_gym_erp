
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_ACCOUNT_SECURITY_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_account/account_security', LEGACY: '/frontend_superadmin/superadmin_account/account_profile_overview' } as const),
  SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES: ({ DESTINATION_1: "/frontend_superadmin/superadmin_account/account_profile_overview",  MAIN: "/frontend_superadmin/superadmin_account/account_profile_overview" } as const),
} as const;
export const SUPERADMIN_ACCOUNT_SECURITY_API = {
  ...({
          BASE: '/superadmin/profile',
          PASSWORD: '/superadmin/profile/password',
          CHANGE_CREDENTIALS: '/superadmin/profile/password',
          EXPORT_DATA: '/api/v1/superadmin/export-data',
          TWO_FACTOR: '/superadmin/profile/2fa',
      } as const),
  SUPERADMIN_ACCOUNT_SECURITY_EXISTING_ENDPOINTS: ({
  "PROFILE": "/superadmin/profile",
  "PASSWORD": "/superadmin/profile/password",
  "TWO_FACTOR": "/superadmin/profile/2fa"
} as const),
} as const;

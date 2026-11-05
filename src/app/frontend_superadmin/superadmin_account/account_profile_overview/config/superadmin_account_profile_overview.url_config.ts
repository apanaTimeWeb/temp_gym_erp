/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_ROUTES = { DESTINATION_1: "/frontend_superadmin/superadmin_account/account_security",  MAIN: "/frontend_superadmin/superadmin_account/account_profile_overview" } as const;

export const SUPERADMIN_ACCOUNT_PROFILE_OVERVIEW_API = {
          BASE: '/superadmin/profile',
          PASSWORD: '/superadmin/profile/password',
          CHANGE_CREDENTIALS: '/superadmin/profile/password',
          EXPORT_DATA: '/api/v1/superadmin/export-data',
          TWO_FACTOR: '/superadmin/profile/2fa',
      } as const;



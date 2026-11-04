/**
 * RESPONSIBILITY: Owns the Login E2E route identifiers required by the isolated browser test without importing frontend business modules.
 * DATA FLOW: AuthLogin.spec.ts -> AuthLoginE2eRouteConstants -> browser route navigation/request assertions.
 */

export const AuthLoginE2eRouteConstants = {
  PAGES: {
    LOGIN: '/frontend_auth/auth/login',
    SUPERADMIN_DASHBOARD: '/frontend_superadmin/superadmin_dashboard',
    ADMIN_DASHBOARD: '/frontend_admin/admin_dashboard',
    MANAGER_DASHBOARD: '/frontend_manager/manager_dashboard',
    TRAINER_DASHBOARD: '/frontend_trainer/trainer_dashboard',
  },
  API: {
    REFRESH: '/frontend_auth/auth/refresh',
    LOGOUT: '/frontend_auth/auth/logout',
  },
} as const;

// RESPONSIBILITY: Immutable, verified Auth Login wire routes; historical URLs must never drift.
export const AuthLoginServerUrlConfig = {
  PROXY_API: { SESSION:'/frontend_auth/auth/session', DEMO_LOGIN:'/frontend_auth/auth/demo_login', DEMO_LOGIN_ALIAS:'/frontend_auth/auth/demo-login' },
  BACKEND_API: { LOGIN:'/auth/login' },
} as const;

/**
 * RESPONSIBILITY: Centralizes every internal Auth route, backend Auth endpoint, and role redirect target used by Auth.
 * DATA FLOW: Login UI/API and route handlers -> AuthUrlConfig -> concrete route/endpoint destinations.
 */
export const AuthUrlConfig = {
  PAGES: {
    LOGIN: '/frontend_auth/auth/login',
    LANDING: '/frontend_public/public_landing',
    ADMIN_DASHBOARD: '/frontend_admin/admin_dashboard',
    MANAGER_DASHBOARD: '/frontend_manager/manager_dashboard',
    TRAINER_DASHBOARD: '/frontend_trainer/trainer_dashboard/dashboard_overview',
    SUPERADMIN_DASHBOARD: '/frontend_superadmin/superadmin_dashboard',
  },
  PROXY_API: {
    SESSION: '/frontend_auth/auth/session',
    DEMO_LOGIN: '/frontend_auth/auth/demo_login',
    REFRESH: '/frontend_auth/auth/refresh',
    LOGOUT: '/frontend_auth/auth/logout',
    TOKEN: '/frontend_auth/auth/token',
    EXIT_GHOST_LOGIN: '/frontend_auth/auth/exit_ghost_login',
    SET_COOKIE: '/frontend_auth/auth/set_cookie',
  },
  BACKEND_API: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
} as const;

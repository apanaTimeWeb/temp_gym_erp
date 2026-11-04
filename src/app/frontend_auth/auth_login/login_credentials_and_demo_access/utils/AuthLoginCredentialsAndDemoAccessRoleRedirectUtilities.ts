import { AuthRoleConstants } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/constants/AuthLoginCredentialsAndDemoAccessRoleConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';

import type { AuthRole } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/types/AuthLoginCredentialsAndDemoAccessContracts';



export const AuthRoleRedirectUtilities = {
  /** Maps an Auth role to its documented dashboard route. */
  getDashboardRoute(role: AuthRole): string | null {
    switch (role) {
      case AuthRoleConstants.SUPERADMIN:
        return AuthUrlConfig.PAGES.SUPERADMIN_DASHBOARD;
      case AuthRoleConstants.ADMIN:
        return AuthUrlConfig.PAGES.ADMIN_DASHBOARD;
      case AuthRoleConstants.MANAGER:
        return AuthUrlConfig.PAGES.MANAGER_DASHBOARD;
      case AuthRoleConstants.TRAINER:
        return AuthUrlConfig.PAGES.TRAINER_DASHBOARD;
      default:
        return null;
    }
  },
} as const;

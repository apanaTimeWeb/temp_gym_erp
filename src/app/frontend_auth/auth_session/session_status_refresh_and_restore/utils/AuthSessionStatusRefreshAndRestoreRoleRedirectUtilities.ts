import { AuthRoleConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreRoleConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';



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

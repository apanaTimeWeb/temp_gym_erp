import { describe, expect, it } from 'vitest';

import { AuthRoleConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreRoleConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';

import { AuthRoleRedirectUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreRoleRedirectUtilities';



describe('AuthRoleRedirectUtilities', () => {
  it('maps every supported role to its documented dashboard route', () => {
    expect(AuthRoleRedirectUtilities.getDashboardRoute(AuthRoleConstants.SUPERADMIN)).toBe(AuthUrlConfig.PAGES.SUPERADMIN_DASHBOARD);
    expect(AuthRoleRedirectUtilities.getDashboardRoute(AuthRoleConstants.ADMIN)).toBe(AuthUrlConfig.PAGES.ADMIN_DASHBOARD);
    expect(AuthRoleRedirectUtilities.getDashboardRoute(AuthRoleConstants.MANAGER)).toBe(AuthUrlConfig.PAGES.MANAGER_DASHBOARD);
    expect(AuthRoleRedirectUtilities.getDashboardRoute(AuthRoleConstants.TRAINER)).toBe(AuthUrlConfig.PAGES.TRAINER_DASHBOARD);
  });
});

import { AuthRoleConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreRoleConstants';

import { AuthMockPublicFixtures } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockPublicFixtures';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';

import type { AuthMockDemoEntry } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreMockTypes';

// RESPONSIBILITY: Owns credential-bearing demo fixture records that are restricted to server/test execution and never exposed to browser UI.

export const AuthMockFixtures = {
  USERS: {
    [AuthRoleConstants.SUPERADMIN]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.SUPERADMIN] },
    [AuthRoleConstants.ADMIN]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.ADMIN] },
    [AuthRoleConstants.MANAGER]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.MANAGER] },
    [AuthRoleConstants.TRAINER]: { password: 'demo123', user: AuthMockPublicFixtures.USERS[AuthRoleConstants.TRAINER] },
  } satisfies Record<AuthRole, AuthMockDemoEntry>,
} as const;

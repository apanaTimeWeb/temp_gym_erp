import { AuthMockFixturesApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockFixturesApi';

import { AuthMockBackendLoginHandlers } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/handlers/AuthSessionStatusRefreshAndRestoreMockBackendLoginHandlers';

import { AuthMockBackendSessionHandlers } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/handlers/AuthSessionStatusRefreshAndRestoreMockBackendSessionHandlers';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';

// RESPONSIBILITY: Aggregates the module-owned upstream Auth MSW handlers for test/server transport scenarios.

export const AuthMockBackendHandlers = [
  ...AuthMockBackendLoginHandlers,
  ...AuthMockBackendSessionHandlers,
] as const;

export const AuthMockBackendHandlersTestApi = {
  reset(): void {
    AuthMockFixturesApi.resetMockSessions();
  },
  seed(role: AuthRole) {
    return AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole(role).user);
  },
} as const;

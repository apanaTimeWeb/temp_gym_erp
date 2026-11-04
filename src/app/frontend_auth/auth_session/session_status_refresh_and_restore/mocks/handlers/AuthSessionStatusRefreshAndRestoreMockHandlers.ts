import { AuthMockBackendHandlers, AuthMockBackendHandlersTestApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/handlers/AuthSessionStatusRefreshAndRestoreMockBackendHandlers';

import { AuthMockBrowserHandlers } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/handlers/AuthSessionStatusRefreshAndRestoreMockBrowserHandlers';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';



/**
 * Test-only upstream handler set used by route-level integration tests; proxy requests are executed through the real Auth route handlers.
 */
export const AuthMockHandlers = [
  ...AuthMockBrowserHandlers,
  ...AuthMockBackendHandlers,
] as const;

/**
 * Test-only controls for resetting and seeding mutable Auth mock session state.
 */
export const AuthMockHandlersTestApi = {
  reset(): void {
    AuthMockBackendHandlersTestApi.reset();
  },
  seed(role: AuthRole) {
    return AuthMockBackendHandlersTestApi.seed(role);
  },
} as const;

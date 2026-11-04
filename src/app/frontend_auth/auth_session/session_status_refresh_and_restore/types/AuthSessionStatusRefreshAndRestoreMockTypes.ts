import type { AuthMockPublicFixtures } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockPublicFixtures';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';

import type { AuthUser } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';



/** Mock-only demo identity containing a development credential and public user shape. */
export interface AuthMockDemoEntry {
  password: string;
  user: AuthUser;
}

/** Active mutable mock session record indexed by access token. */
export interface AuthMockSession {
  user: AuthUser;
  refreshToken: string;
}

/** Access/refresh credentials issued by the mutable mock session API. */
export interface AuthMockSessionCredentials {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

/** Login idempotency record preserving the original intent and resulting mock session. */
export interface AuthMockIdempotencyRecord {
  fingerprint: string;
  session: AuthMockSessionCredentials;
}

/** Refresh idempotency record preserving the original refresh intent and resulting tokens. */
export interface AuthMockRefreshIdempotencyRecord {
  fingerprint: string;
  tokens: { accessToken: string; refreshToken: string };
}

/** Public browser-safe Auth user shape derived from the module's role fixtures. */
export type AuthMockBrowserUser = (typeof AuthMockPublicFixtures.USERS)[AuthRole];

/** Browser-side idempotency record; it never stores credential-bearing secrets. */
export interface AuthMockBrowserIdempotencyRecord {
  fingerprint: string;
  user: AuthMockBrowserUser;
}

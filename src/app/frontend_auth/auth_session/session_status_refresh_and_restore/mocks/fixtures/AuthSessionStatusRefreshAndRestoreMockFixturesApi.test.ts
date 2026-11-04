import { beforeEach, describe, expect, it } from 'vitest';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockFixturesApi';



describe('AuthMockFixturesApi', () => {
  beforeEach(() => {
    AuthMockFixturesApi.resetMockSessions();
  });

  it('supports a real mutable create -> resolve -> refresh -> revoke lifecycle', () => {
    const user = AuthMockFixturesApi.findByRole('ADMIN').user;
    const issued = AuthMockFixturesApi.issueSession(user);

    expect(AuthMockFixturesApi.resolveUserByAccessToken(issued.accessToken)).toEqual(user);

    const refreshed = AuthMockFixturesApi.refreshSession(issued.refreshToken);
    expect(refreshed).not.toBeNull();
    expect(refreshed?.accessToken).not.toBe(issued.accessToken);
    expect(AuthMockFixturesApi.resolveUserByAccessToken(issued.accessToken)).toBeNull();
    expect(AuthMockFixturesApi.resolveUserByAccessToken(refreshed?.accessToken ?? '')).toEqual(user);

    AuthMockFixturesApi.revokeSession(refreshed?.accessToken, refreshed?.refreshToken);
    expect(AuthMockFixturesApi.resolveUserByAccessToken(refreshed?.accessToken ?? '')).toBeNull();
    expect(AuthMockFixturesApi.refreshSession(issued.refreshToken)).toBeNull();
  });

  it('reuses a refresh idempotency key for the same refresh-token intent and flags changed intent', () => {
    const adminSession = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('ADMIN').user);
    const firstRefresh = AuthMockFixturesApi.refreshSession(adminSession.refreshToken, 'refresh-key');
    expect(firstRefresh).not.toBeNull();
    expect(AuthMockFixturesApi.isRefreshIdempotencyConflict('refresh-key', adminSession.refreshToken)).toBe(false);

    const replayRefresh = AuthMockFixturesApi.refreshSession(adminSession.refreshToken, 'refresh-key');
    expect(replayRefresh).toEqual(firstRefresh);

    const managerSession = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('MANAGER').user);
    expect(AuthMockFixturesApi.isRefreshIdempotencyConflict('refresh-key', managerSession.refreshToken)).toBe(true);
    expect(AuthMockFixturesApi.refreshSession(managerSession.refreshToken, 'refresh-key')).toBeNull();
  });

  it('rejects a changed intent when an idempotency key is reused', () => {
    const user = AuthMockFixturesApi.findByRole('ADMIN').user;
    const first = AuthMockFixturesApi.issueSessionForIntent(user, 'same-key', 'fingerprint-a');
    expect(first).not.toBeNull();
    const changed = AuthMockFixturesApi.issueSessionForIntent(user, 'same-key', 'fingerprint-b');
    expect(changed).toBeNull();
  });
});

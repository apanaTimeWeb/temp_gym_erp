import { describe, expect, it } from 'vitest';

import { AUTH_QUERY_KEYS } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreQueryKeys';



describe('AUTH_QUERY_KEYS', () => {
  it('keeps Auth token status under the module namespace', () => {
    expect(AUTH_QUERY_KEYS.tokenStatus()).toEqual(['auth', 'token-status']);
  });
});

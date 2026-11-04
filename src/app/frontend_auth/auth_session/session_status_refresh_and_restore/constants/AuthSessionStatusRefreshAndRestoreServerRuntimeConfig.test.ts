import { afterEach, describe, expect, it, vi } from 'vitest';

import { AuthServerRuntimeConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreServerRuntimeConfig';



describe('AuthServerRuntimeConfig', () => {
  afterEach(() => vi.unstubAllEnvs());
  it('requires non-production runtime and the private server gate for demo sessions', () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('AUTH_DEMO_MODE', 'true');
    expect(AuthServerRuntimeConfig.isLoginDemoEnabled()).toBe(true);
  });

  it('always disables demo sessions in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('AUTH_DEMO_MODE', 'true');
    expect(AuthServerRuntimeConfig.isLoginDemoEnabled()).toBe(false);
  });
});

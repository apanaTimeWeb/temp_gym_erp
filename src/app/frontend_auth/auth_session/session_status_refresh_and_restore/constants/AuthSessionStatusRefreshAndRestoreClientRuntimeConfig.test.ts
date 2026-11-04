import { afterEach, describe, expect, it, vi } from 'vitest';

import { AuthClientRuntimeConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreClientRuntimeConfig';



const authTestEnv = vi.hoisted(() => ({
  NODE_ENV: 'test' as 'development' | 'test' | 'production',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
}));

vi.mock('@/config/env', () => ({ env: authTestEnv }));

describe('AuthClientRuntimeConfig', () => {
  afterEach(() => vi.unstubAllEnvs());
  it('enables demo presentation only for non-production runtime with the explicit public gate', () => {
    vi.stubEnv('NODE_ENV', 'test');
    authTestEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    expect(AuthClientRuntimeConfig.isLoginDemoEnabled()).toBe(true);
  });

  it('disables demo presentation in production even when the public flag is true', () => {
    vi.stubEnv('NODE_ENV', 'production');
    authTestEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'true';
    expect(AuthClientRuntimeConfig.isLoginDemoEnabled()).toBe(false);
  });
});

import { StatusCodes } from 'http-status-codes';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthBackendTransport } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/api/AuthSessionStatusRefreshAndRestoreBackendTransport';

import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';

import { AuthMockFixturesApi } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/mocks/fixtures/AuthSessionStatusRefreshAndRestoreMockFixturesApi';

import { AuthUrlConfig } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/config/auth_session_status_refresh_and_restore.url_config';

import { AuthSessionServerUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreSessionServerUtilities';



const authTestEnv = vi.hoisted(() => ({
  NODE_ENV: 'test' as 'development' | 'test' | 'production',
  NEXT_PUBLIC_AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  AUTH_DEMO_MODE: 'false' as 'true' | 'false',
  NEXT_PUBLIC_API_URL: 'http://localhost:4000',
}));

vi.mock('@/config/env', () => ({ env: authTestEnv }));
vi.mock('@/app/frontend_auth/auth_session/session_status_refresh_and_restore/api/AuthSessionStatusRefreshAndRestoreBackendTransport', () => ({
  AuthBackendTransport: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('AuthSessionServerUtilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthBackendTransport.get).mockReset();
    AuthMockFixturesApi.resetMockSessions();
    authTestEnv.NODE_ENV = 'test';
    authTestEnv.AUTH_DEMO_MODE = 'false';
    authTestEnv.NEXT_PUBLIC_AUTH_DEMO_MODE = 'false';
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('resolves production identity from the authoritative backend session endpoint', async () => {
    vi.mocked(AuthBackendTransport.get).mockResolvedValue({
      response: new Response(JSON.stringify({
        success: true,
        message: 'Session identity',
        data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', tenantId: 'tenant-demo' },
      }), { status: StatusCodes.OK }),
      payload: {
        success: true,
        message: 'Session identity',
        data: { id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN', tenantId: 'tenant-demo' },
      },
    });

    const user = await AuthSessionServerUtilities.resolveUser('valid-access');

    expect(AuthBackendTransport.get).toHaveBeenCalledWith(AuthUrlConfig.BACKEND_API.ME, { Authorization: `${AuthSessionConstants.AUTHORIZATION_PREFIX}valid-access` });
    expect(user?.id).toBe('u1');
    expect(user?.role).toBe('ADMIN');
  });

  it('resolves a real backend token even when demo mode is enabled', async () => {
    authTestEnv.AUTH_DEMO_MODE = 'true';
    vi.mocked(AuthBackendTransport.get).mockResolvedValueOnce({
      response: new Response(JSON.stringify({
        success: true, message: 'verified', data: {
          id: 'real-u1', name: 'Backend User', email: 'real@example.com', role: 'ADMIN',
        }
      }), { status: StatusCodes.OK }),
      payload: {
        success: true, message: 'verified', data: {
          id: 'real-u1', name: 'Backend User', email: 'real@example.com', role: 'ADMIN',
        }
      },
    });
    const resolved = await AuthSessionServerUtilities.resolveUser('real_backend_access_token');
    expect(resolved?.id).toBe('real-u1');
    expect(AuthBackendTransport.get).toHaveBeenCalledOnce();
  });

  it('resolves development demo identity only from the module-owned access-token session registry', async () => {
    vi.stubEnv('AUTH_DEMO_MODE', 'true');
    authTestEnv.AUTH_DEMO_MODE = 'true';
    const issued = AuthMockFixturesApi.issueSession(AuthMockFixturesApi.findByRole('ADMIN').user);

    const user = await AuthSessionServerUtilities.resolveUser(issued.accessToken);
    const forged = await AuthSessionServerUtilities.resolveUser('forged-access');

    expect(user?.id).toBe('mock-admin');
    expect(forged).toBeNull();
    expect(AuthBackendTransport.get).toHaveBeenCalledOnce();
  });
});

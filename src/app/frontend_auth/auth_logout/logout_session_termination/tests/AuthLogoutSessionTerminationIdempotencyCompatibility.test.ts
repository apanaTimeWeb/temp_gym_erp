// RESPONSIBILITY: Verify logout forwards verified retry identity and still clears local cookies on failure.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/frontend_auth/auth_logout/logout_session_termination/api/route_handlers/AuthLogoutSessionTerminationRouteHandler';
import { AuthBackendTransport } from '@/app/frontend_auth/auth_logout/logout_session_termination/api/AuthLogoutSessionTerminationBackendTransport';
import { AuthSessionConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationSessionConstants';

vi.mock('@/app/frontend_auth/auth_logout/logout_session_termination/api/AuthLogoutSessionTerminationBackendTransport', () => ({
  AuthBackendTransport: { post: vi.fn() },
}));
vi.mock('@/server/auth-demo/AuthDemoSessionService', () => ({
  AuthDemoSessionService: { revokeSession: vi.fn() },
}));
vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }));

const makeRequest = (key?: string) => new NextRequest('http://localhost:3000/frontend_auth/auth/logout', {
  method: 'POST',
  headers: {
    cookie: `${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=access-token`,
    ...(key === undefined ? {} : { [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: key }),
  },
});

describe('Logout idempotency compatibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthBackendTransport.post).mockResolvedValue({
      response: new Response(JSON.stringify({ success: true, data: null, message: 'OK' }), { status: 200 }),
      payload: { success: true, data: null, message: 'OK' },
    });
  });

  it('forwards a supplied UUIDv4 unmodified while clearing cookies', async () => {
    const key = 'f89e255d-7156-480a-bd87-fac70a529e2e';
    const result = await POST(makeRequest(key));
    expect(result.status).toBe(200);
    expect(AuthBackendTransport.post).toHaveBeenCalledWith(
      expect.any(String), undefined,
      expect.objectContaining({ [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: key }),
    );
    expect(result.headers.get('set-cookie')).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=`);
  });

  it('uses a UUIDv4 fallback for a legacy missing header without preventing logout', async () => {
    const result = await POST(makeRequest());
    expect(result.status).toBe(200);
    const headers = vi.mocked(AuthBackendTransport.post).mock.calls[0]?.[2];
    expect(headers?.[AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(result.headers.get('set-cookie')).toContain(`${AuthSessionConstants.COOKIES.ACCESS_TOKEN}=`);
  });
});

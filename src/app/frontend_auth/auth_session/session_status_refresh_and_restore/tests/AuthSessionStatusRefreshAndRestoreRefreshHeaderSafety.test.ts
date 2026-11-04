// RESPONSIBILITY: Guard the historical refresh route against silently replacing malformed caller retry keys.
import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/api/route_handlers/AuthSessionStatusRefreshAndRestoreRefreshRouteHandler';
import { AuthSessionConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreSessionConstants';
import { AuthErrorConstants } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/constants/AuthSessionStatusRefreshAndRestoreErrorConstants';

describe('Refresh route UUIDv4 caller intent safety', () => {
  it.each(['not-a-uuid', ' ', '00000000-0000-0000-0000-000000000000'])(
    'rejects present malformed Idempotency-Key %j without rotating cookies',
    async (idempotencyKey) => {
      const request = new NextRequest('http://localhost:3000/frontend_auth/auth/refresh', {
        method: 'POST',
        headers: {
          cookie: `${AuthSessionConstants.COOKIES.REFRESH_TOKEN}=supplied-old-token`,
          [AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY]: idempotencyKey,
        },
      });
      const response = await POST(request);
      const body = await response.json();
      expect(response.status).toBe(400);
      expect(body.errorCode).toBe(AuthErrorConstants.CODE.IDEMPOTENCY_REQUIRED);
      expect(response.headers.get('set-cookie')).toBeNull();
    },
  );
});

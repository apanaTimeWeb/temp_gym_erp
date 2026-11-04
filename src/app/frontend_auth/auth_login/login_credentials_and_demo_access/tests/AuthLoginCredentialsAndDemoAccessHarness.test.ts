// RESPONSIBILITY: Prove the isolated Login MSW server intercepts the verified error scenario.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { AuthUrlConfig } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/config/auth_login_credentials_and_demo_access.url_config';
import { closeMockServer, installMockServer, resetMockServer } from './harness/bootstrap';

beforeAll(installMockServer);
afterEach(resetMockServer);
afterAll(closeMockServer);

describe('Standalone Login MSW harness', () => {
  it('intercepts the documented unavailable-login response without leaking credentials', async () => {
    const response = await fetch(new URL(AuthUrlConfig.PROXY_API.SESSION, 'http://localhost:3000'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gymsmart.com', password: 'test-only' }),
    });
    expect(response.status).toBe(502);
    const payload: unknown = await response.json();
    expect(payload).toMatchObject({ success: false, data: null });
    expect(JSON.stringify(payload)).not.toContain('test-only');
  });
});

import { test, expect } from '@playwright/test';

test.describe('historical auth route compatibility', () => {
  test('cookie-write routes stay retired', async ({ request }) => {
    for (const route of ['/frontend_auth/auth/set_cookie', '/frontend_auth/auth/set-cookie']) {
      const result = await request.post(route);
      expect(result.status()).toBe(410);
    }
  });
  test('refresh without credentials is rejected', async ({ request }) => {
    const result = await request.post('/frontend_auth/auth/refresh');
    expect(result.status()).toBe(401);
  });
});

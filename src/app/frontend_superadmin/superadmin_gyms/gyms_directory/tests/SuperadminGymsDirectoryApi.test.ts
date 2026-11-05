import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiFetch } from '@/lib/api';
import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';

vi.mock('@/lib/api', () => ({ apiFetch: vi.fn() }));

describe('gymsApi.setGhostLoginCookie', () => {
  beforeEach(() => vi.clearAllMocks());

  it('sends only the server-issued token and idempotency key, never synthesized identity claims', async () => {
    vi.mocked(apiFetch).mockResolvedValue({ success: true, data: null , requestId: 'test-request-id'} as never);

    await gymsApi.setGhostLoginCookie('server-issued-token', 'cookie-intent-key');

    expect(apiFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ token: 'server-issued-token' }),
        headers: { 'Idempotency-Key': 'cookie-intent-key' },
      }),
    );
  });
});

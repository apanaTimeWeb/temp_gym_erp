import { describe, expect, it, vi } from 'vitest';

import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreIdempotencyFingerprintUtilities';



describe('AuthIdempotencyFingerprintUtilities', () => {
  it('changes when login credentials change but remains stable for the same normalized intent', async () => {
    const first = await AuthIdempotencyFingerprintUtilities.forLogin({ email: ' Admin@Example.com ', password: 'demo123' });
    const sameIntent = await AuthIdempotencyFingerprintUtilities.forLogin({ email: 'admin@example.com', password: 'demo123' });
    const changedPassword = await AuthIdempotencyFingerprintUtilities.forLogin({ email: 'admin@example.com', password: 'demo124' });
    expect(first).toBe(sameIntent);
    expect(first).not.toBe(changedPassword);
  });

  it('does not depend on random generation for demo intent fingerprints', () => {
    const randomSpy = vi.spyOn(globalThis.crypto, 'randomUUID');
    expect(AuthIdempotencyFingerprintUtilities.forDemoRole('ADMIN')).toBe('demo:ADMIN');
    expect(randomSpy).not.toHaveBeenCalled();
    randomSpy.mockRestore();
  });
});

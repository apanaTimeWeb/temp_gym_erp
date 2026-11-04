import { describe, expect, it } from 'vitest';

import { AuthRequestHeaderUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreRequestHeaderUtilities';



describe('AuthRequestHeaderUtilities', () => {
  it('normalizes an idempotency key and ignores blank values', () => {
    const request = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': '  d94c32fd-32e1-4f11-8bc8-7fe1661fbaac  ' } });
    expect(AuthRequestHeaderUtilities.getIdempotencyKey(request)).toBe('d94c32fd-32e1-4f11-8bc8-7fe1661fbaac');

    const invalidRequest = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': 'intent-1' } });
    expect(AuthRequestHeaderUtilities.getIdempotencyKey(invalidRequest)).toBeNull();

    const blankRequest = new Request('https://example.test/auth', { headers: { 'Idempotency-Key': '   ' } });
    expect(AuthRequestHeaderUtilities.getIdempotencyKey(blankRequest)).toBeNull();
  });
});

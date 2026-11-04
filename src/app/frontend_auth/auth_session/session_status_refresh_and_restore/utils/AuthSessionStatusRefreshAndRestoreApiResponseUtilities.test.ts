import { StatusCodes } from 'http-status-codes';

import { describe, expect, it } from 'vitest';

import { AuthApiResponseUtilities } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/utils/AuthSessionStatusRefreshAndRestoreApiResponseUtilities';



describe('AuthApiResponseUtilities', () => {
  it('creates a canonical successful envelope', async () => {
    const response = AuthApiResponseUtilities.success('ok', { id: 'u1' });
    expect(response.status).toBe(StatusCodes.OK);
    await expect(response.json()).resolves.toEqual({ success: true, message: 'ok', data: { id: 'u1' }, requestId: expect.any(String) });
  });

  it('creates a canonical failure envelope with validation errors when supplied', async () => {
    const response = AuthApiResponseUtilities.failure('invalid', StatusCodes.BAD_REQUEST, 'VALIDATION_ERROR', 'AUTH.TEST.INVALID', [
      { field: 'email', message: 'Invalid email' },
    ]);
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: 'invalid',
      data: null,
      error: 'VALIDATION_ERROR',
      errorCode: 'AUTH.TEST.INVALID',
      requestId: expect.any(String),
      statusCode: StatusCodes.BAD_REQUEST,
      validationErrors: [{ field: 'email', message: 'Invalid email' }],
    });
  });
});

import { AuthSessionConstants } from '@/app/frontend_auth/auth_logout/logout_session_termination/constants/AuthLogoutSessionTerminationSessionConstants';



export const AuthRequestHeaderUtilities = {
  /**
   * Returns a trimmed idempotency key when the caller supplied a usable value.
   * @param request Incoming Auth mutation request.
   * @returns Normalized key or null when absent/blank.
   */
  getIdempotencyKey(request: Pick<Request, 'headers'>): string | null {
    const key = request.headers.get(AuthSessionConstants.HEADERS.IDEMPOTENCY_KEY)?.trim();
    // UUIDv4 is the only accepted idempotency key. Do not forward arbitrary user input.
    const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return key && uuidV4.test(key) ? key : null;
  },
} as const;

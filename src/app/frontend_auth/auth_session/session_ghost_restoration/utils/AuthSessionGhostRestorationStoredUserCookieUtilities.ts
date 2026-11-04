// RESPONSIBILITY: Parse a legacy or stashed Auth identity cookie for compatibility, never authorization.
import { AuthSessionUserCookieSchema } from '@/app/frontend_auth/auth_session/session_ghost_restoration/schemas/AuthSessionGhostRestorationSchema';
import type { AuthUser } from '@/app/frontend_auth/auth_session/session_ghost_restoration/types/AuthSessionGhostRestorationContracts';

/**
 * Safely parses the stashed user identity cookie against the canonical AuthUser schema.
 * @description Attempts both direct JSON and URI-decoded JSON representations without throwing into the route.
 * @dependencies AuthSessionUserCookieSchema.
 * @edge-case Malformed or schema-invalid values resolve to null.
 */
export function parseStoredUser(rawUser: string): AuthUser | null {
  try {
    const direct = AuthSessionUserCookieSchema.safeParse(JSON.parse(rawUser));
    if (direct.success) return direct.data;
    const decoded = AuthSessionUserCookieSchema.safeParse(JSON.parse(decodeURIComponent(rawUser)));
    return decoded.success ? decoded.data : null;
  } catch {
    return null;
  }
}


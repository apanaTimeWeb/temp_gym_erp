import type { AuthLoginCredentials } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';

import type { AuthRole } from '@/app/frontend_auth/auth_session/session_status_refresh_and_restore/types/AuthSessionStatusRefreshAndRestoreContracts';



export const AuthIdempotencyFingerprintUtilities = {
  /** Creates a credential fingerprint from normalized email and password material. */
  async forLogin(credentials: AuthLoginCredentials): Promise<string> {
    const input = `${credentials.email.trim().toLowerCase()}\u0000${credentials.password}`;
    const encoded = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  },

  /** Creates a stable fingerprint from the non-secret demo role. */
  forDemoRole(role: AuthRole): string {
    return `demo:${role}`;
  },
} as const;

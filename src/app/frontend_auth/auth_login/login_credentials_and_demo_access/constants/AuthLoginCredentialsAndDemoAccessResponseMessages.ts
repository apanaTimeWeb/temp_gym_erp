/**
 * RESPONSIBILITY: Owns canonical Auth response messages reused by module API routes and mocks.
 * DATA FLOW: Auth route/mock -> canonical message constant -> ApiResponse message -> consumer.
 */
export const AuthResponseMessages = {
  LOGIN_SUCCESS: 'Login successful',
  SESSION_IDENTITY: 'Session identity',
  SESSION_STATUS: 'Session status',
  REFRESH_SUCCESS: 'Session refreshed',
  LOGOUT_SUCCESS: 'Logged out successfully',
  GHOST_RESTORED: 'Original session restored',
} as const;

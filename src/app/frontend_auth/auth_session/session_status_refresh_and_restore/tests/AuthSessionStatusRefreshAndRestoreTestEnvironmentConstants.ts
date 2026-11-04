/**
 * RESPONSIBILITY: Owns deterministic test-only environment values shared by Auth module tests.
 * DATA FLOW: Auth test harness -> test origin/config constants -> module API/MSW verification.
 * @edge-case These values are never consumed by production Auth runtime paths.
 */
export const AuthTestEnvironmentConstants = {
  ORIGIN: 'http://auth.test',
  BACKEND_ORIGIN: 'http://auth.test:4000',
} as const;

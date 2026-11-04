/**
 * RESPONSIBILITY: Defines non-secret prefixes used only for generated in-memory Auth mock session credentials.
 * DATA FLOW: Mock session generator -> token prefix + generated UUID -> module-local mock session registry.
 * @edge-case These prefixes are not real authentication credentials and never represent production token formats.
 */
export const AuthMockTokenConstants = {
  ACCESS_PREFIX: 'mock_access',
  REFRESH_PREFIX: 'mock_refresh',
} as const;

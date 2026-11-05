// RESPONSIBILITY: Provides the Manager application's named HTTP status constants for module-owned mock and error scenarios.

/**
 * @description Defines the HTTP status codes consumed by Manager frontend mocks and error-path tests.
 * @dependencies No external runtime package is required; values follow the standard HTTP status contract.
 * @edge-case Keeps status values centralized so consumers do not scatter numeric literals.
 */
export const MANAGER_HTTP_STATUS = {
  CONFLICT: 409,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
} as const;

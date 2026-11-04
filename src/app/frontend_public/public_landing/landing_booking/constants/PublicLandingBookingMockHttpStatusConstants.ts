// RESPONSIBILITY: Defines HTTP status codes used by PublicLanding-owned MSW handlers.
/** Named, dependency-free status codes for deterministic feature mock responses. */
export const PUBLIC_LANDING_MOCK_HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
  SERVICE_UNAVAILABLE: 503,
} as const;

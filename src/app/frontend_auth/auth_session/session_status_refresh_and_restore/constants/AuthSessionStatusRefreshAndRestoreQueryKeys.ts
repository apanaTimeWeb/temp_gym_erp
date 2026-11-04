// RESPONSIBILITY: Owns the canonical Auth TanStack Query key registry for authentication server state.

/**
 * Defines the single authoritative TanStack Query key namespace for Auth session state.
 * @description Login and session lifecycle code must use this registry instead of creating parallel cache identities.
 * @dependencies TanStack Query consumes the generated readonly tuples.
 * @edge-case Resource identity is preserved by appending stable resource identifiers when a resource-scoped key is introduced.
 */
export const AUTH_QUERY_KEYS = {
  all: ['auth'] as const,
  tokenStatus: () => [...AUTH_QUERY_KEYS.all, 'token-status'] as const,
} as const;

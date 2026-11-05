/**
 * @description Canonical TanStack Query identity registry for the Team overview feature.
 * @dependencies None.
 * @edge-case Query keys are the sole cache identity source for this feature.
 */
export const SUPERADMIN_TEAM_QUERY_KEYS = {
  all: ['superadmin_team'] as const,
  overview: ['superadmin_team', 'overview'] as const,
} as const;

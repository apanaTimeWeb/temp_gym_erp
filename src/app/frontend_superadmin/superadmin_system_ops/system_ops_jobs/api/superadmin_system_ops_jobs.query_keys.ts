/**
 * @description Canonical TanStack Query key registry for the Superadmin Jobs feature.
 * @invariant Query identity preserves the active list resource identity.
 */
export const SUPERADMIN_JOBS_QUERY_KEYS = {
  all: ['superadmin_system_ops_jobs', 'jobs'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => ['superadmin_system_ops_jobs', 'jobs', queryParams] as const,
} as const;

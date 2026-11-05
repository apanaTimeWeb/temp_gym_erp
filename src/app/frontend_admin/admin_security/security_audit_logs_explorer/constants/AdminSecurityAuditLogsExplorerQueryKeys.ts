// RESPONSIBILITY: Canonical TanStack Query key registry for the AdminAuditLogs Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_audit_logs/audit_logs_explorer/constants/AdminSecurityAuditLogsExplorerQueryKeys.ts)

/**
 * Provides one stable cache-key construction surface with explicit list/detail/resource identity boundaries.
 * @remarks Every server-state consumer in this feature must import this registry rather than inventing literals.
 */
export const ADMIN_AUDIT_LOGS_QUERY_KEYS = {
  all: ['admin_audit_logs'] as const,
  lists: () => [...ADMIN_AUDIT_LOGS_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: unknown) => filters === undefined ? ADMIN_AUDIT_LOGS_QUERY_KEYS.lists() : [...ADMIN_AUDIT_LOGS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...ADMIN_AUDIT_LOGS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ADMIN_AUDIT_LOGS_QUERY_KEYS.details(), id] as const,
  key: (...segments: readonly unknown[]) => [...ADMIN_AUDIT_LOGS_QUERY_KEYS.all, ...segments] as const,
};

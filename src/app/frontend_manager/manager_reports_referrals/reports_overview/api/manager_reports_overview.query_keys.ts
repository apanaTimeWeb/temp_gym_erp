// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager reports module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_REPORTS_OVERVIEW_QUERY_KEYS = {
  all: ['manager_reports'] as const,
  summary: <T extends object>(params?: T) => [...MANAGER_REPORTS_OVERVIEW_QUERY_KEYS.all, 'summary', params] as const,
  report: (reportId: string, range?: string) => [...MANAGER_REPORTS_OVERVIEW_QUERY_KEYS.all, 'report', reportId, range] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerReportsOverviewQueryKeys = MANAGER_REPORTS_OVERVIEW_QUERY_KEYS;

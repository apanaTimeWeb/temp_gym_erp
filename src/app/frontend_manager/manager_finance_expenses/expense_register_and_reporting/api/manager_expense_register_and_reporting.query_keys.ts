// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager expenses module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_EXPENSE_REGISTER_AND_REPORTING_QUERY_KEYS = {
  all: ['manager_expenses'] as const,
  list: (params?: Record<string, string>) => [...MANAGER_EXPENSE_REGISTER_AND_REPORTING_QUERY_KEYS.all, 'list', params] as const,
  stats: (params?: Record<string, string>) => [...MANAGER_EXPENSE_REGISTER_AND_REPORTING_QUERY_KEYS.all, 'stats', params] as const,
  detail: (id: string) => [...MANAGER_EXPENSE_REGISTER_AND_REPORTING_QUERY_KEYS.all, 'detail', id] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerExpenseRegisterAndReportingQueryKeys = MANAGER_EXPENSE_REGISTER_AND_REPORTING_QUERY_KEYS;

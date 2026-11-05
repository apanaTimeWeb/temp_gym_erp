// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager finance module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_QUERY_KEYS = {
  all: ['manager_finance'] as const,
  payments: <T extends object>(params: T) => [...MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_QUERY_KEYS.all, 'payments', params] as const,
  summary: (range: string, startDate = '', endDate = '') => [...MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_QUERY_KEYS.all, 'summary', range, startDate, endDate] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerFinancePaymentsAndSummaryQueryKeys = MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_QUERY_KEYS;

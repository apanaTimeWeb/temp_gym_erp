// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager inquiries module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS = {
  all: ['manager_inquiries'] as const,
  detail: (id: string) => [...MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS.all, 'detail', id] as const,
  list: <T extends object>(params: T) => [...MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS.all, 'list', params] as const,
  stats: <T extends object>(params?: T) => [...MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS.all, 'stats', params ?? {}] as const,
  plans: () => [...MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS.all, 'plans'] as const,
  plansSnapshot: () => [...MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS.all, 'plans-snapshot'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerInquiriesPipelineQueryKeys = MANAGER_INQUIRIES_PIPELINE_QUERY_KEYS;

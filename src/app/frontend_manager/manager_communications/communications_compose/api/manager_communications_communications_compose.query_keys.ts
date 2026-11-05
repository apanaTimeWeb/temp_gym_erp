// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager communications module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS = {
  all: ['manager_communications'] as const,
  campaigns: <T extends object>(params: T) => [...MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS.all, 'campaigns', params] as const,
  kpis: () => [...MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS.all, 'kpis'] as const,
  segment: (segment: string) => [...MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS.all, 'segment', segment] as const,
  automations: () => [...MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS.all, 'automations'] as const,
  churnMembers: () => [...MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS.all, 'churn', 'members'] as const,
  churnKpis: () => [...MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS.all, 'churn', 'kpis'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerCommunicationsCampaignsQueryKeys = MANAGER_COMMUNICATIONS_CAMPAIGNS_QUERY_KEYS;

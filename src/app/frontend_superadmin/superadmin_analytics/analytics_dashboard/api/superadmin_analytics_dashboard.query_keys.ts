/**
 * @description Canonical TanStack Query key registry for the Superadmin Analytics feature.
 * @invariant Query identity preserves the feature resource and every request-shaping parameter.
 */
export const SUPERADMIN_ANALYTICS_QUERY_KEYS = {
  all: ['superadmin_analytics', 'analytics'] as const,
  byRange: (timeRange: string, customStart: string, customEnd: string) => ['superadmin_analytics', 'analytics', timeRange, customStart, customEnd] as const,
  retentionInsights: ['superadmin_analytics', 'analytics_retention_insights'] as const,
} as const;

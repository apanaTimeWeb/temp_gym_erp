// RESPONSIBILITY: Defines feature-local constants and query-key contracts for hr_performance_analytics; it does not contain mutable server data.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsQueryKeys.ts)

export const ADMIN_HR_PERFORMANCE_QUERY_KEYS = {
 all: ['admin_hr_performance'] as const,
 list: (filters?: unknown) => filters === undefined ? ['admin_hr_performance','list'] as const : ['admin_hr_performance','list',filters] as const,
 key: (...segments: readonly unknown[]) => ['admin_hr_performance', ...segments] as const,
};

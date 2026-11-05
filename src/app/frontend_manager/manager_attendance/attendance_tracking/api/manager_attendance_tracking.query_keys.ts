// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager attendance module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
export const MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS = {
  all: ['manager_attendance'] as const,
  list: (params?: Record<string, string>) => [...MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS.all, 'list', params] as const,
  todayStats: () => [...MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS.all, 'todayStats'] as const,
  history: (userId: string, type: string, month: string) => [...MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS.all, 'history', userId, type, month] as const,
  members: (params?: Record<string, string>) => [...MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS.all, 'members', params] as const,
  staff: (params?: Record<string, string>) => [...MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS.all, 'staff', params] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerAttendanceTrackingQueryKeys = MANAGER_ATTENDANCE_TRACKING_QUERY_KEYS;

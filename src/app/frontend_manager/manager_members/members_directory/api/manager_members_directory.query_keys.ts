// RESPONSIBILITY: Owns the canonical TanStack Query key registry for the Manager members module.
/**
 * @description Provides stable, module-namespaced query-key factories so cache entries cannot collide across resources or filters.
 * @dependencies None; consumed by module-owned query and mutation hooks.
 * @edge-case Resource-specific factories include resource identifiers whenever the query represents a specific entity.
 */
function requireMemberResourceId(memberId: string): string {
  if (!memberId.trim()) throw new Error('A non-empty member ID is required for this query key.');
  return memberId;
}

export const MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS = {
  all: ['manager_members'] as const,
  list: <T extends object>(params: T) => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'list', params] as const,
  plansSnapshot: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'plans-snapshot'] as const,
  stats: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'stats'] as const,
  trainers: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'trainers'] as const,
  payments: (memberId: string) => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'payments', requireMemberResourceId(memberId)] as const,
  paymentsDisabled: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'payments', 'disabled'] as const,
  attendance: (memberId: string) => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'attendance', requireMemberResourceId(memberId)] as const,
  attendanceDisabled: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'attendance', 'disabled'] as const,
  detail: (memberId: string) => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'detail', requireMemberResourceId(memberId)] as const,
  detailDisabled: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'detail', 'disabled'] as const,
  workoutPlans: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'workout-plans'] as const,
  dietPlans: () => [...MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS.all, 'diet-plans'] as const,
} as const;

/** Canonical PascalCase alias consumed by module query/mutation hooks. */
export const ManagerMembersDirectoryQueryKeys = MANAGER_MEMBERS_DIRECTORY_QUERY_KEYS;

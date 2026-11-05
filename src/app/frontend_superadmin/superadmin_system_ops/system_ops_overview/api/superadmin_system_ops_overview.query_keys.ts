/**
 * @description Canonical TanStack Query key registry for the Superadmin System Ops feature.
 * @invariant System Ops summary state has one stable cache identity and cannot collide with nested resources.
 */
export const SUPERADMIN_SYSTEM_OPS_OVERVIEW_QUERY_KEYS = {
  all: ['superadmin_system_ops', 'system-ops'] as const,
  summary: ['superadmin_system_ops', 'system-ops', 'summary'] as const,
} as const;

/**
 * @description Canonical TanStack Query key registry for Superadmin schema migrations.
 * @invariant Migration list cache identity is module-owned and stable.
 */
export const SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS = {
  all: ['superadmin_system_ops_migrations', 'system-ops', 'migrations'] as const,
  list: ['superadmin_system_ops_migrations', 'system-ops', 'migrations', 'list'] as const,
} as const;

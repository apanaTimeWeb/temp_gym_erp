/**
 * @description Canonical module-wide constants discovery entrypoint for superadmin_system_ops_migrations.
 * @contract Feature-specific static UI/business configuration is owned by this module boundary.
 * @note Existing feature-local registries are re-exported here to preserve the working baseline.
 */
import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types';

export const SUPERADMIN_MIGRATION_STATUS_CODES = Object.freeze({
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  ROLLED_BACK: 'ROLLED_BACK',
  ROLLBACK: 'ROLLBACK',
  SUCCESS: 'SUCCESS',

} as const);

// RESPONSIBILITY: Feature-owned visual status mapping for schema migration records.
export const SUPERADMIN_MIGRATION_STATUS_STYLES: Record<MigrationLog['status'], string> = {
  COMPLETED: 'bg-success-bg text-success', FAILED: 'bg-danger-bg text-danger', PENDING: 'bg-warning-bg text-warning', IN_PROGRESS: 'bg-primary-subtle text-primary', ROLLED_BACK: 'bg-surface-highlight text-secondary', SUCCESS: 'bg-success-bg text-success', ROLLBACK: 'bg-surface-highlight text-secondary',
};

/** Checks documented syntax only; availability and compatibility remain server-authoritative. */
export function isValidMigrationTargetVersion(value: string): boolean {
  return /^v?\d+(?:\.\d+){1,2}$/.test(value.trim());
}

/**
 * @description Canonical business/status constants owned by the Superadmin Database Backups feature.
 * @contract Backend-driven status literals are defined here and consumed by filters and status presentation inside this module only.
 */
export const SUPERADMIN_BACKUPS_STATUS_CODES = Object.freeze({
  FAILED: 'FAILED',
  IN_PROGRESS: 'IN_PROGRESS',
  HEALTHY: 'HEALTHY',
  SUCCESS: 'SUCCESS',
} as const);

export const SUPERADMIN_BACKUPS_STATUS_COLORS = Object.freeze({
  SUCCESS: 'text-success bg-success-bg',
  HEALTHY: 'text-success bg-success-bg',
  IN_PROGRESS: 'text-primary bg-primary-subtle',
  FAILED: 'text-danger bg-danger-bg',
} as const);

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_BACKUPS_FILTER_STATUS_CODES = Object.freeze({
  ALL: 'ALL',

} as const);

export const SUPERADMIN_BACKUPS_TYPE_CODES = Object.freeze({ ALL: 'ALL', AUTOMATED: 'AUTOMATED', MANUAL: 'MANUAL' } as const);
export const SUPERADMIN_BACKUPS_PAGE_SIZE = 10;
export const SUPERADMIN_BACKUPS_RESTORE_CONFIRMATION_PHRASE = 'RESTORE' as const;

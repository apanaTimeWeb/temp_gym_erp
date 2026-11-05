/**
 * @description Canonical module-wide constants discovery entrypoint for superadmin_system_ops_jobs.
 * @contract Feature-specific static UI/business configuration is owned by this module boundary.
 * @note Existing feature-local registries are re-exported here to preserve the working baseline.
 */
export const SuperadminSystemOpsJobsConstants = {} as const;
export const SUPERADMIN_JOBS_STATUS_CODES = Object.freeze({
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  DELAYED: 'DELAYED',

} as const);

export const SUPERADMIN_JOBS_STATUS_STYLES: Record<keyof typeof SUPERADMIN_JOBS_STATUS_CODES, string> = {
  ACTIVE: 'text-primary bg-primary-subtle',
  COMPLETED: 'text-success bg-success-bg',
  FAILED: 'text-danger bg-danger-bg',
  DELAYED: 'text-warning bg-warning-bg',
  CANCELLED: 'text-secondary bg-surface-highlight',
};

export const SUPERADMIN_JOBS_STATUS_TEXT_COLORS: Record<keyof typeof SUPERADMIN_JOBS_STATUS_CODES, string> = {
  ACTIVE: 'text-primary',
  COMPLETED: 'text-success',
  FAILED: 'text-danger',
  DELAYED: 'text-warning',
  CANCELLED: 'text-secondary',
};

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_JOBS_FILTER_STATUS_CODES = Object.freeze({
  ALL: 'ALL',

} as const);

export const SUPERADMIN_JOBS_QUEUE_CODES = Object.freeze({ BILLING: 'billing', EMAIL: 'email', WEBHOOK: 'webhook', DATABASE: 'database', EXPORT: 'export', MAINTENANCE: 'maintenance' } as const);
export const SUPERADMIN_JOBS_FILTER_QUEUE_CODES = Object.freeze({ ALL: 'ALL', ...SUPERADMIN_JOBS_QUEUE_CODES } as const);
export const SUPERADMIN_JOBS_PAGE_SIZE = 10;

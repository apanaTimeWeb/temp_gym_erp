/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsBackupsScheduleConstants owned by the superadmin_system_ops_backups feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
export const SUPERADMIN_BACKUPS_DEFAULT_CRON = '0 2 * * *';
export const SUPERADMIN_BACKUPS_MIN_RETENTION_DAYS = 1;
export const SUPERADMIN_BACKUPS_MAX_RETENTION_DAYS = 365;

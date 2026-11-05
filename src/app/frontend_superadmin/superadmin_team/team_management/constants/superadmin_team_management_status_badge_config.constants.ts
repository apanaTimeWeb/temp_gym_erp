// RESPONSIBILITY: Owns status-to-semantic-token mapping for the team feature only; no cross-feature business registry.
const STATUS_BADGE_CLASSES: Record<string, string> = {
  ACTIVE: 'bg-success-bg text-success',
  APPROVED: 'bg-success-bg text-success',
  ENABLED: 'bg-success-bg text-success',
  HEALTHY: 'bg-success-bg text-success',
  RESOLVED: 'bg-success-bg text-success',
  SUCCESS: 'bg-success-bg text-success',
  CONNECTED: 'bg-success-bg text-success',
  DELIVERED: 'bg-success-bg text-success',
  VALID: 'bg-success-bg text-success',
  DISABLED: 'bg-danger-bg text-danger',
  FAILED: 'bg-danger-bg text-danger',
  HIGH: 'bg-danger-bg text-danger',
  REVOKED: 'bg-danger-bg text-danger',
  DEGRADED: 'bg-warning-bg text-warning',
  PENDING: 'bg-warning-bg text-warning',
  WAITING: 'bg-warning-bg text-warning',
  WARNING: 'bg-warning-bg text-warning',
  MEDIUM: 'bg-warning-bg text-warning',
  EXPIRING: 'bg-warning-bg text-warning',
  ATTENTION: 'bg-warning-bg text-warning',
  EXPORT_READY: 'bg-success-bg text-success',
  AWAITING_APPROVAL: 'bg-warning-bg text-warning',
  PURGE_SCHEDULED: 'bg-danger-bg text-danger',
};
/** Resolves this feature's business status to the global semantic badge tokens. */
export function getSuperadminTeamStatusBadgeClasses(status: string): string {
  return STATUS_BADGE_CLASSES[status] ?? 'bg-input text-secondary';
}

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_TEAM_STATUS_CODES = Object.freeze({
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',

} as const);

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationBroadcastsBroadcastConstants owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Static UI configuration owned by the Broadcasts module.

/** Single source of truth for persisted broadcast lifecycle statuses. */
export const SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES = ['DRAFT', 'SCHEDULED', 'SENT'] as const;

/** Localized labels are applied at the UI boundary; this registry contains stable keys only. */
export const SUPERADMIN_BROADCAST_STATUS_OPTIONS = [
  { labelKey: 'ui.draft_f03ab16c', value: 'DRAFT' },
  { labelKey: 'ui.scheduled_2b7dabba', value: 'SCHEDULED' },
  { labelKey: 'ui.send_now_db3c809c', value: 'SENT' },
] as const;

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_BROADCAST_STATUS_CODES = Object.freeze({
  ALL: 'ALL',
  FAILED: 'FAILED',
  DRAFT: SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES[0],
  SCHEDULED: SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES[1],
  SENT: SUPERADMIN_BROADCAST_LIFECYCLE_STATUSES[2],
} as const);

export const SUPERADMIN_BROADCAST_QUEUE_STATE_CODES = Object.freeze({
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
} as const);

export const SUPERADMIN_BROADCAST_STATUS_FILTER_CODES = Object.freeze({
  ALL: 'ALL',
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENT: 'SENT',
  FAILED: 'FAILED',
} as const);

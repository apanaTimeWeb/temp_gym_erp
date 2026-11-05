/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAuditComplianceGlobalAuditConstants owned by the superadmin_audit_compliance_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the canonical UI filter values and page sizing for Global Audit.
// BUSINESS CONFIGURATION: These values are feature-owned and are the single local source for audit filters.
export const SUPERADMIN_AUDIT_PAGE_SIZE = 20;
export const SUPERADMIN_AUDIT_SEVERITY_OPTIONS = ['ALL', 'INFO', 'WARNING', 'CRITICAL'] as const;
export const SUPERADMIN_AUDIT_ACTOR_OPTIONS = ['ALL', 'SUPERADMIN', 'SYSTEM', 'TENANT'] as const;

export const SUPERADMIN_AUDIT_SEVERITY_BADGE_CLASSES = {
  CRITICAL: 'bg-danger text-on-danger',
  WARNING: 'bg-warning text-on-warning',
  INFO: 'bg-primary-subtle text-primary',
} as const;

export const SUPERADMIN_AUDIT_FILTER_ALL = 'ALL' as const;

export const SUPERADMIN_AUDIT_ACTOR_ROLES = ['SUPERADMIN', 'ADMIN', 'STAFF', 'MEMBER'] as const;
export const SUPERADMIN_AUDIT_ACTOR_TYPES = ['SUPERADMIN', 'SYSTEM', 'TENANT'] as const;
export const SUPERADMIN_AUDIT_TENANT_STATUS_CODES = { ACTIVE: 'ACTIVE', SUSPENDED: 'SUSPENDED' } as const;
export const SUPERADMIN_AUDIT_SEVERITIES = ['INFO', 'WARNING', 'CRITICAL'] as const;

export const AUDIT_ACTOR_ROLES = SUPERADMIN_AUDIT_ACTOR_ROLES;
export const AUDIT_ACTOR_TYPES = SUPERADMIN_AUDIT_ACTOR_TYPES;
export const AUDIT_SEVERITIES = SUPERADMIN_AUDIT_SEVERITIES;

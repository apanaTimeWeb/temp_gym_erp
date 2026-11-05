/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingPlansQueryKeys owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the canonical TanStack Query keys for the superadmin_billing_plans feature.
export const SUPERADMIN_BILLING_PLANS_QUERY_KEYS = {
  all: ['superadmin_billing_plans'] as const,
  list: (params: Record<string, string>) => ['superadmin_billing_plans', 'list', params] as const,
  businessControls: ['superadmin_billing_plans', 'business-controls'] as const,
};

/** Canonical business/status literals for this feature. */
export const SUPERADMIN_BILLING_PLANS_STATUS_CODES = Object.freeze({
  ALL: 'ALL',
  ARCHIVED: 'ARCHIVED',

} as const);

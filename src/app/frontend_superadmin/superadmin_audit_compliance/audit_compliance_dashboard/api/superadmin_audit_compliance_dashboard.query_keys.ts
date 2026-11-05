/**
 * @description Central query-key registry for Compliance.
 * @dependencies None.
 * @edge-case Stable keys preserve cache identity across retry and mutation recovery.
 */
export const SUPERADMIN_AUDIT_COMPLIANCE_QUERY_KEYS = {
  all: ["superadmin_audit_compliance"] as const,
  overview: ["superadmin_audit_compliance", "overview"] as const,
} as const;

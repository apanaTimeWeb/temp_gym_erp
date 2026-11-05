/** Canonical query keys for the Global Audit feature. */
export const SUPERADMIN_AUDIT_QUERY_KEYS = {
  all: ['superadmin_audit_compliance_global_audit'] as const,
  lists: () => ['superadmin_audit_compliance_global_audit', 'list'] as const,
  list: (params: Record<string, string>) => ['superadmin_audit_compliance_global_audit', 'list', params] as const,
};

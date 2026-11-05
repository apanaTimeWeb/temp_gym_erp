// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_audit_logs/audit_logs_explorer/constants/AdminSecurityAuditLogsExplorerConstants.ts)

export const AUDIT_ITEMS_PER_PAGE = 10;
export const AUDIT_ACTION_OPTIONS = [
  { value: 'all', labelKey: 'audit_logs.AdminAuditLogsFilters.allActions' },
  { value: 'CREATE', labelKey: 'audit_logs.AdminAuditLogsFilters.create' },
  { value: 'UPDATE', labelKey: 'audit_logs.AdminAuditLogsFilters.update' },
  { value: 'DELETE', labelKey: 'audit_logs.AdminAuditLogsFilters.delete' },
  { value: 'LOGIN', labelKey: 'audit_logs.AdminAuditLogsFilters.login' },
  { value: 'PAYMENT', labelKey: 'audit_logs.AdminAuditLogsFilters.payment' },
  { value: 'REFUND', labelKey: 'audit_logs.AdminAuditLogsFilters.refund' },
] as const;
export const AUDIT_ENTITY_OPTIONS = [
  { value: 'all', labelKey: 'audit_logs.AdminAuditLogsFilters.allEntities' },
  { value: 'member', labelKey: 'audit_logs.AdminAuditLogsFilters.member' },
  { value: 'payment', labelKey: 'audit_logs.AdminAuditLogsFilters.paymentEntity' },
  { value: 'staff', labelKey: 'audit_logs.AdminAuditLogsFilters.staff' },
  { value: 'settings', labelKey: 'audit_logs.AdminAuditLogsFilters.settings' },
  { value: 'plan', labelKey: 'audit_logs.AdminAuditLogsFilters.plan' },
] as const;
export const AUDIT_SEVERITY_STYLES = {
  high: 'bg-danger-bg text-danger border border-border',
  medium: 'bg-warning-bg text-warning border border-border',
  low: 'bg-success-bg text-success border border-border',
} as const;

export const AUDIT_ENTITY_STATUS = { PAID: 'PAID', DELETED: 'DELETED', REFUNDED: 'REFUNDED', ACTIVE: 'ACTIVE', SUSPENDED: 'SUSPENDED' } as const;

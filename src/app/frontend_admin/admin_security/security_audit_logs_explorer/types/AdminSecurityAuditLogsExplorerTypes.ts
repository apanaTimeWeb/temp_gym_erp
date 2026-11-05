// RESPONSIBILITY: Defines the immutable Audit Logs API, filter, detail, and KPI contracts owned by the Admin audit_logs feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_audit_logs/audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes.ts)

export type AuditSeverity = 'high' | 'medium' | 'low';
export type AuditModule = 'Finance' | 'Members' | 'HR' | 'Plans' | 'Auth' | 'Settings' | 'Branches' | 'Store' | 'Attendance';

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  entityType: string;
  entityId?: string;
  branchId: string;
  details: string;
  severity: AuditSeverity;
}

export interface AuditLogDetail extends AuditLog {
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}

export interface AuditKPIData {
  totalLogs: number;
  actionsToday: number;
  uniqueActors: number;
  criticalEvents: number;
}

export interface AdminAuditLogsQueryParams {
  page: number;
  limit: number;
  actor?: string;
  action?: string;
  from?: string;
  to?: string;
  entityType?: string;
  entityId?: string;
}

export interface AuditActorsResponse {
  actors: string[];
}

export interface AuditLogExportFilters extends Omit<AdminAuditLogsQueryParams, 'page' | 'limit'> {}

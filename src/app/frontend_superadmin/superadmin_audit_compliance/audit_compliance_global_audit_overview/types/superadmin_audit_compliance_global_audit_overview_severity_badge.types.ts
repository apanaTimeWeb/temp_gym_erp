// RESPONSIBILITY: Prop blueprint for the Global Audit severity badge.
import type { AuditLog } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/types/superadmin_audit_compliance_global_audit_overview.types';
export interface SuperadminAuditComplianceGlobalAuditSeverityBadgeProps {
  severity: AuditLog['severity'];
}

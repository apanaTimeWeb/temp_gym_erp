// RESPONSIBILITY: Derives URL/filter value types from the Global Audit constants source.
import { SUPERADMIN_AUDIT_ACTOR_OPTIONS, SUPERADMIN_AUDIT_SEVERITY_OPTIONS } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';
export type AuditSeverityFilter = (typeof SUPERADMIN_AUDIT_SEVERITY_OPTIONS)[number];
export type AuditActorFilter = (typeof SUPERADMIN_AUDIT_ACTOR_OPTIONS)[number];

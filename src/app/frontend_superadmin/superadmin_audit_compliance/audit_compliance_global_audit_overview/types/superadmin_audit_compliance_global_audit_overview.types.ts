/**
 * RESPONSIBILITY: Defines TypeScript domain contracts for the feature.
 * AI BOUNDARY: Types/interfaces only; runtime validation schemas live in the owning _schemas folder.
 */
// RESPONSIBILITY: Defines canonical API and UI types for the Superadmin Global Audit module.
import { SUPERADMIN_AUDIT_ACTOR_ROLES, SUPERADMIN_AUDIT_ACTOR_TYPES, SUPERADMIN_AUDIT_SEVERITIES, SUPERADMIN_AUDIT_SEVERITY_OPTIONS, SUPERADMIN_AUDIT_ACTOR_OPTIONS } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';

export type AuditActorRole = typeof SUPERADMIN_AUDIT_ACTOR_ROLES[number];
export type AuditActorType = typeof SUPERADMIN_AUDIT_ACTOR_TYPES[number];
export type AuditSeverity = typeof SUPERADMIN_AUDIT_SEVERITIES[number];
export interface AuditLog {
    id: string;
    timestamp: string;
    actor: string;
    actorRole?: AuditActorRole;
    tenantId?: string;
    tenantName?: string;
    actorType?: AuditActorType;
    action: string;
    resource: string;
    resourceId?: string;
    details: string;
    ipAddress: string;
    sessionId?: string;
    severity: AuditSeverity;
}
export type AuditSeverityFilter = typeof SUPERADMIN_AUDIT_SEVERITY_OPTIONS[number];
export type AuditActorFilter = typeof SUPERADMIN_AUDIT_ACTOR_OPTIONS[number];
export interface GlobalAuditListMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

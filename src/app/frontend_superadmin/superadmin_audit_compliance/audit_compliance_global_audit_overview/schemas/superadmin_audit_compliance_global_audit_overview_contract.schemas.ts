/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */


import { z } from 'zod';

import { AUDIT_ACTOR_ROLES, AUDIT_ACTOR_TYPES, AUDIT_SEVERITIES } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/constants/superadmin_audit_compliance_global_audit_overview.constants';

export const AuditLogSchema = z.object({
    id: z.string(),
    timestamp: z.string().datetime({ offset: true }),
    actor: z.string(),
    actorRole: z.enum(AUDIT_ACTOR_ROLES).optional(),
    tenantId: z.string().optional(),
    tenantName: z.string().optional(),
    actorType: z.enum(AUDIT_ACTOR_TYPES).optional(),
    action: z.string(),
    resource: z.string(),
    resourceId: z.string().optional(),
    details: z.string(),
    ipAddress: z.string(),
    sessionId: z.string().optional(),
    severity: z.enum(AUDIT_SEVERITIES),
});

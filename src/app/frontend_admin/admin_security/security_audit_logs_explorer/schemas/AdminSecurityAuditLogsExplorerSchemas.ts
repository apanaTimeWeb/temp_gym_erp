// RESPONSIBILITY: Defines runtime validation schemas for audit_logs_explorer; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_audit_logs/audit_logs_explorer/schemas/AdminSecurityAuditLogsExplorerSchemas.ts)

import { z } from 'zod';
import { auditSeveritySchema as severitySchema } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/schemas/AdminSecurityAuditLogsExplorerSchemaPrimitives';

export const auditLogSchema = z.object({
  id: z.string(),
  timestamp: z.string().datetime({ offset: true }),
  action: z.string(),
  actor: z.string(),
  entityType: z.string(),
  entityId: z.string().optional(),
  branchId: z.string(),
  details: z.string(),
  severity: severitySchema,
});

export const auditLogDetailSchema = auditLogSchema.extend({
  metadata: z.record(z.string(), z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  before: z.record(z.string(), z.unknown()).optional(),
  after: z.record(z.string(), z.unknown()).optional(),
});

export const auditKpiDataSchema = z.object({
  totalLogs: z.number(),
  actionsToday: z.number(),
  uniqueActors: z.number(),
  criticalEvents: z.number(),
});

export const auditActorsSchema = z.object({ actors: z.array(z.string()) });

// RESPONSIBILITY: Defines runtime validation schemas for audit_logs_explorer; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_audit_logs/audit_logs_explorer/schemas/AdminSecurityAuditLogsExplorerSchemaPrimitives.ts)

import { z } from 'zod';
export const auditSeveritySchema = z.union([z.literal('high'), z.literal('medium'), z.literal('low')]);

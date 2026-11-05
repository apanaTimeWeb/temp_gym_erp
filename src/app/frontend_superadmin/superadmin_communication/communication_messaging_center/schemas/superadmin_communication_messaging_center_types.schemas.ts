/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingTypesSchemas owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const TenantMessageSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  tenantName: z.string(),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP']),
  subject: z.string(),
  body: z.string(),
  status: z.enum(['SENT', 'DRAFT', 'FAILED', 'SCHEDULED', 'QUEUED']),
  sentAt: z.string().nullable(),
  scheduledAt: z.string().nullable(),
  createdAt: z.string(),
});

export const MessagingTenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string(),
});

export const TenantMessageCreatePayloadSchema = z.object({
  tenantId: z.string().min(1),
  tenantName: z.string().min(1),
  channel: z.enum(['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP']),
  subject: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(5000),
});

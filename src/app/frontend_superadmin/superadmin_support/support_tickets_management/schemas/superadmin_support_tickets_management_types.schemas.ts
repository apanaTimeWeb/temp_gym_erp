/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSupportTicketsTypesSchemas owned by the superadmin_support_tickets feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const TicketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'WAITING']);

export const TicketPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'NORMAL', 'URGENT']);

export const SupportTicketMessageSchema = z.object({
    id: z.string().min(1),
    senderId: z.string(),
    senderName: z.string(),
    senderRole: z.enum(['TENANT', 'SUPERADMIN', 'SYSTEM']),
    content: z.string(),
    attachments: z.array(z.string()).optional(),
    createdAt: z.string(),
});

export const SupportTicketSchema = z.object({
    id: z.string().min(1),
    tenantId: z.string(),
    tenantName: z.string().optional(),
    reporterEmail: z.string().optional(),
    subject: z.string(),
    description: z.string(),
    status: TicketStatusSchema,
    priority: TicketPrioritySchema,
    assignedTo: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    slaDeadline: z.string().optional(),
    firstResponseAt: z.string().optional(),
    resolutionTime: z.number().optional(),
    messages: z.array(SupportTicketMessageSchema).optional(),
    createdAt: z.string(),
    lastUpdated: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const replySchema = z.object({
    replyText: z.string().trim().min(1, 'Please enter a reply message.'),
});

export const TicketAssigneeInputSchema = z.object({
    assignee: z.string().trim().min(1, 'Please enter an assignee.'),
});

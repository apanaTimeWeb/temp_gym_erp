import type { TicketStatusSchema, TicketPrioritySchema, SupportTicketMessageSchema, SupportTicketSchema, replySchema, TicketAssigneeInputSchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Tickets module.
export type TicketStatus = ZodInfer<typeof TicketStatusSchema>;
export type TicketPriority = ZodInfer<typeof TicketPrioritySchema>;
export type SupportTicketMessage = ZodInfer<typeof SupportTicketMessageSchema>;
export type SupportTicket = ZodInfer<typeof SupportTicketSchema>;
export type SuperadminSupportTicketsReplyFormValues = ZodInfer<typeof replySchema>;
export type TicketAssigneeInput = ZodInfer<typeof TicketAssigneeInputSchema>;

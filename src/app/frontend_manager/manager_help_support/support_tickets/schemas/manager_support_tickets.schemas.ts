// RESPONSIBILITY: Zod validation schemas for raising support tickets and replying to tickets.
import { z } from 'zod';
import { TICKET_CATEGORIES, TICKET_PRIORITIES } from '@/app/frontend_manager/manager_help_support/support_tickets/constants/manager_support_tickets.constants';

export const createSupportTicketSchema = z.object({
  subject: z.string().trim().min(5, 'Subject must be at least 5 characters').max(120, 'Subject is too long'),
  category: z.enum(TICKET_CATEGORIES),
  priority: z.enum(TICKET_PRIORITIES),
  description: z.string().trim().min(10, 'Please describe your request in at least 10 characters').max(2000, 'Description too long'),
});

export const replySupportTicketSchema = z.object({
  message: z.string().trim().min(2, 'Message cannot be empty').max(1000, 'Message too long'),
});

export type CreateSupportTicketFormValues = z.infer<typeof createSupportTicketSchema>;
export type ReplySupportTicketFormValues = z.infer<typeof replySupportTicketSchema>;

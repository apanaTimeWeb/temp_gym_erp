// RESPONSIBILITY: Static constants, categories, priorities and style maps for Manager Support Tickets.

export const TICKET_CATEGORIES = [
  'Technical Issue',
  'Billing & Subscription',
  'Equipment & Maintenance',
  'Staff & HR Policy',
  'General Inquiry',
  'Feature Request',
] as const;

export type TicketCategory = typeof TICKET_CATEGORIES[number];

export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const;
export type TicketPriority = typeof TICKET_PRIORITIES[number];

export const TICKET_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const;
export type TicketStatus = typeof TICKET_STATUSES[number];

export const TICKET_PRIORITY_STYLES: Record<TicketPriority, { bg: string; text: string }> = {
  LOW: { bg: 'bg-input', text: 'text-text-secondary' },
  MEDIUM: { bg: 'bg-info-bg', text: 'text-info-text' },
  HIGH: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  URGENT: { bg: 'bg-danger-bg', text: 'text-danger-text' },
};

export const TICKET_STATUS_STYLES: Record<TicketStatus, { bg: string; text: string }> = {
  OPEN: { bg: 'bg-primary-subtle', text: 'text-primary' },
  IN_PROGRESS: { bg: 'bg-warning-bg', text: 'text-warning-text' },
  RESOLVED: { bg: 'bg-success-bg', text: 'text-success-text' },
  CLOSED: { bg: 'bg-input', text: 'text-text-muted' },
};


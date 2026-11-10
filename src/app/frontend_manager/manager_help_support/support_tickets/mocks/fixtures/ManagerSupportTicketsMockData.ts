// RESPONSIBILITY: Authoritative mock fixture data for Manager Support Tickets.
import type { SupportTicket, SupportTicketKPIs } from '@/app/frontend_manager/manager_help_support/support_tickets/types/manager_support_tickets.types';

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 't-101',
    ticketNumber: 'TICK-8021',
    subject: 'Additional Biometric Fingerprint Scanner Request for Studio 2',
    category: 'Equipment & Maintenance',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    createdAt: '2026-11-08T10:30:00.000Z',
    updatedAt: '2026-11-09T14:15:00.000Z',
    description: 'We need an additional biometric attendance machine installed near the yoga and pilates studio entrance to reduce gate crowding during peak morning hours.',
    messages: [
      {
        id: 'm-1',
        senderRole: 'MANAGER',
        senderName: 'Manager Rahul',
        message: 'We need an additional biometric attendance machine installed near the yoga and pilates studio entrance to reduce gate crowding during peak morning hours.',
        sentAt: '2026-11-08T10:30:00.000Z',
      },
      {
        id: 'm-2',
        senderRole: 'ADMIN',
        senderName: 'Admin Desk',
        message: 'Vendor has been contacted. Device shipment is expected by Thursday. Will notify the IT team for installation.',
        sentAt: '2026-11-09T14:15:00.000Z',
      },
    ],
  },
  {
    id: 't-102',
    ticketNumber: 'TICK-8015',
    subject: 'November Staff Commission & Incentive Approval',
    category: 'Staff & HR Policy',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    createdAt: '2026-11-04T09:00:00.000Z',
    updatedAt: '2026-11-06T16:30:00.000Z',
    description: 'Submitting trainer personal training incentive sheet for Diwali festive drive for final review and payout clearance.',
    messages: [
      {
        id: 'm-3',
        senderRole: 'MANAGER',
        senderName: 'Manager Rahul',
        message: 'Submitting trainer personal training incentive sheet for Diwali festive drive for final review and payout clearance.',
        sentAt: '2026-11-04T09:00:00.000Z',
      },
      {
        id: 'm-4',
        senderRole: 'ADMIN',
        senderName: 'Head Finance Admin',
        message: 'Approved and credited to corporate netbanking payout schedule. Payout slips generated.',
        sentAt: '2026-11-06T16:30:00.000Z',
      },
    ],
  },
  {
    id: 't-103',
    ticketNumber: 'TICK-8025',
    subject: 'SMS Gateway Balance Running Low on DLT Route',
    category: 'Technical Issue',
    priority: 'URGENT',
    status: 'OPEN',
    createdAt: '2026-11-10T11:00:00.000Z',
    updatedAt: '2026-11-10T11:00:00.000Z',
    description: 'Promotional and OTP SMS gateway quota is below 500 units. Please top up DLT SMS credits to avoid disruption in OTP member check-ins.',
    messages: [
      {
        id: 'm-5',
        senderRole: 'MANAGER',
        senderName: 'Manager Rahul',
        message: 'Promotional and OTP SMS gateway quota is below 500 units. Please top up DLT SMS credits to avoid disruption in OTP member check-ins.',
        sentAt: '2026-11-10T11:00:00.000Z',
      },
    ],
  },
];

export const MOCK_SUPPORT_KPIS: SupportTicketKPIs = {
  totalTickets: 3,
  openTickets: 1,
  inProgressTickets: 1,
  resolvedTickets: 1,
};


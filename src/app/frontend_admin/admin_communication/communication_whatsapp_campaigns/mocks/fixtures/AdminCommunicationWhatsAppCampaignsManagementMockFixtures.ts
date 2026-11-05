// RESPONSIBILITY: Owns module-local fixture or mock-state data for communication_whatsapp_campaigns; it does not persist production business entities.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_communication/communication_whatsapp_campaigns/mocks/fixtures/AdminCommunicationWhatsAppCampaignsManagementMockFixtures.ts)

import type { AdminCampaignsAudience, AdminCampaignsRecipient, AdminCampaignsTemplate } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';

export const ADMIN_CAMPAIGNS_TEMPLATES: AdminCampaignsTemplate[] = [
  {
    id: 'tpl_1',
    type: 'FEE_REMINDER',
    title: 'Monthly Fee Reminder',
    body: 'Hi {name},\n\nThis is a friendly reminder that your monthly gym fee is due in 3 days. Please make the payment at the reception or via the app to avoid interruption of services.\n\nThank you,\nGymSmart Admin'
  },
  {
    id: 'tpl_2',
    type: 'OVERDUE',
    title: 'Payment Overdue',
    body: 'Dear {name},\n\nYour payment for this month is currently overdue. Please clear your dues at the earliest so we can continue your membership without suspension.\n\nRegards,\nGymSmart Admin'
  },
  {
    id: 'tpl_3',
    type: 'RENEWAL',
    title: 'Renewal Reminder',
    body: 'Hello {name},\n\nYour gym membership is expiring this week. Renew now and get a 10% discount on the annual plan! Contact the front desk for details.\n\nKeep grinding,\nGymSmart Admin'
  },
  {
    id: 'tpl_custom',
    type: 'CUSTOM',
    title: 'Custom Message',
    body: 'Hi {name},\n\n'
  }
];

export const ADMIN_CAMPAIGNS_AUDIENCES: AdminCampaignsAudience[] = [
  { id: 'aud_pending', name: 'Members with Pending Fees', description: 'All active members who have not paid their current month dues.' },
  { id: 'aud_expiring', name: 'Memberships Expiring This Week', description: 'Members whose active plan ends within the next 7 days.' },
  { id: 'aud_all', name: 'All Active Members', description: 'Every member currently enrolled across all branches.' }
];

export const ADMIN_CAMPAIGNS_RECIPIENTS_PENDING: AdminCampaignsRecipient[] = [
  { id: 'rec_1', name: 'John Doe', phone: '+919876543210', branchName: 'Branch A' },
  { id: 'rec_2', name: 'Smita Sharma', phone: '+919876543211', branchName: 'Branch B' },
  { id: 'rec_3', name: 'Raj Kumar', phone: '+919876543212', branchName: 'Branch A' },
  { id: 'rec_4', name: 'Priya Patel', phone: '+919876543213', branchName: 'Branch C' },
];

export const ADMIN_CAMPAIGNS_RECIPIENTS_EXPIRING: AdminCampaignsRecipient[] = [
  { id: 'rec_5', name: 'Amit Singh', phone: '+919876543214', branchName: 'Branch B' },
  { id: 'rec_6', name: 'Neha Gupta', phone: '+919876543215', branchName: 'Branch A' },
];

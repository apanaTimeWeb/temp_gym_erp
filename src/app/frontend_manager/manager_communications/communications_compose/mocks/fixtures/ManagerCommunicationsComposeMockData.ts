import { MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES } from '@/app/frontend_manager/manager_communications/communications_compose/constants/manager_communications_campaigns.constants';
import type { CommCampaign, CommKPIData, CommAutomation, ChurnedMember, ChurnKPIData } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';

/**
 * @description Provides the ManagerCommunicationsComposeMockData implementation for the communications module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_CAMPAIGNS: CommCampaign[] = [
  { id: 'c1', title: 'June Renewal Reminder', channel: 'whatsapp', segment: 'expiring_7_days', segmentLabel: 'Expiring in 7 Days', message: 'Hi! Your membership expires soon...', recipientCount: 18, sentCount: 18, failedCount: 0, deliveredCount: 18, status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.SENT, sentAt: '2025-06-10T10:30:00Z', sentBy: 'Manager' },
  { id: 'c2', title: 'Pending Dues Alert',    channel: 'whatsapp', segment: 'pending_payment',  segmentLabel: 'Pending Payment',     message: 'Friendly reminder about your dues...', recipientCount: 12, sentCount: 11, failedCount: 1, deliveredCount: 11, status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.PARTIAL, sentAt: '2025-06-08T09:00:00Z', sentBy: 'Manager' },
  { id: 'c3', title: 'Welcome Back Campaign', channel: 'email',    segment: 'expired',          segmentLabel: 'Expired Members',     message: 'We miss you at GymSmart!', subject: 'We miss you!', recipientCount: 34, sentCount: 34, failedCount: 0, deliveredCount: 34, status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.SENT, sentAt: '2025-06-05T14:00:00Z', sentBy: 'Manager' },
  { id: 'c4', title: 'Monthly Newsletter',    channel: 'email',    segment: 'all_active',       segmentLabel: 'All Active Members',  message: 'This month at GymSmart...', subject: 'June Newsletter', recipientCount: 120, sentCount: 120, failedCount: 0, deliveredCount: 120, status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.SENT, sentAt: '2025-06-01T08:00:00Z', sentBy: 'Manager' },
];

export const MOCK_AUTOMATIONS: CommAutomation[] = [
  {
    id: 'auto-1',
    type: 'birthday',
    title: 'Birthday Wishes',
    description: 'Automatically send a WhatsApp message to members on their birthday at 9:00 AM.',
    enabled: true,
    channel: 'whatsapp',
    messageTemplate: 'Hi {name}, wishing you a very Happy Birthday from all of us at GymSmart! 🎂 Have a fantastic day and keep crushing those fitness goals! 💪',
    sendTime: '09:00' },
  {
    id: 'auto-2',
    type: 'anniversary',
    title: 'Gym Anniversary',
    description: 'Celebrate the day they joined our gym. Sent at 10:00 AM.',
    enabled: false,
    channel: 'whatsapp',
    messageTemplate: 'Happy Gym Anniversary {name}! 🎉 You have been with us for another strong year. Thank you for being part of the GymSmart family. Keep lifting! 🏋️‍♂️',
    sendTime: '10:00' }
];

export const MOCK_COMM_KPI: CommKPIData = {
  totalSent: 183,
  whatsappSent: 29,
  emailSent: 154,
  campaignsThisMonth: 4 };

export const MOCK_CANCELLED_MEMBERS: ChurnedMember[] = [
  { memberId: 'EX001', name: 'Ravi Shankar',   phone: '9876543222', email: 'ravi@email.com',    plan: 'Monthly Premium', exitDate: '2025-09-02', daysSinceExit: 7,  reason: 'price',        lastContactedAt: null,                 recovered: false, lifetimeValue: 5000 },
  { memberId: 'EX002', name: 'Anita Desai',    phone: '9876543223', email: 'anita@email.com',   plan: 'Quarterly Elite', exitDate: '2025-08-20', daysSinceExit: 20, reason: 'relocation',   lastContactedAt: '2025-08-25T10:00:00Z', recovered: false, lifetimeValue: 12000 },
  { memberId: 'EX003', name: 'Sanjay Patel',   phone: '9876543224', email: 'sanjay@email.com',  plan: 'Monthly Basic',   exitDate: '2025-08-10', daysSinceExit: 30, reason: 'schedule',     lastContactedAt: null,                 recovered: false, lifetimeValue: 3000 },
  { memberId: 'EX004', name: 'Meera Joshi',    phone: '9876543225', email: 'meera@email.com',   plan: 'Annual Premium',  exitDate: '2025-07-15', daysSinceExit: 56, reason: 'personal',     lastContactedAt: null,                 recovered: false, lifetimeValue: 18000 },
  { memberId: 'EX005', name: 'Arun Nair',      phone: '9876543226', email: 'arun@email.com',    plan: 'Monthly Basic',   exitDate: '2025-07-01', daysSinceExit: 70, reason: 'dissatisfied', lastContactedAt: '2025-07-05T09:30:00Z', recovered: false, lifetimeValue: 2000 },
  { memberId: 'EX006', name: 'Priyanka Das',   phone: '9876543227', email: 'priyanka@email.com', plan: 'Quarterly Elite', exitDate: '2025-06-15', daysSinceExit: 86, reason: 'unknown',      lastContactedAt: null,                 recovered: false, lifetimeValue: 9000 },
  { memberId: 'EX007', name: 'Vikram Singh',   phone: '9876543228', email: 'vikram@email.com',  plan: 'Monthly Premium', exitDate: '2025-06-01', daysSinceExit: 100, reason: 'price',       lastContactedAt: null,                 recovered: true,  lifetimeValue: 10000 },
  { memberId: 'EX008', name: 'Divya Kapoor',   phone: '9876543229', email: 'divya2@email.com',  plan: 'Monthly Basic',   exitDate: '2025-05-20', daysSinceExit: 112, reason: 'personal',    lastContactedAt: '2025-06-01T11:00:00Z', recovered: true,  lifetimeValue: 4500 },
];

export const MOCK_CANCELLATIONS_KPI: ChurnKPIData = {
  totalChurned: 47,
  churnedThisMonth: 8,
  recoveryRate: 12.5,
  avgDaysSinceExit: 43 };

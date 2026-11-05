import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_compose/config/manager_communications_communications_compose.url_config';
import { http, HttpResponse } from 'msw';

import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';

import { MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES } from '@/app/frontend_manager/manager_communications/communications_compose/constants/manager_communications_campaigns.constants';
import { MOCK_CAMPAIGNS, MOCK_COMM_KPI, MOCK_AUTOMATIONS, MOCK_CANCELLED_MEMBERS, MOCK_CANCELLATIONS_KPI } from '@/app/frontend_manager/manager_communications/communications_compose/mocks/fixtures/ManagerCommunicationsComposeMockData';
import type { CommCampaign, CommRecipient, CommFormValues, CommSegment, CommAutomation, CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';

let mockCampaigns = [...MOCK_CAMPAIGNS];
let mockAutomations = [...MOCK_AUTOMATIONS];
let mockCancelledMembers = [...MOCK_CANCELLED_MEMBERS];

/**
 * @description Provides the ManagerCommunicationsComposeMockHandlers implementation for the communications module.
 * @dependencies @/app/frontend_manager/manager_communications/manager_communications_url_config; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerHttpStatus; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_utils/ManagerMockApiUrl
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_SEGMENT_MEMBERS: Record<CommSegment, CommRecipient[]> = {
  all_active: [
    { memberId: 'M001', name: 'Arjun Sharma',   phone: '9876543210', email: 'arjun@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-08-01', pendingAmount: 0 },
    { memberId: 'M002', name: 'Priya Mehta',    phone: '9876543211', email: 'priya@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-09-15', pendingAmount: 0 },
    { memberId: 'M003', name: 'Rahul Verma',    phone: '9876543212', email: 'rahul@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-07-20', pendingAmount: 0 },
    { memberId: 'M004', name: 'Sneha Patil',    phone: '9876543213', email: 'sneha@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-10-01', pendingAmount: 0 },
    { memberId: 'M005', name: 'Karan Joshi',    phone: '9876543214', email: 'karan@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-08-30', pendingAmount: 0 }],
  expiring_7_days: [
    { memberId: 'M006', name: 'Amit Kumar',     phone: '9876543215', email: 'amit@email.com',    status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-06-18', pendingAmount: 0 },
    { memberId: 'M007', name: 'Neha Singh',     phone: '9876543216', email: 'neha@email.com',    status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-06-19', pendingAmount: 0 },
    { memberId: 'M008', name: 'Vikram Rao',     phone: '9876543217', email: 'vikram@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-06-20', pendingAmount: 0 }],
  expiring_30_days: [
    { memberId: 'M009', name: 'Pooja Nair',     phone: '9876543218', email: 'pooja@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-07-10', pendingAmount: 0 },
    { memberId: 'M010', name: 'Suresh Iyer',    phone: '9876543219', email: 'suresh@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-07-05', pendingAmount: 0 },
    { memberId: 'M011', name: 'Divya Reddy',    phone: '9876543220', email: 'divya@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-07-12', pendingAmount: 0 },
    { memberId: 'M012', name: 'Manish Gupta',   phone: '9876543221', email: 'manish@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.ACTIVE,  expiryDate: '2025-07-08', pendingAmount: 0 }],
  expired: [
    { memberId: 'M013', name: 'Ravi Shankar',   phone: '9876543222', email: 'ravi@email.com',    status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.EXPIRED, expiryDate: '2025-05-30', pendingAmount: 0 },
    { memberId: 'M014', name: 'Anita Desai',    phone: '9876543223', email: 'anita@email.com',   status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.EXPIRED, expiryDate: '2025-05-15', pendingAmount: 0 },
    { memberId: 'M015', name: 'Sanjay Patel',   phone: '9876543224', email: 'sanjay@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.EXPIRED, expiryDate: '2025-06-01', pendingAmount: 0 }],
  pending_payment: [
    { memberId: 'M016', name: 'Kavita Jain',    phone: '9876543225', email: 'kavita@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.PENDING, expiryDate: '2025-07-01', pendingAmount: 150000 },
    { memberId: 'M017', name: 'Deepak Mishra',  phone: '9876543226', email: 'deepak@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.PENDING, expiryDate: '2025-06-25', pendingAmount: 200000 },
    { memberId: 'M018', name: 'Sunita Yadav',   phone: '9876543227', email: 'sunita@email.com',  status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.PENDING, expiryDate: '2025-07-15', pendingAmount: 80000 }],
  custom: [] };

export let mockCommunicationIdCounter = 1000;
let mockBroadcastIdCounter = 1000;
export function resetManagerCommunicationsComposeMockState(): void {
  mockCampaigns = [...MOCK_CAMPAIGNS];
  mockAutomations = [...MOCK_AUTOMATIONS];
  mockCancelledMembers = [...MOCK_CANCELLED_MEMBERS];
  mockCommunicationIdCounter = 1000;
  mockBroadcastIdCounter = 1000;
}

export const managerCommunicationsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.SEGMENT(':segment')), ({ params }) => {
    const { segment } = params;
    return HttpResponse.json({ success: true, message: 'Segment fetched', data: MOCK_SEGMENT_MEMBERS[segment as CommSegment] ?? [] });
  }),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CAMPAIGNS), async ({ request }) => {
    const payload = await request.json() as CommFormValues & { recipientCount: number; segmentLabel: string };
    const campaign: CommCampaign = {
      id: `c${mockCommunicationIdCounter++}`,
      title: payload.title,
      channel: payload.channel,
      segment: payload.segment,
      segmentLabel: payload.segmentLabel,
      message: payload.message,
      subject: payload.subject,
      recipientCount: payload.recipientCount,
      sentCount: payload.recipientCount,
      failedCount: 0,
      deliveredCount: payload.recipientCount,
      status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.SENT,
      sentAt: new Date().toISOString(),
      sentBy: 'Manager' };
    mockCampaigns = [campaign, ...mockCampaigns];
    return HttpResponse.json({ success: true, message: 'Campaign created', data: campaign });
  })
];

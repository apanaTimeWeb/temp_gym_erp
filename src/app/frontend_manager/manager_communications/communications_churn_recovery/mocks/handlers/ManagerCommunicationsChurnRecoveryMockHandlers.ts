import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/config/manager_communications_communications_churn_recovery.url_config';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns.constants';
import { MOCK_CANCELLED_MEMBERS, MOCK_CANCELLATIONS_KPI } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/mocks/fixtures/ManagerCommunicationsChurnRecoveryMockData';
import type { ChurnedMember, CommCampaign, CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';

let mockCancelledMembers: ChurnedMember[] = [...MOCK_CANCELLED_MEMBERS];
let mockWinBackIdCounter = 1000;
export function resetManagerCommunicationsChurnRecoveryMockState(): void { mockCancelledMembers = [...MOCK_CANCELLED_MEMBERS]; mockWinBackIdCounter = 1000; }

/** Churn-recovery handlers own churn reads and the win-back send outcome; they do not write campaign history. */
export const managerCommunicationsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CHURNED_MEMBERS), () => HttpResponse.json({ success: true, message: 'Churned members fetched', data: mockCancelledMembers })),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CHURN_KPIS), () => HttpResponse.json({ success: true, message: 'Churn KPIs fetched', data: MOCK_CANCELLATIONS_KPI })),
  http.post(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.WIN_BACK), async ({ request }) => {
    const payload = await request.json() as { memberId: string; memberName: string; phone: string; email: string; channel: CommChannel; templateTier: WinBackTemplateTier; message: string; subject: string };
    const campaign: CommCampaign = { id: `wb-${mockWinBackIdCounter++}`, title: `Win-Back: ${payload.memberName}`, channel: payload.channel, segment: 'expired', segmentLabel: 'Win-Back (Lost)', message: payload.message, subject: payload.subject, recipientCount: 1, sentCount: 1, failedCount: 0, deliveredCount: 1, status: MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES.SENT, sentAt: new Date().toISOString(), sentBy: 'Manager' };
    mockCancelledMembers = mockCancelledMembers.map((member) => member.memberId === payload.memberId ? { ...member, lastContactedAt: new Date().toISOString() } : member);
    return HttpResponse.json({ success: true, message: 'Win-back message sent', data: campaign });
  }),
];

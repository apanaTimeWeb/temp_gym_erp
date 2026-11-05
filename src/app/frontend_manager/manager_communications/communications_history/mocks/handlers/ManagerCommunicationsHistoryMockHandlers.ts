import { http, HttpResponse } from 'msw';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_history/config/manager_communications_communications_history.url_config';
import { MOCK_CAMPAIGNS, MOCK_COMM_KPI } from '@/app/frontend_manager/manager_communications/communications_history/mocks/fixtures/ManagerCommunicationsHistoryMockData';
import type { CommCampaign } from '@/app/frontend_manager/manager_communications/communications_history/types/manager_communications_communications_history.types';
import { MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS, resolveManagerCommunicationsHistoryMockScenario } from '@/app/frontend_manager/manager_communications/communications_history/mocks/scenarios/ManagerCommunicationsHistoryMockScenarios';

let mockCampaigns: CommCampaign[] = [...MOCK_CAMPAIGNS];
let retryAttempts = 0;
let requestCounter = 0;
const requestId = () => `mock-communications-history-${++requestCounter}`;
export function resetManagerCommunicationsHistoryMockState(): void { mockCampaigns = [...MOCK_CAMPAIGNS]; retryAttempts = 0; requestCounter = 0; }

function scenarioResponse(request: Request) {
  const scenario = request.headers.get('x-manager-mock-scenario') as keyof typeof MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS | null;
  if (!scenario || !MANAGERCOMMUNICATIONSHISTORY_MOCK_SCENARIOS[scenario]) return null;
  const outcome = resolveManagerCommunicationsHistoryMockScenario(scenario);
  if (scenario === 'RETRY' && retryAttempts++ > 0) return null;
  if (scenario === 'EMPTY') return HttpResponse.json({ success: true, message: 'Empty history', data: { campaigns: [], total: 0 }, requestId: requestId() });
  if (scenario === 'INVALID') return HttpResponse.json({ success: true, message: 'Invalid history payload', data: { campaigns: null, total: 'invalid' }, requestId: requestId() });
  if (scenario === 'ACTIVE') return null;
  return HttpResponse.json({ success: false, message: `Mock scenario: ${scenario}`, data: null, errorCode: scenario, statusCode: outcome.status, requestId: requestId() }, { status: outcome.status || 499 });
}

/** Read-only history handlers; campaign creation is owned by communications_compose. */
export const managerCommunicationsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CAMPAIGNS), ({ request }) => {
    const scenario = scenarioResponse(request); if (scenario) return scenario;
    const url = new URL(request.url); const search = (url.searchParams.get('search') || '').trim().toLowerCase(); const channel = (url.searchParams.get('channel') || '').trim().toLowerCase();
    const page = Math.max(Number(url.searchParams.get('page') || '1'), 1); const limit = Math.max(Number(url.searchParams.get('limit') || '10'), 1);
    const filtered = mockCampaigns.filter((campaign) => (!search || campaign.title.toLowerCase().includes(search)) && (!channel || channel === 'all' || campaign.channel.toLowerCase() === channel));
    const start = (page - 1) * limit; return HttpResponse.json({ success: true, message: 'Campaigns fetched', data: { campaigns: filtered.slice(start, start + limit), total: filtered.length }, requestId: requestId() });
  }),
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.KPIS), () => HttpResponse.json({ success: true, message: 'Communication KPIs fetched', data: MOCK_COMM_KPI, requestId: requestId() })),
];

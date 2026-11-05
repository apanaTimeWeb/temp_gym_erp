import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureHttpStatus';
import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_automations/config/manager_communications_communications_automations.url_config';
import { MOCK_AUTOMATIONS } from '@/app/frontend_manager/manager_communications/communications_automations/mocks/fixtures/ManagerCommunicationsAutomationsMockData';
import type { CommAutomation } from '@/app/frontend_manager/manager_communications/communications_automations/types/manager_communications_communications_automations.types';

let mockAutomations: CommAutomation[] = [...MOCK_AUTOMATIONS];
export function resetManagerCommunicationsAutomationsMockState(): void { mockAutomations = [...MOCK_AUTOMATIONS]; }

/** Automation-only handlers: list and update. Campaign sending/history remain in their owning leaves. */
export const managerCommunicationsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.AUTOMATIONS), () => HttpResponse.json({ success: true, message: 'Automations fetched', data: mockAutomations })),
  http.patch(ManagerInfrastructureMockApiUrl(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.AUTOMATION(':id')), async ({ request, params }) => {
    const payload = await request.json() as Partial<CommAutomation>;
    const index = mockAutomations.findIndex((item) => item.id === String(params.id));
    if (index < 0) return HttpResponse.json({ success: false, message: 'Automation not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    const updated = { ...mockAutomations[index], ...payload, id: String(params.id) } as CommAutomation;
    mockAutomations = mockAutomations.map((item) => item.id === updated.id ? updated : item);
    return HttpResponse.json({ success: true, message: 'Automation updated', data: updated });
  }),
];

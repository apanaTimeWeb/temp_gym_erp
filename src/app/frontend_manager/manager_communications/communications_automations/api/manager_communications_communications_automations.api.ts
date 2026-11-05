import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_automations/config/manager_communications_communications_automations.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { commAutomationSchema } from '@/app/frontend_manager/manager_communications/communications_automations/schemas/manager_communications_communications_automations.schemas';
import type { CommAutomation } from '@/app/frontend_manager/manager_communications/communications_automations/types/manager_communications_communications_automations.types';

/**
 * @description Provides the ManagerCommunicationsCampaignsApi implementation for the communications module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_communications/manager_communications_url_config; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerCommunicationsCampaignsApi = {
  fetchAutomations: async (): Promise<ApiResponse<CommAutomation[]>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.AUTOMATIONS, { dataSchema: z.array(commAutomationSchema) });
  },

  updateAutomation: async (id: string, payload: Partial<CommAutomation>, idempotencyKey: string): Promise<ApiResponse<CommAutomation>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.AUTOMATION(id), { method: 'PATCH', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: commAutomationSchema });
  }
};

import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_history/config/manager_communications_communications_history.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { commCampaignSchema, commKPIDataSchema } from '@/app/frontend_manager/manager_communications/communications_history/schemas/manager_communications_communications_history.schemas';
import type { CommCampaign, CommKPIData } from '@/app/frontend_manager/manager_communications/communications_history/types/manager_communications_communications_history.types';

/**
 * @description Provides the ManagerCommunicationsCampaignsApi implementation for the communications module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_communications/manager_communications_url_config; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerCommunicationsCampaignsApi = {
  fetchCampaigns: async (params?: Record<string, string>): Promise<ApiResponse<{ campaigns: CommCampaign[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CAMPAIGNS}${query ? `?${query}` : ''}`, { dataSchema: z.object({ campaigns: z.array(commCampaignSchema), total: z.number() }) });
  },

  fetchCommunicationKPIs: async (): Promise<ApiResponse<CommKPIData>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.KPIS, { dataSchema: commKPIDataSchema });
  }
};

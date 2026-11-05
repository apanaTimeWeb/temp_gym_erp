import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_compose/config/manager_communications_communications_compose.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { commCampaignSchema, commRecipientSchema } from '@/app/frontend_manager/manager_communications/communications_compose/schemas/manager_communications_communications_compose.schemas';
import type { CommCampaign, CommRecipient, CommFormValues, CommSegment } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';

/**
 * @description Provides the ManagerCommunicationsCampaignsApi implementation for the communications module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_communications/manager_communications_url_config; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerCommunicationsCampaignsApi = {
  fetchSegmentRecipients: async (segment: CommSegment): Promise<ApiResponse<CommRecipient[]>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.SEGMENT(segment), { dataSchema: z.array(commRecipientSchema) });
  },

  sendCampaign: async (payload: CommFormValues & { recipientCount: number; segmentLabel: string }, idempotencyKey: string): Promise<ApiResponse<CommCampaign>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CAMPAIGNS, { method: 'POST', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: commCampaignSchema });
  }
};

import { MANAGER_COMMUNICATIONS_CAMPAIGNS_API } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/config/manager_communications_communications_churn_recovery.url_config';
import { z } from 'zod';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { commCampaignSchema, churnedMemberSchema, churnKPIDataSchema } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/schemas/manager_communications_communications_churn_recovery.schemas';
import type { CommCampaign, ChurnedMember, ChurnKPIData } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';
import { COMM_CHANNEL_VALUES, WIN_BACK_TEMPLATE_TIER_VALUES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';

/**
 * @description Provides the ManagerCommunicationsCampaignsApi implementation for the communications module.
 * @dependencies @/lib/api, the leaf URL registry, local request/response schemas, and local communications types.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const winBackMessageRequestSchema = z.object({
  memberId: z.string().trim().min(1),
  memberName: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  email: z.string(),
  channel: z.enum(COMM_CHANNEL_VALUES),
  templateTier: z.enum(WIN_BACK_TEMPLATE_TIER_VALUES),
  message: z.string().trim().min(1),
  subject: z.string(),
}).strict();
export type WinBackMessageRequest = z.infer<typeof winBackMessageRequestSchema>;

export const ManagerCommunicationsCampaignsApi = {
  fetchChurnedMembers: async (): Promise<ApiResponse<ChurnedMember[]>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CHURNED_MEMBERS, { dataSchema: z.array(churnedMemberSchema) });
  },

  fetchChurnKPIs: async (): Promise<ApiResponse<ChurnKPIData>> => {
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.CHURN_KPIS, { dataSchema: churnKPIDataSchema });
  },

  sendWinBackMessage: async (payload: WinBackMessageRequest, idempotencyKey: string): Promise<ApiResponse<CommCampaign>> => {
    const validatedPayload = winBackMessageRequestSchema.parse(payload);
    return apiFetch(MANAGER_COMMUNICATIONS_CAMPAIGNS_API.WIN_BACK, { method: 'POST', body: JSON.stringify(validatedPayload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: commCampaignSchema });
  }
};

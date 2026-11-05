// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for communication_whatsapp_campaigns; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementQueueUtils.ts)

import type { AdminCampaignsQueueItem, AdminCampaignsRecipient } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';
import { replaceAdminCampaignVariables } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils';
import { CAMPAIGN_QUEUE_STATUS_VALUES } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/constants/AdminCommunicationWhatsAppCampaignsManagementConstants';

/** buildAdminCampaignQueue provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies. @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature. @description Implements buildAdminCampaignQueue for the owning feature’s explicitly typed data. @param body - Input used by this utility as declared by the signature. @param recipients - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function buildAdminCampaignQueue(body: string, recipients: AdminCampaignsRecipient[]): AdminCampaignsQueueItem[] {
  return recipients.map((recipient) => ({
    recipient,
    status: CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED,
    message: replaceAdminCampaignVariables(body, recipient),
  }));
}

/** updateAdminCampaignQueueStatus provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies. @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature. @description Implements updateAdminCampaignQueueStatus for the owning feature’s explicitly typed data. @param queue - Input used by this utility as declared by the signature. @param index - Input used by this utility as declared by the signature. @param status - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function updateAdminCampaignQueueStatus(
  queue: AdminCampaignsQueueItem[],
  index: number,
  status: AdminCampaignsQueueItem['status'],
): AdminCampaignsQueueItem[] {
  return queue.map((item, itemIndex) => itemIndex === index ? { ...item, status } : item);
}

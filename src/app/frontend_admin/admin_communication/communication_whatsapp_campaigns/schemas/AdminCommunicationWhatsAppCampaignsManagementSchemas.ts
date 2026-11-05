// RESPONSIBILITY: Defines runtime validation schemas for communication_whatsapp_campaigns; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_communication/communication_whatsapp_campaigns/schemas/AdminCommunicationWhatsAppCampaignsManagementSchemas.ts)

import { z } from 'zod';
const adminCampaignsTemplateSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  type: z.enum(['FEE_REMINDER', 'OVERDUE', 'RENEWAL', 'CUSTOM']),
});

const adminCampaignsAudienceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const adminCampaignsRecipientSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  branchName: z.string(),
});

export const adminCampaignsAudiencesResponseSchema = z.array(adminCampaignsAudienceSchema);
export const adminCampaignsTemplatesResponseSchema = z.array(adminCampaignsTemplateSchema);
export const adminCampaignsRecipientsResponseSchema = z.object({
  recipients: z.array(adminCampaignsRecipientSchema),
});


// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for communication_whatsapp_campaigns; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils.ts)

/**
 * @description AdminCampaignsWhatsAppUtils: Owns the AdminCampaignsWhatsAppUtils responsibility for the admin_campaigns feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
import type { AdminCampaignsRecipient } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';
import { ADMIN_CAMPAIGNS_EXTERNAL_URLS } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/config/admin_communication_whatsapp_campaigns.url_config';

/** Replaces `{name}` variables in the message with the recipient's details. @description Implements replaceAdminCampaignVariables for the owning feature’s explicitly typed data. @param body - Input used by this utility as declared by the signature. @param recipient - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function replaceAdminCampaignVariables(body: string, recipient: AdminCampaignsRecipient): string {
  if (!body) return '';
  return body.replace(/\{name\}/g, recipient.name);
}

/**
 * Sanitizes phone numbers by stripping all non-numeric characters.
 */
function sanitizePhone(phone: string): string {
  if (!phone || !/^[+\d\s().-]+$/.test(phone.trim())) return '';
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? digits : '';
}

/** Builds a wa.me URL for the specified phone number and message. @description Implements buildAdminWhatsAppLink for the owning feature’s explicitly typed data. @param phone - Input used by this utility as declared by the signature. @param text - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function buildAdminWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = sanitizePhone(phone);
  if (!cleanPhone) return '';
  return `${ADMIN_CAMPAIGNS_EXTERNAL_URLS.whatsappWeb}/${cleanPhone}?text=${encodeURIComponent(text.trim())}`;
}

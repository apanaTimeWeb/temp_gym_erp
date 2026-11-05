// RESPONSIBILITY: Canonical constants discovery entry for the AdminCampaigns feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_communication/communication_whatsapp_campaigns/constants/AdminCommunicationWhatsAppCampaignsManagementConstants.ts)

/** Stable feature-local constants entry point; populated as documented static configuration is introduced. */
export const CAMPAIGN_QUEUE_STATUS_VALUES = { QUEUED: 'QUEUED', SENT: 'SENT', OPENED: 'OPENED', SKIPPED: 'SKIPPED' } as const;

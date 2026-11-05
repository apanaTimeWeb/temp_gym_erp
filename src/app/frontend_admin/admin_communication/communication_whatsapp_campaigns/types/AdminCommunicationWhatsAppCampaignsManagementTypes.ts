// RESPONSIBILITY: Canonical UI and API contract types for the Admin Campaigns feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes.ts)

export type AdminCampaignsTemplateType = 'FEE_REMINDER' | 'OVERDUE' | 'RENEWAL' | 'CUSTOM';
export type AdminCampaignsQueueStatus = 'QUEUED' | 'OPENED' | 'SENT' | 'SKIPPED';

export interface AdminCampaignsTemplate {
  id: string;
  title: string;
  body: string;
  type: AdminCampaignsTemplateType;
}

export interface AdminCampaignsAudience {
  id: string;
  name: string;
  description: string;
}

export interface AdminCampaignsRecipient {
  id: string;
  name: string;
  phone: string;
  branchName: string;
}

export interface AdminCampaignsQueueItem {
  recipient: AdminCampaignsRecipient;
  message: string;
  status: AdminCampaignsQueueStatus;
}

export interface AdminCampaignsAudiencePickerProps {
  audiences: AdminCampaignsAudience[];
  selectedAudienceId: string;
  onSelect: (id: string) => void;
}

export interface AdminCampaignsTemplatePickerProps {
  templates: AdminCampaignsTemplate[];
  selectedTemplateId: string;
  onSelect: (id: string) => void;
}

export interface AdminCampaignsComposerProps {
  body: string;
  onChange: (value: string) => void;
  testId?: string;
}

export interface AdminCampaignsQueuePanelProps {
  queue: AdminCampaignsQueueItem[];
  onOpen: (index: number) => boolean;
  onMarkSent: (index: number) => void;
  onSkip: (index: number) => void;
}

export interface AdminCampaignsRecipientsResponse {
  recipients: AdminCampaignsRecipient[];
}

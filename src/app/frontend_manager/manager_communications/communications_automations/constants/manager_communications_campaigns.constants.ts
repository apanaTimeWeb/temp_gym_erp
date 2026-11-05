/** Canonical module-level constant registry for manager_communications; child constant files remain the source of individual entries. */
export const ManagerCommunicationsCampaignsConstants = {} as const;

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_VALUES = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  PENDING: 'PENDING',
  SENT: 'sent',
  PARTIAL: 'partial',
} as const;

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_CHANNEL_VALUES = ['whatsapp', 'email'] as const;

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_OPTION_VALUES = ['sent', 'failed', 'partial', 'scheduled'] as const;

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_AUTOMATION_TYPE_VALUES = ['birthday', 'anniversary'] as const;

export const MANAGER_COMMUNICATIONS_CAMPAIGNS_WIN_BACK_TIER_VALUES = ['7_days', '30_days', '90_days', 'custom'] as const;

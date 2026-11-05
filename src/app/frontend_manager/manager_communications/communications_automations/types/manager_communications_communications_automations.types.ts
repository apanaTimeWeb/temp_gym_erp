import type { CHURN_REASON_VALUES, COMM_ACTIVE_TAB_VALUES, COMM_AUTOMATION_TYPE_VALUES, COMM_CHANNEL_VALUES, COMM_SEGMENT_VALUES, COMMUNICATION_STATUS_VALUES, WIN_BACK_TEMPLATE_TIER_VALUES } from '@/app/frontend_manager/manager_communications/communications_automations/constants/manager_communications_campaigns_shared.constants';

export type CommActiveTab = typeof COMM_ACTIVE_TAB_VALUES[number];
export type CommChannel = typeof COMM_CHANNEL_VALUES[number];
export type CommSegment = typeof COMM_SEGMENT_VALUES[number];
export type CommStatus = typeof COMMUNICATION_STATUS_VALUES[number];
export type CommAutomationType = typeof COMM_AUTOMATION_TYPE_VALUES[number];
export type ChurnReasonType = typeof CHURN_REASON_VALUES[number];
export type WinBackTemplateTier = typeof WIN_BACK_TEMPLATE_TIER_VALUES[number];

export interface CommRecipient {
  memberId: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  expiryDate: string;
  pendingAmount: number;
}

// ─── Campaign ─────────────────────────────────────────────────────────────────
export interface CommCampaign {
  id: string;
  title: string;
  channel: CommChannel;
  segment: CommSegment;
  segmentLabel: string;
  message: string;
  subject?: string;
  recipientCount: number;
  sentCount: number;
  status: CommStatus;
  sentAt: string;
  sentBy: string;
  // HIGHLY RECOMMENDED — standard analytics fields for campaigns
  failedCount: number;
  deliveredCount: number;
  openRate?: number;      // percentage, email-only
  scheduledAt?: string;   // if status is 'scheduled'
}

// ─── Message Templates ────────────────────────────────────────────────────────
/** HIGHLY RECOMMENDED — standard SaaS feature for reusable message templates. */
export interface MessageTemplate {
  id: string;
  name: string;
  channel: CommChannel;
  body: string;
  variables: string[];     // e.g. ['{{member_name}}', '{{expiry_date}}']
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── KPIs ─────────────────────────────────────────────────────────────────────
export interface CommKPIData {
  totalSent: number;
  whatsappSent: number;
  emailSent: number;
  campaignsThisMonth: number;
}

export interface CommFormValues {
  title: string;
  channel: CommChannel;
  segment: CommSegment;
  message: string;
  subject: string;
}

// ─── Automation ───────────────────────────────────────────────────────────────
export interface CommAutomation {
  id: string;
  type: CommAutomationType;
  title: string;
  description: string;
  enabled: boolean;
  channel: CommChannel;
  messageTemplate: string;
  sendTime: string;
}

// ─── Churn Recovery ───────────────────────────────────────────────────────────
export interface ChurnedMember {
  memberId: string;
  name: string;
  phone: string;
  email: string;
  plan: string;
  exitDate: string;
  daysSinceExit: number;
  reason: ChurnReasonType;
  lastContactedAt: string | null;
  recovered: boolean;
  // HIGHLY RECOMMENDED — needed for churn impact analysis
  lifetimeValue: number;   // total INR paid by member during their tenure
}

export interface ChurnKPIData {
  totalChurned: number;
  churnedThisMonth: number;
  recoveryRate: number;
  avgDaysSinceExit: number;
}

export interface WinBackRecord {
  id: string;
  memberId: string;
  memberName: string;
  channel: CommChannel;
  templateTier: WinBackTemplateTier;
  sentAt: string;
  recovered: boolean;
}

export type ManagerCommunicationsCampaignsViewId = 'compose' | 'history' | 'automations' | 'churn_recovery';

import { z } from 'zod';

import { MANAGER_COMMUNICATIONS_CAMPAIGNS_CHANNEL_VALUES, MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_OPTION_VALUES, MANAGER_COMMUNICATIONS_CAMPAIGNS_AUTOMATION_TYPE_VALUES, MANAGER_COMMUNICATIONS_CAMPAIGNS_WIN_BACK_TIER_VALUES } from '@/app/frontend_manager/manager_communications/communications_automations/constants/manager_communications_campaigns.constants';
import { COMM_SEGMENT_VALUES, CHURN_REASON_VALUES } from '@/app/frontend_manager/manager_communications/communications_automations/constants/manager_communications_campaigns_shared.constants';

/**
 * @description Provides the ManagerCommunicationsCampaignsSchema implementation for the communications module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const commChannelSchema = z.enum(MANAGER_COMMUNICATIONS_CAMPAIGNS_CHANNEL_VALUES);
export const commSegmentSchema = z.enum(COMM_SEGMENT_VALUES);
export const commStatusSchema = z.enum(MANAGER_COMMUNICATIONS_CAMPAIGNS_STATUS_OPTION_VALUES);

export const commRecipientSchema = z.object({
  memberId: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  status: z.string(),
  expiryDate: z.string(),
  pendingAmount: z.number().int() });

export const commCampaignSchema = z.object({
  id: z.string(),
  title: z.string(),
  channel: commChannelSchema,
  segment: commSegmentSchema,
  segmentLabel: z.string(),
  message: z.string(),
  subject: z.string().optional(),
  recipientCount: z.number(),
  sentCount: z.number(),
  status: commStatusSchema,
  sentAt: z.string(),
  sentBy: z.string(),
  failedCount: z.number(),
  deliveredCount: z.number(),
  openRate: z.number().optional(),
  scheduledAt: z.string().optional() });

export const messageTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  channel: commChannelSchema,
  body: z.string(),
  variables: z.array(z.string()),
  isDefault: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string() });

export const commKPIDataSchema = z.object({
  totalSent: z.number(),
  whatsappSent: z.number(),
  emailSent: z.number(),
  campaignsThisMonth: z.number() });

export const commAutomationTypeSchema = z.enum(MANAGER_COMMUNICATIONS_CAMPAIGNS_AUTOMATION_TYPE_VALUES);

export const commAutomationSchema = z.object({
  id: z.string(),
  type: commAutomationTypeSchema,
  title: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  channel: commChannelSchema,
  messageTemplate: z.string(),
  sendTime: z.string() });

export const churnReasonTypeSchema = z.enum(CHURN_REASON_VALUES);

export const churnedMemberSchema = z.object({
  memberId: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  plan: z.string(),
  exitDate: z.string(),
  daysSinceExit: z.number(),
  reason: churnReasonTypeSchema,
  lastContactedAt: z.string().nullable(),
  recovered: z.boolean(),
  lifetimeValue: z.number().int() });

export const churnKPIDataSchema = z.object({
  totalChurned: z.number(),
  churnedThisMonth: z.number(),
  recoveryRate: z.number(),
  avgDaysSinceExit: z.number() });

export const winBackTemplateTierSchema = z.enum(MANAGER_COMMUNICATIONS_CAMPAIGNS_WIN_BACK_TIER_VALUES);

export const winBackRecordSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  memberName: z.string(),
  channel: commChannelSchema,
  templateTier: winBackTemplateTierSchema,
  sentAt: z.string(),
  recovered: z.boolean() });

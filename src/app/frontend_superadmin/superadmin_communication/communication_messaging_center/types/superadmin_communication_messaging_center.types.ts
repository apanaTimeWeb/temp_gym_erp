// RESPONSIBILITY: TypeScript and runtime contracts for the Superadmin tenant messaging module.
import { SUPERADMIN_COMMUNICATION_MESSAGING_CHANNELS, SUPERADMIN_COMMUNICATION_MESSAGING_STATUSES, SUPERADMIN_COMMUNICATION_MESSAGING_TABS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants';
import { TenantMessageCreatePayloadSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_types.schemas';

import type { infer as ZodInfer } from 'zod';



export type MessageChannel = typeof SUPERADMIN_COMMUNICATION_MESSAGING_CHANNELS[number];
export type MessageStatus = typeof SUPERADMIN_COMMUNICATION_MESSAGING_STATUSES[number];

/** Tenant-level recipients only. Superadmin messaging never addresses gym members. */
export interface MessagingTenant {
  id: string;
  name: string;
  plan: string;
}

export interface TenantMessage {
  id: string;
  tenantId: string;
  tenantName: string;
  channel: MessageChannel;
  subject: string;
  body: string;
  status: MessageStatus;
  sentAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
}


export type MessagingTab = typeof SUPERADMIN_COMMUNICATION_MESSAGING_TABS[number];
export type TenantMessageCreatePayload = ZodInfer<typeof TenantMessageCreatePayloadSchema>;

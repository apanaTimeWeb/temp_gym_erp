/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminCommunicationMessagingConstants owned by the superadmin_communication_messaging feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Shared display constants for the Superadmin tenant messaging module.
import type { MessageChannel, MessageStatus } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';

export const ITEMS_PER_PAGE = 10;

export const CHANNEL_STYLES: Record<MessageChannel, string> = {
  EMAIL: 'bg-primary-subtle text-primary border border-border',
  SMS: 'bg-success-bg text-success border border-border',
  IN_APP: 'bg-info-bg text-info border border-border',
  WHATSAPP: 'bg-success text-on-success border border-success',
};

export const MESSAGE_STATUS_STYLES: Record<MessageStatus, string> = {
  SENT: 'bg-success-bg text-success border border-border',
  DRAFT: 'bg-input text-secondary border border-border',
  FAILED: 'bg-danger-bg text-danger border border-border',
  SCHEDULED: 'bg-warning-bg text-warning border border-border',
  QUEUED: 'bg-info-bg text-info border border-border',
};

export const SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES = { EMAIL: 'EMAIL', SMS: 'SMS', WHATSAPP: 'WHATSAPP', IN_APP: 'IN_APP' } as const;
export const SUPERADMIN_COMMUNICATION_MESSAGING_CHANNELS = ['EMAIL', 'SMS', 'WHATSAPP', 'IN_APP'] as const;
export const SUPERADMIN_COMMUNICATION_MESSAGING_STATUSES = ['SENT', 'DRAFT', 'FAILED', 'SCHEDULED', 'QUEUED'] as const;
export const SUPERADMIN_COMMUNICATION_MESSAGING_TABS = ['messages', 'notifications'] as const;
export const SUPERADMIN_WHATSAPP_QUEUE_STATUSES = ['QUEUED', 'OPENED', 'SENT', 'SKIPPED'] as const;
export const SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUSES = ['SENT', 'SKIPPED'] as const;

export const SUPERADMIN_COMMUNICATION_MESSAGING_STATUS_CODES = { SENT: 'SENT', DRAFT: 'DRAFT', FAILED: 'FAILED', SCHEDULED: 'SCHEDULED', QUEUED: 'QUEUED' } as const;
export const SUPERADMIN_WHATSAPP_QUEUE_STATUS_CODES = { QUEUED: 'QUEUED', OPENED: 'OPENED', SENT: 'SENT', SKIPPED: 'SKIPPED' } as const;
export const SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUS_CODES = { SENT: 'SENT', SKIPPED: 'SKIPPED' } as const;
export const SUPERADMIN_WHATSAPP_TEMPLATE_STATUS_CODES = { READY: 'READY', DRAFT: 'DRAFT' } as const;
export const SUPERADMIN_WHATSAPP_CAMPAIGN_STATUS_CODES = { READY: 'READY', RUNNING: 'RUNNING', COMPLETED: 'COMPLETED', PAUSED: 'PAUSED' } as const;

export const SUPERADMIN_COMMUNICATION_MESSAGING_ALL_FILTER = 'ALL' as const;

export const SUPERADMIN_COMMUNICATION_MESSAGING_TEMPLATE_STATUS_CODES = { APPROVED: 'APPROVED' } as const;
/** External WhatsApp click-to-chat origin; not an internal route or API endpoint. */
export const SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_WHATSAPP_CLICK_TO_CHAT_BASE = 'https://wa.me' as const;

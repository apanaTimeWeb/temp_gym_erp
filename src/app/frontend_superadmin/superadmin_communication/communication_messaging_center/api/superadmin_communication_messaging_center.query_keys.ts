/**
 * @description Canonical TanStack Query key registry for the Superadmin Messaging feature.
 * @invariant Server-state identities remain isolated for messages, notifications, tenants, WhatsApp, and insights.
 */
export const SUPERADMIN_COMMUNICATION_MESSAGING_QUERY_KEYS = {
  messages: ['superadmin_communication_messaging', 'messaging', 'messages'] as const,
  messagesList: (queryParams: Readonly<Record<string, string>>) => ['superadmin_communication_messaging', 'messaging', 'messages', queryParams] as const,
  tenants: ['superadmin_communication_messaging', 'messaging', 'tenants'] as const,
  whatsappBulkCenter: ['superadmin_communication_messaging', 'messaging', 'whatsapp-bulk-center'] as const,
  templateInsights: ['superadmin_communication_messaging', 'messaging_template_insights'] as const,
} as const;

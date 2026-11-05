/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_ROUTES = { MAIN: "/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns" } as const;

export const SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API = {
  BASE: '/superadmin/broadcasts',
  TENANTS: '/superadmin/gyms',
  DETAIL: (id: string) => `/superadmin/broadcasts/${encodeURIComponent(id)}`,
  DETAIL_PATTERN: '/superadmin/broadcasts/:id',
  RECIPIENT_COUNT: '/superadmin/broadcasts/recipient-count',
  DELIVER_TO_RECIPIENT: (broadcastId: string, recipientId: string) => `/superadmin/broadcasts/${encodeURIComponent(broadcastId)}/deliveries/${encodeURIComponent(recipientId)}`,
  DELIVER_TO_RECIPIENT_PATTERN: '/superadmin/broadcasts/:id/deliveries/:recipientId',
} as const;



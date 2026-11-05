/** Frozen exact notifications API routes from the supplied Messaging Center API. */
export const SUPERADMIN_COMMUNICATION_NOTIFICATIONS_ROUTES = {
  MAIN: '/frontend_superadmin/superadmin_communication/communication_notifications',
  LEGACY: '/frontend_superadmin/superadmin_communication/communication_messaging_center?tab=notifications',
} as const;
export const SUPERADMIN_COMMUNICATION_NOTIFICATIONS_API = {
  NOTIFICATIONS: '/superadmin/messaging/notifications',
  NOTIFICATION_READ_PATTERN: '/superadmin/messaging/notifications/:id/read',
  NOTIFICATION_READ: (id: string) => `/superadmin/messaging/notifications/${encodeURIComponent(id)}/read`,
  NOTIFICATIONS_READ_ALL: '/superadmin/messaging/notifications/read-all',
} as const;

/** Canonical URL contracts for the autonomous Superadmin Messaging Center sub-module. */
export const SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_ROUTES = { DESTINATION_1: "/frontend_superadmin/superadmin_communication/communication_notifications",  MAIN: '/frontend_superadmin/superadmin_communication/communication_messaging_center' } as const;

export const SUPERADMIN_COMMUNICATION_MESSAGING_CENTER_API = {
  BASE: '/superadmin/messaging',
  MESSAGES: '/superadmin/messaging/messages',
  TENANTS: '/superadmin/messaging/tenants',
  /** Legacy/archival metadata retained but not called by active API methods. */
  WHATSAPP_BASE: '/superadmin/messaging/whatsapp',
  WHATSAPP_BULK_CENTER: '/superadmin/messaging/whatsapp/bulk-center',
  WHATSAPP_CAMPAIGNS: '/superadmin/messaging/whatsapp/campaigns',
} as const;


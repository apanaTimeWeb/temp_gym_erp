// RESPONSIBILITY: Defines feature-local TypeScript contracts for communication_notifications_center; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterQueryTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminNotificationsQueryParams {
  read?: boolean;
}

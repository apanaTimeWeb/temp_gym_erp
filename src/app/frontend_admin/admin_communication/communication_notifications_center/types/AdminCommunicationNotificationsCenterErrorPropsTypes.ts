// RESPONSIBILITY: Defines feature-local TypeScript contracts for communication_notifications_center; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notifications_center/types/AdminCommunicationNotificationsCenterErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminNotificationsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

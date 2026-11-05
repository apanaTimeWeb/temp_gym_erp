// RESPONSIBILITY: Defines feature-local TypeScript contracts for communication_notices_and_announcements; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminAnnouncementsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

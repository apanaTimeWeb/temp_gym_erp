// RESPONSIBILITY: Defines feature-local TypeScript contracts for communication_whatsapp_campaigns; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminCampaignsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

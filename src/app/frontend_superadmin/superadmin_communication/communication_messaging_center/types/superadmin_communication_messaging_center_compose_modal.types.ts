// RESPONSIBILITY: Prop contract for the Superadmin tenant message compose modal.
import type { SuperadminCommunicationMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_compose.types';
import type { MessagingTenant } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center.types';



export interface SuperadminCommunicationMessagingComposeModalProps {
  tenants: MessagingTenant[];
  isSubmitting: boolean;
  onClose: () => void;
  onSend: (values: SuperadminCommunicationMessagingComposeValues) => Promise<void>;
}

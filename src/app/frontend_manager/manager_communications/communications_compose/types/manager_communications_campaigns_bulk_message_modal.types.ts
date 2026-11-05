// RESPONSIBILITY: Defines the Communications-owned bulk messaging contract for campaign recipients.
import type { CommChannel } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';
export interface ManagerCommunicationsCampaignsBulkMessageRecipient { name: string; phone?: string; email?: string; }
export interface ManagerCommunicationsCampaignsBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ManagerCommunicationsCampaignsBulkMessageRecipient[];
  type: CommChannel;
  defaultMessage?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}

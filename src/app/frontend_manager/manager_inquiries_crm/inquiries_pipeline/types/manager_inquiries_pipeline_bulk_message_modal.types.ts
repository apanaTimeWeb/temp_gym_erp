// RESPONSIBILITY: Defines the Inquiries-owned bulk messaging recipient and modal contract.
import type { ManagerInquiriesPipelineMessageType, ManagerInquiriesPipelineMessageRecipient } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_message.types';
export interface ManagerInquiriesPipelineBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ManagerInquiriesPipelineMessageRecipient[];
  type: ManagerInquiriesPipelineMessageType;
  defaultMessage?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}

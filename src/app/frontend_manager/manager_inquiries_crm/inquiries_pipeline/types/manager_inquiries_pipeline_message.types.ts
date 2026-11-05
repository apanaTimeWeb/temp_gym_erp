// RESPONSIBILITY: Defines the Inquiries-owned message recipient and single-message modal contract.
export type ManagerInquiriesPipelineMessageType = 'whatsapp' | 'email';

export interface ManagerInquiriesPipelineMessageRecipient {
  name: string;
  phone?: string;
  email?: string;
}

export interface ManagerInquiriesPipelineMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipient: ManagerInquiriesPipelineMessageRecipient;
  type: ManagerInquiriesPipelineMessageType;
  defaultMessage?: string;
  message?: string;
  subject?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}

// RESPONSIBILITY: Defines the Members-owned message recipient and message-modal contract for member communications.
export type ManagerMembersDirectoryMessageType = 'whatsapp' | 'email';
export interface ManagerMembersDirectoryMessageRecipient { name: string; phone?: string; email?: string; }
export interface ManagerMembersDirectoryMessageModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  recipient: ManagerMembersDirectoryMessageRecipient;
  type: ManagerMembersDirectoryMessageType;
  defaultMessage?: string;
  message?: string;
  subject?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}

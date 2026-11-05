// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember, CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';

export interface ManagerCommunicationsCampaignsChurnRecoveryComposerProps {
  member: ChurnedMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (
    member: ChurnedMember,
    channel: CommChannel,
    templateTier: WinBackTemplateTier,
    message: string,
    subject: string,
  ) => void;
  isSending: boolean;
  defaultTier: WinBackTemplateTier;
}

import type { Broadcast } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';

export interface SuperadminCommunicationBroadcastsSendNowConfirmationDialogProps {
  broadcast: Broadcast | null;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: (typedPhrase: string) => Promise<void>;
}

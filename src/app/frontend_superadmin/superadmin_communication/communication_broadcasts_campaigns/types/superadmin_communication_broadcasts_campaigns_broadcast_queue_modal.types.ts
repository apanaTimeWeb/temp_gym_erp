// RESPONSIBILITY: Type contract extracted from SuperadminCommunicationBroadcastsBroadcastQueueModal.tsx; no business behavior.
import type { SUPERADMIN_BROADCAST_QUEUE_STATE_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';

export interface SuperadminBroadcastRecipient {
  id: string;
  name: string;
  phone: string;
}

export type SuperadminBroadcastQueueRecipientState = keyof typeof SUPERADMIN_BROADCAST_QUEUE_STATE_CODES;

export interface SuperadminCommunicationBroadcastsBroadcastQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: SuperadminBroadcastRecipient[];
  broadcastId: string | null;
  broadcastTitle: string;
  onComplete: (message: string) => void;
}

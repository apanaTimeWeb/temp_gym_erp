export interface SuperadminBroadcastQueueRecipientDraft {
  id: string;
  name: string;
  phone: string;
}

export interface SuperadminBroadcastQueueState {
  queueModalOpen: boolean;
  queueRecipients: SuperadminBroadcastQueueRecipientDraft[];
  queueBroadcastId: string | null;
  queueTitle: string;
}

// RESPONSIBILITY: Form value contract for replying to a Superadmin support ticket.
export interface SuperadminSupportTicketsReplyFormValues {
  replyText: string;
  isInternalNote?: boolean;
  statusOnReply?: 'OPEN' | 'IN_PROGRESS' | 'WAITING' | 'RESOLVED' | 'CLOSED' | '';
}

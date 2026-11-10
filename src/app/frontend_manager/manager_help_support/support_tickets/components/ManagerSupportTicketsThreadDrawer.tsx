// RESPONSIBILITY: Renders the ticket detail & conversation thread slide-over drawer for two-way communication between Manager and Admin.
'use client';
import { useRef, useState } from 'react';
import { X, Send, ShieldCheck, User, Clock, Tag } from 'lucide-react';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';
import type { SupportTicket } from '@/app/frontend_manager/manager_help_support/support_tickets/types/manager_support_tickets.types';
import { TICKET_PRIORITY_STYLES, TICKET_STATUS_STYLES } from '@/app/frontend_manager/manager_help_support/support_tickets/constants/manager_support_tickets.constants';
import type { ReplySupportTicketFormValues } from '@/app/frontend_manager/manager_help_support/support_tickets/schemas/manager_support_tickets.schemas';

interface Props {
  ticket: SupportTicket | null;
  onClose: () => void;
  onSendReply: (ticketId: string, values: ReplySupportTicketFormValues) => Promise<void>;
  isReplying: boolean;
}

export default function ManagerSupportTicketsThreadDrawer({ ticket, onClose, onSendReply, isReplying }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef: drawerRef, isOpen: Boolean(ticket), onClose });

  const [replyText, setReplyText] = useState('');

  if (!ticket) return null;

  const priStyle = TICKET_PRIORITY_STYLES[ticket.priority] || TICKET_PRIORITY_STYLES.LOW;
  const statStyle = TICKET_STATUS_STYLES[ticket.status] || TICKET_STATUS_STYLES.OPEN;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || isReplying) return;
    await onSendReply(ticket.id, { message: replyText.trim() });
    setReplyText('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-overlay-backdrop backdrop-blur-xs motion-safe:transition-opacity"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-drawer-title"
        data-testid="manager_support-thread-drawer"
        className="w-full max-w-xl bg-card border-l border-border h-full shadow-2xl flex flex-col overflow-hidden motion-safe:animate-in motion-safe:slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-border bg-overlay flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-primary">{ticket.ticketNumber}</span>
              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${priStyle.bg} ${priStyle.text}`}>
                {ticket.priority}
              </span>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${statStyle.bg} ${statStyle.text}`}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
            <h2 id="ticket-drawer-title" className="text-base font-bold text-text-primary truncate">
              {ticket.subject}
            </h2>
            <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1">
              <Tag size={12} />
              {ticket.category}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-surface/30">
          {ticket.messages.map((m) => {
            const isManager = m.senderRole === 'MANAGER';

            return (
              <div key={m.id} className={`flex flex-col ${isManager ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-text-secondary">
                  {isManager ? (
                    <>
                      <span className="font-semibold text-text-primary">{m.senderName}</span>
                      <span>·</span>
                      <span>{new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={12} className="text-info" aria-hidden="true" />
                      <span className="font-semibold text-info">{m.senderName} (Admin)</span>
                      <span>·</span>
                      <span>{new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </>
                  )}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                    isManager
                      ? 'bg-primary text-on-primary rounded-tr-xs'
                      : 'bg-card border border-border text-text-primary shadow-xs rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form onSubmit={handleSend} className="p-4 border-t border-border bg-overlay flex items-center gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your response to Admin..."
            data-testid="manager_support-input-reply"
            className="flex-1 rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
          <button
            type="submit"
            disabled={!replyText.trim() || isReplying}
            data-testid="manager_support-button-send-reply"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <Send size={16} aria-hidden="true" />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}


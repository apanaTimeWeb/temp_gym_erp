// RESPONSIBILITY: Renders/orchestrates SuperadminSupportTicketsReplyModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminSupportTicketsManagementTicketReply.
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useSuperadminSupportTicketsManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementDialogA11y';
import { useSuperadminSupportTicketsManagementTicketReply } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementTicketReply';
import { useSuperadminSupportTicketsManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementUnsavedChangesGuard';
import { replySchema } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/schemas/superadmin_support_tickets_management_types.schemas';
import { applySuperadminSupportTicketsManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/utils/SuperadminSupportTicketsManagementFormApiErrors';

import type { SuperadminSupportTicketsReplyFormValues } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_reply_form.types';
import type { SuperadminSupportTicketsReplyModalProps } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_reply_modal.types';


/**
 * @description Renders the Superadmin ticket reply form. Submission state and API behavior are owned by useSuperadminSupportTicketsManagementTicketReply.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminSupportTicketsManagementReplyModal({ isOpen, onClose, ticketId }: SuperadminSupportTicketsReplyModalProps) {
  const t = useTranslations('superadmin_support_tickets');
  const { sendReply, isSending, error: replyError, abandonReplyIntent } = useSuperadminSupportTicketsManagementTicketReply();
  const { register, handleSubmit, reset, setError, formState: { errors, isDirty } } = useForm<SuperadminSupportTicketsReplyFormValues>({ resolver: zodResolver(replySchema), defaultValues: { replyText: '' } });
  useSuperadminSupportTicketsManagementUnsavedChangesGuard(Boolean(isOpen && isDirty && !isSending), t('ui.unsent_ticket_reply_leave'));
  const handleClose = () => {
    if (isSending) return;
    abandonReplyIntent();
    reset();
    onClose();
  };
  const dialogRef = useSuperadminSupportTicketsManagementDialogA11y(isOpen && Boolean(ticketId), handleClose);

  if (!isOpen || !ticketId) return null;

  const handleSubmitForm = async (values: SuperadminSupportTicketsReplyFormValues) => {
    try {
      const response = await sendReply({ id: ticketId, values });
      toast.success(response.message, { id: `superadmin-ticket-reply-${ticketId}` });
      abandonReplyIntent();
      reset();
      onClose();
    } catch (error: unknown) {
      applySuperadminSupportTicketsManagementFormApiErrors(error, setError, ['replyText']);
      toast.error(t('ui.action_failed_retry'), { id: `superadmin-ticket-reply-error-${ticketId}` });
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-ticket-reply-title" data-testid="superadmin_support_tickets-superadmin-tickets-reply-modal-tickets-reply-modal-dialog" ref={dialogRef}>
      <div className="my-auto flex max-h-dialog-desktop w-full max-w-lg flex-col rounded-xl border border-border bg-overlay shadow-dialog relative">
        <div className="shrink-0 p-6 border-b border-border">
          <h2 id="superadmin-ticket-reply-title" className="text-lg font-bold text-primary mb-1">{t('ui.reply_to_ticket_03470b7')}{ticketId}</h2>
          <p className="text-sm text-secondary">{t('ui.send_a_tenant_facing_response_through_the_ticket_03d83e5')}</p>
        </div>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="min-h-0 flex-1 flex flex-col" data-testid="superadmin_support_tickets-superadmin-tickets-reply-modal-superadmin_support_tickets-superadminticketsreplymodal-form-submit">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{errors.root.server.message}</p> : null}
            <div>
              <label htmlFor="superadmin-ticket-reply-text" className="block text-sm font-medium text-secondary mb-2">{t('ui.your_message_5fbe072')}</label>
              <textarea id="superadmin-ticket-reply-text" {...register('replyText')} aria-invalid={Boolean(errors.replyText)} aria-describedby={replyError ? 'superadmin-ticket-reply-error' : undefined} className="min-h-11 w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-32 motion-safe:transition-all motion-safe:duration-base ease-in-out" placeholder={t('ui.type_your_reply_here_5d5b10c')} disabled={isSending}  data-testid="superadmin_support_tickets-superadmin-tickets-reply-modal-tickets-reply-modal-reply"/>
              {errors.replyText || replyError ? <p id="superadmin-ticket-reply-error" className="text-xs text-danger mt-1" role="alert">{errors.replyText?.message ?? t('ui.action_failed_retry')}</p> : null}
            </div>
          </div>
          <div className="flex shrink-0 gap-3 justify-end p-5 border-t border-border">
            <button type="button" data-autofocus="true" onClick={handleClose} disabled={isSending} className="min-h-11 px-4 py-2 rounded-md font-medium border border-border text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_support_tickets-superadmin-tickets-reply-modal-tickets-reply-modal-cancel">{t('ui.cancel_292aa09')}</button>
            <button type="submit" disabled={isSending || !isDirty} className="min-h-11 min-w-32 px-4 py-2 rounded-md font-medium bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_support_tickets-superadmin-tickets-reply-modal-reply-modal-reply-2">
              {isSending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>{t('ui.sending_90dd3cf')}</> : <><Send size={18} strokeWidth={2}/>{t('ui.send_reply_ea329ca')}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



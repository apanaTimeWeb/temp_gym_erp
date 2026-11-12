// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationMessagingCenterComposeModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Owns Superadmin Messaging form presentation and client-side Zod validation.


import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { SuperadminCommunicationMessagingCenterTenantDropdown } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/components/messaging_center_forms_and_filters/SuperadminCommunicationMessagingCenterTenantDropdown';
import { SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center.constants';
import { useSuperadminCommunicationMessagingCenterDialogA11y } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterDialogA11y';
import { useSuperadminCommunicationMessagingCenterUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterUnsavedChangesGuard';
import { SuperadminCommunicationMessagingComposeSchema } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/schemas/superadmin_communication_messaging_center_compose.schemas';
import { applySuperadminCommunicationMessagingCenterFormApiErrors } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/utils/SuperadminCommunicationMessagingCenterFormApiErrors';

import type { SuperadminCommunicationMessagingComposeModalProps } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_compose_modal.types';
import type { SuperadminCommunicationMessagingComposeValues } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_compose.types';

/**
 * @description Owns Superadmin Messaging form presentation and client-side Zod validation.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export function SuperadminCommunicationMessagingCenterComposeModal({ tenants, isSubmitting, onClose, onSend }: SuperadminCommunicationMessagingComposeModalProps) {
  const t = useTranslations('superadmin_communication_messaging');
  const { confirm } = useConfirm();
  const { control, register, handleSubmit, setError, formState: { errors, isDirty } } = useForm<SuperadminCommunicationMessagingComposeValues>({
    resolver: zodResolver(SuperadminCommunicationMessagingComposeSchema),
    defaultValues: { tenantId: '', channel: SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.EMAIL, subject: '', body: '' },
    mode: 'onSubmit',
  });

  useSuperadminCommunicationMessagingCenterUnsavedChangesGuard(isDirty && !isSubmitting, t('ui.unsaved_message_changes'));
  const requestClose = async () => {
    if (isSubmitting) return;
    if (isDirty) {
      const approved = await confirm({ title: t('ui.discard_message_changes_title'), message: t('ui.unsaved_message_changes'), type: 'warning', confirmText: t('ui.discard_changes_action'), cancelText: t('ui.cancel_4b64e1c') });
      if (!approved) return;
    }
    onClose();
  };
  const dialogRef = useSuperadminCommunicationMessagingCenterDialogA11y(true, requestClose);
  const handleSend = async (values: SuperadminCommunicationMessagingComposeValues) => {
    try {
      await onSend(values);
    } catch (error: unknown) {
      applySuperadminCommunicationMessagingCenterFormApiErrors(error, setError, ['tenantId', 'channel', 'subject', 'body']);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-compose-title" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-messaging-compose-modal-dialog" ref={dialogRef}>
      <div className="my-auto flex max-h-dialog-desktop w-full max-w-lg flex-col rounded-xl border border-border bg-overlay shadow-dialog">
        <div className="flex shrink-0 items-center justify-between p-6 border-b border-border">
          <h2 id="superadmin-compose-title" className="text-lg font-bold text-primary">{t('ui.compose_message_2025ce6')}</h2>
          <button type="button" data-autofocus="true" onClick={() => { void requestClose(); }} disabled={isSubmitting} aria-label={t('ui.close_compose_modal_61a19cd')} className="min-w-11 min-h-11 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-messaging-compose-modal-close">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSend)} className="min-h-0 flex-1 flex flex-col" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-superadmin_communication_messaging-superadminmessagingcomposemodal-form-submit">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {errors.root?.server?.message ? <p role="alert" className="rounded-lg border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
            <div>
              <label htmlFor="superadmin_communication_messaging-tenant-trigger" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.tenant_recipient_1e35201')}</label>
              <Controller
                name="tenantId"
                control={control}
                render={({ field }) => <SuperadminCommunicationMessagingCenterTenantDropdown value={field.value} onChange={field.onChange} tenants={tenants} />}
  />
              {errors.tenantId && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-messaging-compose-modal-alert">{errors.tenantId.message ? t(String(errors.tenantId.message)) : ''}</p>}
            </div>

            <fieldset>
              <legend className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.channel_eaf60de')}</legend>
              <Controller
                name="channel"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-2">
                    {([SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.EMAIL, SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.SMS, SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.WHATSAPP, SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.IN_APP] as const).map((channel, index) => (
                      <button  key={channel} type="button" onClick={() => field.onChange(channel)} aria-pressed={field.value === channel} className={`min-h-11 flex-1 rounded-lg border py-2 text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${field.value === channel ? 'border-border bg-primary-subtle text-primary' : 'border-border bg-transparent text-secondary hover:text-primary'} motion-safe:active:scale-95`} data-testid={`superadmin_communication_messaging-messaging-messaging-compose-modal-action2-${index}`}>
                        {(() => { if (channel === SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.EMAIL) { return (t('ui.email')); } if (channel === SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.SMS) { return (t('ui.sms')); } if (channel === SUPERADMIN_COMMUNICATION_MESSAGING_CHANNEL_CODES.WHATSAPP) { return (t('ui.whatsapp')); } return (t('ui.in_app')); })()}
                      </button>
                    ))}
                  </div>
                )}/>
              {errors.channel && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-compose-modal-alert-2">{errors.channel.message ? t(String(errors.channel.message)) : ''}</p>}
            </fieldset>

            <div>
              <label htmlFor="superadmin-message-subject" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.subject_0a48a61')}</label>
              <input id="superadmin-message-subject" type="text" autoComplete="off" maxLength={200} {...register('subject')} placeholder={t('ui.message_subject_25e3f5c')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-messaging-compose-modal-control"/>
              {errors.subject && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-compose-modal-alert-3">{errors.subject.message ? t(String(errors.subject.message)) : ''}</p>}
            </div>

            <div>
              <label htmlFor="superadmin-message-body" className="mb-1 block text-xs font-medium uppercase tracking-wider text-secondary">{t('ui.body_b56f9a8')}</label>
              <textarea id="superadmin-message-body" rows={5} maxLength={5000} {...register('body')} placeholder={t('ui.write_your_tenant_level_message_f809ac6')} className="min-h-11 w-full resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-compose-modal-control-2"/>
              {errors.body && <p role="alert" className="mt-1 text-xs text-danger" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-compose-modal-alert-4">{errors.body.message ? t(String(errors.body.message)) : ''}</p>}
            </div>

            <p className="text-xs text-secondary">{t('ui.superadmin_communication_messaging_is_restricted_to_tenant_own_781aff1')}</p>
          </div>

          <div className="flex shrink-0 justify-end gap-3 p-5 border-t border-border">
            <button type="button" onClick={() => { void requestClose(); }} disabled={isSubmitting} className="min-h-11 rounded-lg bg-transparent px-4 py-2 text-sm text-secondary motion-safe:transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-messaging-compose-modal-cancel">{t('ui.cancel_4b64e1c')}</button>
            <button type="submit" disabled={isSubmitting} className="min-h-11 flex min-w-24 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary motion-safe:transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:scale-95" data-testid="superadmin_communication_messaging-superadmin-messaging-compose-modal-messaging-compose-modal-action4">
              {isSubmitting ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"/> : <Send size={18} strokeWidth={2} aria-hidden="true"/>} {isSubmitting ? t('ui.sending') : t('ui.send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

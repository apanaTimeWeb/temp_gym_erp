// RESPONSIBILITY: Renders and composes SuperadminCommunicationBroadcastsBroadcastModal for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';


import React, { useEffect, useRef, useState } from 'react';

import { X, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import SuperadminCommunicationBroadcastsMessageFields from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsMessageFields';
import SuperadminCommunicationBroadcastsScheduleFields from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsScheduleFields';
import SuperadminCommunicationBroadcastsSendConfirmationFields from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsSendConfirmationFields';
import SuperadminCommunicationBroadcastsTargetGymSelector from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_forms_and_filters/SuperadminCommunicationBroadcastsCampaignsTargetGymSelector';
import SuperadminCommunicationBroadcastsStatusField from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/SuperadminCommunicationBroadcastsCampaignsStatusField';
import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData';
import { combineSuperadminBroadcastScheduleDateTime, splitSuperadminBroadcastScheduleDateTime } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/utils/SuperadminCommunicationBroadcastsCampaignsBroadcastScheduleUtils';

import type { SuperadminCommunicationBroadcastsBroadcastModalProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_modal.types';

/** @description Renders the broadcast create/edit form modal and delegates mutation orchestration to the owning hook. @dependencies Consumes React Hook Form state, feature translation strings, and mutation callbacks. @edge-case Preserves form values after failed submission and disables duplicate submission while pending. */
export const SuperadminCommunicationBroadcastsBroadcastModal: React.FC<SuperadminCommunicationBroadcastsBroadcastModalProps> = ({ isOpen, onClose, form, onSubmit, isEditMode = false, isMutating = false, }) => {
  const t = useTranslations('superadmin_communication_broadcasts');
  const { confirm } = useConfirm();
    const { register, handleSubmit, watch, setValue, setError, clearErrors, formState: { errors } } = form;
    const [confirmationPhrase, setConfirmationPhrase] = useState('');
    const [isAllGymsMode, setIsAllGymsMode] = useState(true);
    const [scheduleDraft, setScheduleDraft] = useState({ date: '', time: '' });
    const dialogRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const requestClose = async () => {
      if (isMutating) return;
      if (form.formState.isDirty) {
        const confirmed = await confirm({ title: t('ui.discard_broadcast_changes_title'), message: t('ui.discard_broadcast_changes_message'), type: 'warning', confirmText: t('ui.discard_changes_action'), cancelText: t('actions.cancel') });
        if (!confirmed) return;
      }
      onClose();
    };
    const onCloseRef = useRef(requestClose);
    onCloseRef.current = requestClose;
    useEffect(() => {
      if (!isOpen) { setConfirmationPhrase(''); return; }
      setIsAllGymsMode((form.getValues('targetGymIds') || []).length === 0);
      setScheduleDraft(splitSuperadminBroadcastScheduleDateTime(form.getValues('scheduledDate')));
      previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const dialog = dialogRef.current;
      const focusable = dialog?.querySelector<HTMLElement>('input:not([type=hidden]), textarea, button, [tabindex]:not([tabindex="-1"])');
      focusable?.focus();
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') { event.preventDefault(); onCloseRef.current(); return; }
        if (event.key !== 'Tab' || !dialog) return;
        const items = Array.from(dialog.querySelectorAll<HTMLElement>('input:not([type=hidden]), textarea, button, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
        if (!items.length) return;
        const first = items[0]!; const last = items[items.length - 1]!;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => { document.removeEventListener('keydown', onKeyDown); previouslyFocusedRef.current?.focus(); };
    }, [isOpen, form]);
    const status = watch('status');
    useEffect(() => {
      if (status !== SUPERADMIN_BROADCAST_STATUS_CODES.SENT) setConfirmationPhrase('');
      if (status !== SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED) clearErrors('scheduledDate');
    }, [status, clearErrors]);
    const targetGymIds = watch('targetGymIds') || [];
    const scheduleInput = scheduleDraft;
    const updateSchedule = (date: string, time: string) => {
      setScheduleDraft({ date, time });
      if (!date || !time) {
        setValue('scheduledDate', '', { shouldValidate: true });
        clearErrors('scheduledDate');
        return;
      }
      try {
        setValue('scheduledDate', combineSuperadminBroadcastScheduleDateTime(date, time), { shouldValidate: true });
        clearErrors('scheduledDate');
      } catch (error) {
        setValue('scheduledDate', '', { shouldValidate: true });
        const message = (() => { if (error instanceof RangeError && error.message.includes('Ambiguous')) { return ('scheduled_date_time_ambiguous_error'); } if (error instanceof RangeError && error.message.includes('Nonexistent')) { return ('scheduled_date_time_nonexistent_error'); } return ('scheduled_date_time_invalid_error'); })();
        setError('scheduledDate', { type: 'manual', message });
      }
    };
    const { gyms, isPendingGyms, recipientCount, gymsError, retryGyms, isRecipientCountLoading, recipientCountError, retryRecipientCount } = useSuperadminCommunicationBroadcastsCampaignsBroadcastModalData(isOpen, status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT);
    const allGymIds = gyms.map(g => g.id) || [];
    // The current recipient-count endpoint is not scoped to selected gyms; show its result as an explicitly unscoped reference only.
    const previewRecipientCount = recipientCount ?? 0;
    if (!isOpen)
        return null;
    return (<div ref={dialogRef} className="fixed inset-0 bg-overlay z-40 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-broadcast-modal-title" data-testid="superadmin_communication_broadcasts-broadcast-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog flex flex-col my-auto max-h-dialog-desktop">
        <div className="flex shrink-0 items-center justify-between px-7 py-5 border-b border-border">
          <h2 id="superadmin-broadcast-modal-title" className="text-lg font-bold text-primary">{isEditMode ? t('ui.edit_broadcast_4c7d1a2e') : t('ui.new_broadcast_6b2e9d1c')}</h2>
          <button type="button" onClick={() => { void requestClose(); }} aria-label={t('ui.close_broadcast_modal_aria')} className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-button">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit((data) => { if (!isAllGymsMode && data.targetGymIds.length === 0) { setError('targetGymIds', { type: 'manual', message: 'target_gyms_validation_error' }); return; } if (data.status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT && (confirmationPhrase !== 'SEND' || isPendingGyms || Boolean(gymsError) || gyms.length === 0 || isRecipientCountLoading || Boolean(recipientCountError))) return; onSubmit(data); })} className="flex min-h-0 flex-1 flex-col" data-testid="superadmin_communication_broadcasts-superadminbroadcastsbroadcastmodal-form-1">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-7 space-y-5">
          {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
          <SuperadminCommunicationBroadcastsMessageFields register={register} errors={errors} />

          <div className="grid grid-cols-2 gap-4">
            <SuperadminCommunicationBroadcastsTargetGymSelector
              gyms={gyms}
              isPending={isPendingGyms}
              selectedGymIds={targetGymIds}
              isAllGymsTarget={isAllGymsMode}
              loadError={Boolean(gymsError)}
              onRetry={() => { void retryGyms(); }}
              onToggleAll={() => {
                clearErrors('targetGymIds');
                if (isAllGymsMode) {
                  setIsAllGymsMode(false);
                  setValue('targetGymIds', allGymIds, { shouldValidate: true });
                } else {
                  setIsAllGymsMode(true);
                  setValue('targetGymIds', [], { shouldValidate: true });
                }
              }}
              onToggleGym={(id) => {
                const next = targetGymIds.includes(id)
                  ? targetGymIds.filter((gymId: string) => gymId !== id)
                  : [...targetGymIds, id];
                setValue('targetGymIds', next, { shouldValidate: true });
                if (next.length === 0) setError('targetGymIds', { type: 'manual', message: 'target_gyms_validation_error' });
                else clearErrors('targetGymIds');
              }}
              errorMessage={errors.targetGymIds ? t('ui.target_gyms_validation_error') : undefined}
            />

            <SuperadminCommunicationBroadcastsStatusField control={form.control} errors={errors} />
          </div>

          {status === SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED && <>
            <SuperadminCommunicationBroadcastsScheduleFields
              date={scheduleInput.date}
              time={scheduleInput.time}
              hasError={Boolean(errors.scheduledDate)}
              errorMessage={(() => { if (errors.scheduledDate?.message === 'scheduled_date_time_ambiguous_error') { return (t('ui.scheduled_date_time_ambiguous_error')); } if (errors.scheduledDate?.message === 'scheduled_date_time_nonexistent_error') { return (t('ui.scheduled_date_time_nonexistent_error')); } if (errors.scheduledDate?.message === 'scheduled_date_time_invalid_error') { return (t('ui.scheduled_date_time_invalid_error')); } if (errors.scheduledDate) { return (t('ui.scheduled_date_validation_error')); } return (undefined); })()}
              timezoneHint={t('ui.scheduled_timezone_browser_local_hint')}
              onDateChange={(date) => updateSchedule(date, scheduleInput.time || '00:00')}
              onTimeChange={(time) => updateSchedule(scheduleInput.date, time)}
            />
            <input type="hidden" {...register('scheduledDate')}/>
          </>}

          {status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT && <SuperadminCommunicationBroadcastsSendConfirmationFields recipientCount={previewRecipientCount} isRecipientCountLoading={isRecipientCountLoading} recipientCountError={Boolean(recipientCountError)} onRetryRecipientCount={() => { void retryRecipientCount(); }} targetGymCount={targetGymIds.length} phrase={confirmationPhrase} onPhraseChange={setConfirmationPhrase}/> }
          </div>

          <div className="flex shrink-0 justify-end gap-3 p-5 border-t border-border">
            <button type="button" onClick={() => { void requestClose(); }} className="px-5 py-2.5 bg-transparent border border-border hover:bg-surface-highlight text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" disabled={isMutating || (!isAllGymsMode && targetGymIds.length === 0) || (status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT && (confirmationPhrase !== 'SEND' || isPendingGyms || Boolean(gymsError) || gyms.length === 0 || isRecipientCountLoading || Boolean(recipientCountError)))} className="px-5 py-2.5 min-h-11 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:opacity-50 flex items-center justify-center min-w-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-submit">
              {(() => { if (isMutating) { return (<><Loader2 size={18} className="motion-safe:animate-spin"/>{t('ui.saving_broadcast')}</>); } if (status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT) { return (t('ui.send_to_gyms_button', { count: targetGymIds.length || gyms.length })); } return (t('ui.save_broadcast')); })()}
            </button>
          </div>
        </form>
      </div>
    </div>);
};


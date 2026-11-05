"use client";
// RESPONSIBILITY: View-only shell for editing a session. Form state/submission lives in useTrainerSessionsEditForm.
import { useRef } from 'react';

import { X, Loader2, Save } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsTrainerInfrastructureSearchableDropdown';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureDialogFocusTrap';

import { TRAINER_SESSIONS_DURATION_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { useTrainerSessionsEditForm } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsEditForm';

import type { TrainerSessionsEditModalProps } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsEditModalProps';












/**
 * @description View-only shell for editing a session. Form state/submission lives in useTrainerSessionsEditForm.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the sessions feature form/modal surface for SessionsEditModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerSessionsEditModal({ session, onClose, onSuccess }: TrainerSessionsEditModalProps) {
  const t = useTranslations('TRAINER_SESSIONS');
  const translateValidationMessage = (message?: string) => {
    switch (message) {
      case 'TEXT_UNABLE_TO_UPDATE_SESSION': return t('TEXT_UNABLE_TO_UPDATE_SESSION');
      case 'TEXT_TIME_REQUIRED': return t('TEXT_TIME_REQUIRED');
      case 'TEXT_DURATION_REQUIRED': return t('TEXT_DURATION_REQUIRED');
      default: return message ?? '';
    }
  };
  const dialogRef = useRef<HTMLDivElement>(null);
  const form = useTrainerSessionsEditForm(session, onSuccess);
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(form.formState.isDirty && !form.formState.isSubmitting && !form.isSubmitting);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef, onEscape: () => void guardNavigation(onClose) });
  const durationOptions = TRAINER_SESSIONS_DURATION_OPTIONS.map((item) => ({ value: item.value, label: t(item.labelKey) }));
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4 " role="presentation">
      <div className="bg-overlay w-full max-w-md rounded-xl shadow-dialog border border-border overflow-hidden " ref={dialogRef} role="dialog" aria-modal={true} aria-labelledby="trainer-session-edit-title">
        <div className="flex items-center justify-between p-5 border-b border-border "><div><h3 id="trainer-session-edit-title" className="text-lg font-bold text-primary ">{t("TEXT_EDIT_SESSION")}</h3><p className="text-xs text-secondary mt-0.5 truncate max-w-xs ">{session.title}</p></div><button type="button" onClick={() => void guardNavigation(onClose)} className="min-w-11 min-h-11 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-input p-2 rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t("TEXT_CLOSE_EDIT_SESSION_MODAL")} data-testid="trainer_sessions-trainersessionseditmodal-button_1"><X size={18}  strokeWidth={2}/></button></div>
        <form onSubmit={form.submit} className="p-5 space-y-4 " data-testid="trainer_sessions-trainersessionseditmodal-form_2">
          {form.formState.errors.root?.message && <p role="alert" className="text-sm bg-danger-bg text-danger rounded-lg px-3 py-2 " data-testid={"trainer_sessions-edit_modal-error_state_33_1"}>{translateValidationMessage(form.formState.errors.root.message)}</p>}
          <div className="grid grid-cols-1 gap-4 ">
            <div><label htmlFor="trainer-session-edit-time" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_SESSION_TIME")}</label><input id="trainer-session-edit-time" type="time" {...form.register('time')} aria-invalid={Boolean(form.formState.errors.time)} aria-describedby={form.formState.errors.time ? "trainer-session-edit-time-error" : undefined} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionseditmodal-input_3"/>{form.formState.errors.time && <p className="text-xs text-danger mt-1 " id="trainer-session-edit-time-error" data-testid="trainer_sessions-edit-modal_time_error">{translateValidationMessage(form.formState.errors.time.message)}</p>}</div>
            <div><label htmlFor="trainer-session-edit-duration" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_DURATION")}</label><TrainerInfrastructureSearchableDropdown options={durationOptions} value={form.watch('duration')} onChange={value => form.setValue('duration', String(value), { shouldValidate: true, shouldDirty: true })} placeholder={t("TEXT_SELECT_DURATION")} ariaLabel={t("TEXT_DURATION")} ariaInvalid={Boolean(form.formState.errors.duration)} ariaDescribedBy={form.formState.errors.duration ? "trainer-session-edit-duration-error" : undefined} testId="trainer-sessions-sessions-edit-modal-select"/>{form.formState.errors.duration && <p id="trainer-session-edit-duration-error" role="alert" className="text-xs text-danger mt-1 " data-testid="trainer_sessions-edit-modal_duration_error">{translateValidationMessage(form.formState.errors.duration.message)}</p>}</div>
          </div>
          <div><label htmlFor="trainer-session-edit-location" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_LOCATION_STUDIO")}<span className="font-normal ">{t("TEXT_OPTIONAL")}</span></label><input id="trainer-session-edit-location" {...form.register('location')} aria-invalid={Boolean(form.formState.errors.location)} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionseditmodal-input_5"/></div>
          <div><label htmlFor="trainer-session-edit-room" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_ROOM")}<span className="font-normal ">{t("TEXT_OPTIONAL")}</span></label><input id="trainer-session-edit-room" {...form.register('room')} aria-invalid={Boolean(form.formState.errors.room)} className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionseditmodal-input_6"/></div>
          <div className="pt-4 flex justify-end gap-2 border-t border-border "><button type="button" onClick={() => void guardNavigation(onClose)} className="min-h-11 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionseditmodal-button_7">{t("TEXT_CANCEL")}</button><button type="submit" disabled={form.formState.isSubmitting || form.isSubmitting} className="min-h-11 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover disabled:opacity-70 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionseditmodal-button_8">{form.isSubmitting && <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/>}<Save size={18}  strokeWidth={2}/>{t("TEXT_SAVE_CHANGES")}</button></div>
        </form>
      </div>
    </div>
  );
}

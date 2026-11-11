"use client";
// RESPONSIBILITY: Renders the TrainerSessionsScheduleModal UI for the owning Trainer feature; data access remains in the feature API/query layer.
import React, { useRef } from 'react';

import { X, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsTrainerInfrastructureSearchableDropdown';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureDialogFocusTrap';

import { TRAINER_SESSIONS_DURATION_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { TRAINER_SESSIONS_SESSION_TYPE } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';

import { useTrainerSessionsScheduleForm } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsScheduleForm';

import type { TrainerSessionsScheduleModalProps } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsScheduleModalTypes';

import type { TrainerSessionsSessionType } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';













/**
 * @description Renders the TrainerSessionsScheduleModal UI for the owning Trainer feature; data access remains in the feature API/query layer.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the sessions feature form/modal surface for SessionsScheduleModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerSessionsScheduleModal({
  onClose,
  onSubmit,
  memberOptions,
  memberOptionsIsPending,
  memberOptionsIsError,
  memberOptionsIsFetching,
  onRetryMemberOptions,
  isSubmitting,
  testId,
}: TrainerSessionsScheduleModalProps) {
  const t = useTranslations('TRAINER_SESSIONS');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { form, handleSubmit } = useTrainerSessionsScheduleForm(onSubmit);
  const { register, watch, setValue, formState: { errors, isDirty } } = form;

  const durationOptions = TRAINER_SESSIONS_DURATION_OPTIONS.map(d => ({ value: d.value, label: t(d.labelKey) }));
  const selectedType = watch('type');
  const selectedMemberId = watch('memberId');
  const selectedDuration = watch('duration');

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !isSubmitting);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef, onEscape: () => void guardNavigation(onClose) });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 overflow-y-auto " role="presentation" data-testid={testId ?? "trainer_sessions-schedule-modal"}>
      <div ref={dialogRef} className="my-auto bg-overlay w-full max-w-md max-h-dialog-desktop flex flex-col rounded-2xl shadow-dialog border border-border overflow-hidden motion-safe:transition-opacity motion-safe:duration-base" role="dialog" aria-modal="true" aria-labelledby="trainer-session-schedule-title">
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0 bg-overlay ">
          <h3 id="trainer-session-schedule-title" className="text-lg font-bold text-primary ">{t("TEXT_SCHEDULE_PT_SESSION")}</h3>
          <button type="button"
            onClick={() => void guardNavigation(onClose)}
            className="min-w-11 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-input p-1 rounded-lg motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
            aria-label={t("TEXT_CLOSE_MODAL")} data-testid="trainer_sessions-trainersessionsschedulemodal-button_1">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1 min-h-0 " data-testid="trainer_sessions-trainersessionsschedulemodal-form_2">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_SESSION_TYPE")}</label>
            <TrainerInfrastructureSearchableDropdown
              options={[{value: TRAINER_SESSIONS_SESSION_TYPE.PT, label: t("TEXT_PERSONAL_TRAINING")}, {value: TRAINER_SESSIONS_SESSION_TYPE.GROUP, label: t("TEXT_GROUP_CLASS")}]}
              value={selectedType}
              onChange={(val: string | number) => setValue('type', val as TrainerSessionsSessionType, { shouldValidate: true })}
              placeholder={t("TEXT_CHOOSE_TYPE")}
              ariaLabel={t("TEXT_SESSION_TYPE")}
             testId="trainer-sessions-schedule-modal-choose-type"/>
            {errors.type && <p id="trainer-session-type-error" role="alert" className="text-xs text-danger mt-1 " data-testid={"trainer_sessions-schedule_modal-error_state_60_1"}>{t(errors.type?.message || '')}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_SELECT_MEMBER_OPTIONAL_FOR_GROUP")}</label>
            <TrainerInfrastructureSearchableDropdown
              options={memberOptions}
              value={selectedMemberId || ''}
              disabled={memberOptionsIsPending || memberOptionsIsError}
              onChange={(val: string | number) => setValue('memberId', String(val), { shouldValidate: true })}
              placeholder={t("TEXT_CHOOSE_MEMBER")}
              ariaLabel={t("TEXT_SELECT_MEMBER_OPTIONAL_FOR_GROUP")}
             ariaInvalid={Boolean(errors.memberId)}
             ariaDescribedBy={errors.memberId ? "trainer-session-member-error" : undefined}
             testId="trainer-sessions-schedule-modal-choose-member"/>
            {memberOptionsIsPending && <p role="status" className="text-xs text-secondary mt-1">{t('TEXT_MEMBERS_LOADING')}</p>}
            {memberOptionsIsError && <div className="mt-2 flex items-center gap-2"><p role="alert" className="text-xs text-danger">{t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY')}</p><button type="button" onClick={onRetryMemberOptions} disabled={memberOptionsIsFetching} className="min-h-11 px-3 rounded border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{memberOptionsIsFetching ? t('TEXT_RETRYING') : t('TEXT_RETRY')}</button></div>}
            {!memberOptionsIsPending && !memberOptionsIsError && memberOptions.length === 0 && <p className="text-xs text-secondary mt-1">{t('TEXT_NO_MEMBERS_FOUND')}</p>}
            {errors.memberId && <p id="trainer-session-member-error" role="alert" className="text-xs text-danger mt-1 " data-testid={"trainer_sessions-schedule_modal-error_state_71_2"}>{t(errors.memberId?.message || '')}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="trainer-sessions-schedule-date" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_DATE")}</label>
              <input
                id="trainer-sessions-schedule-date"
                type="date"
                {...register('date')}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "trainer-session-date-error" : undefined}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsschedulemodal-input_5"/>
              {errors.date && <p id="trainer-session-date-error" role="alert" className="text-xs text-danger mt-1 " data-testid={"trainer_sessions-schedule_modal-error_state_81_3"}>{t(errors.date?.message || '')}</p>}
            </div>
            <div>
              <label htmlFor="trainer-sessions-schedule-time" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_TIME")}</label>
              <input
                id="trainer-sessions-schedule-time"
                type="time"
                {...register('time')}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "trainer-session-time-error" : undefined}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsschedulemodal-input_6"/>
              {errors.time && <p id="trainer-session-time-error" role="alert" className="text-xs text-danger mt-1 " data-testid={"trainer_sessions-schedule_modal-error_state_90_4"}>{t(errors.time?.message || '')}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_DURATION")}</label>
            <TrainerInfrastructureSearchableDropdown
              options={durationOptions}
              value={selectedDuration}
              onChange={(val: string | number) => setValue('duration', val as any, { shouldValidate: true })}
              placeholder={t("TEXT_SELECT_DURATION")}
              ariaLabel={t("TEXT_DURATION")}
             ariaInvalid={Boolean(errors.duration)}
             ariaDescribedBy={errors.duration ? "trainer-session-duration-error" : undefined}
             testId="trainer-sessions-schedule-modal-duration"/>
            {errors.duration && <p id="trainer-session-duration-error" role="alert" className="text-xs text-danger mt-1 " data-testid={"trainer_sessions-schedule_modal-error_state_102_5"}>{t(errors.duration?.message || '')}</p>}
          </div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex justify-end gap-2 shrink-0 z-10 mt-4 ">
            <button
              type="button"
              onClick={() => void guardNavigation(onClose)}
              className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsschedulemodal-button_8">
              {t("TEXT_CANCEL")}</button>
            <button
              type="submit"
              disabled={isSubmitting || (selectedType === TRAINER_SESSIONS_SESSION_TYPE.PT && (memberOptionsIsPending || memberOptionsIsError))}
              className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-schedule-modal_submit">
              {isSubmitting && <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/>}
              {t("TEXT_CONFIRM_ASSIGNMENT")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}


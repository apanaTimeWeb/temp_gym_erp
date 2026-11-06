"use client";
// RESPONSIBILITY: Modal for recording a member attendance entry.
// DATA FLOW: props (from TrainerAttendanceMain) → react-hook-form + zod → onSubmit mutation
import { useEffect, useId, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { X, CheckCircle, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm, Controller } from 'react-hook-form';

import { TRAINER_ATTENDANCE_RECORD_TYPE } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceConstants';

import { TrainerAttendanceFormSchema } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/schemas/TrainerOperationsMemberAttendanceAttendanceFormSchema';

import { TrainerAttendanceEmptyForm } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceEmptyForm';

import { TrainerAttendanceMaskSensitiveData } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSearchableDropdown';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/TrainerOperationsMemberAttendanceuseTrainerInfrastructureDialogFocusTrap';

import type { TrainerAttendanceModalProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceModalProps';

import type { TrainerAttendanceFormValues } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

















/**
 * @description Modal for recording a new attendance entry (member or staff).
 * @dependencies props (from TrainerAttendanceMain) → react-hook-form + zod → onSubmit mutation
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the attendance feature form/modal surface for AttendanceModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerAttendanceModal({ isOpen, onClose, members, membersLoading, membersError, onRetryMembers, saving, onSubmit, testId = 'trainer-attendance-attendance-modal-root', initialMemberId = '' }: TrainerAttendanceModalProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<TrainerAttendanceFormValues>({
    resolver: zodResolver(TrainerAttendanceFormSchema),
    defaultValues: TrainerAttendanceEmptyForm(initialMemberId),
    mode: 'onTouched',
  });

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !saving);
  const titleId = useId();
  useTrainerInfrastructureDialogFocusTrap({ isOpen, dialogRef, onEscape: () => void guardNavigation(onClose) });

  // Effect contract: reset attendance form state to the selected record when the modal opens or the record changes.
  useEffect(() => {
    if (isOpen) reset(TrainerAttendanceEmptyForm(initialMemberId));
  }, [isOpen, initialMemberId, reset]);

  if (!isOpen) return null;

  const handleClose = () => { void guardNavigation(onClose); };

  const handleFormSubmit = async (data: TrainerAttendanceFormValues) => {
    await onSubmit({
      type: data.type,
      memberId: data.memberId,
      date: data.date,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      notes: data.notes,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 " ref={dialogRef} role="dialog" aria-modal={true} aria-labelledby={titleId} data-testid={testId}>
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md overflow-hidden border border-border motion-safe:transition-opacity motion-safe:duration-base">
        <div className="flex justify-between items-center p-5 border-b border-border ">
          <h3 id={titleId} className="font-bold text-lg text-primary ">{t("TEXT_RECORD_ATTENDANCE")}</h3>
          <button
            type="button"
            onClick={handleClose}
            className="min-w-11 min-h-11 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
            aria-label={t("TEXT_CLOSE_MODAL")} data-testid="trainer_attendance-trainerattendancemodal-button_1">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4 " data-testid="trainer_attendance-trainerattendancemodal-form_2">
          <input type="hidden" {...register('type')} value={TRAINER_ATTENDANCE_RECORD_TYPE.MEMBER} />

          <div>
            <label htmlFor="attendance-member-selector" className="block text-sm font-medium text-secondary mb-1">{t('TEXT_SELECT_MEMBER_095554')}</label>
            {membersLoading ? (
              <p role="status" aria-live="polite" className="text-sm text-secondary py-2" data-testid="trainer_attendance-members-loading">{t('TEXT_LOADING_MEMBERS')}</p>
            ) : membersError ? (
              <div className="rounded-lg border border-danger-bg bg-danger-bg p-3 text-sm" role="alert" data-testid="trainer_attendance-members-error">
                <p className="text-danger">{t('TEXT_UNABLE_TO_LOAD_MEMBERS')}</p>
                <button type="button" onClick={onRetryMembers} className="mt-2 min-h-11 rounded-md px-3 font-semibold underline text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid="trainer_attendance-members-retry">{t('TEXT_RETRY_MEMBER_LOOKUP')}</button>
              </div>
            ) : members.length === 0 ? (
              <p className="text-sm text-secondary py-2" data-testid="trainer_attendance-members-empty">{t('TEXT_NO_MEMBERS_AVAILABLE')}</p>
            ) : (
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <TrainerInfrastructureSearchableDropdown
                    options={members.map(m => ({ label: `${m.name}${m.phone ? ` (${TrainerAttendanceMaskSensitiveData(m.phone)})` : ''}`, value: m.id }))}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    placeholder={t('TEXT_SEARCH_MEMBER')}
                    ariaLabel={t('TEXT_SEARCH_MEMBER')}
                    ariaInvalid={Boolean(errors.memberId)}
                    ariaDescribedBy={errors.memberId ? 'trainer-attendance-member-error' : undefined}
                    id="attendance-member-selector" testId="trainer_attendance-attendance-modal-search"/>
                )}
              />
            )}
            {errors.memberId && (
              <p id="trainer-attendance-member-error" className="text-danger text-xs mt-1" role="alert" data-testid="trainer_attendance_modal_form_error_state">{t(errors.memberId?.message || '')}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="attendance-date" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_DATE")}</label>
              <input
                id="attendance-date"
                type="date"
                {...register('date')}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "trainer-attendance-date-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_attendance-trainerattendancemodal-input_5"/>
              {errors.date && <p id="trainer-attendance-date-error" className="text-danger text-xs mt-1 " data-testid={"trainer_attendance-modal-error-state-134"}>{t(errors.date?.message || '')}</p>}
            </div>
            <div>
              <label htmlFor="attendance-check-in" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_CHECK_IN_TIME")}</label>
              <input
                id="attendance-check-in"
                type="time"
                {...register('checkIn')}
                aria-invalid={Boolean(errors.checkIn)}
                aria-describedby={errors.checkIn ? "attendance-check-in-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.checkIn ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_attendance-trainerattendancemodal-input_6"/>
              {errors.checkIn && <p id="attendance-check-in-error" className="text-danger text-xs mt-1 " data-testid={"trainer_attendance-modal-error-state-147"}>{t(errors.checkIn?.message || '')}</p>}
            </div>
            <div>
              <label htmlFor="attendance-check-out" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_CHECK_OUT_TIME")}</label>
              <input
                id="attendance-check-out"
                type="time"
                {...register('checkOut')}
                aria-invalid={Boolean(errors.checkOut)}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancemodal-input_7"/>
            </div>
            <div>
              <label htmlFor="attendance-notes" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_NOTES")}</label>
              <input
                id="attendance-notes"
                type="text"
                {...register('notes')}
                aria-invalid={Boolean(errors.notes)}
                placeholder={t("TEXT_OPTIONAL_NOTES")}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancemodal-input_8"/>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3 ">
            <button
              type="button"
              onClick={handleClose}
              className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancemodal-button_9">
              {t("TEXT_CANCEL")}</button>
            <button
              type="submit"
              disabled={saving || membersLoading || membersError || members.length === 0}
              className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-32 px-4 py-2 rounded-lg font-medium text-on-primary bg-primary flex items-center justify-center gap-2 hover:bg-primary-hover motion-safe:transition-opacity disabled:opacity-70 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-attendance-modal_submit">
              {saving ? <><Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> {t("TEXT_SAVING")}</> : <><CheckCircle size={18}  strokeWidth={2}/> {t("TEXT_SAVE_RECORD")}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


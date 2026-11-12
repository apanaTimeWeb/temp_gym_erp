"use client";
// RESPONSIBILITY: Modal for trainers to submit a new leave request.
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { X, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm, useWatch } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/TrainerOperationsLeaveRequestsuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/TrainerOperationsLeaveRequestsuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/TrainerOperationsLeaveRequestsuseTrainerInfrastructureUnsavedChangesGuard';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/TrainerOperationsLeaveRequestsuseTrainerInfrastructureDialogFocusTrap';

import { TRAINER_SCHEDULE_LEAVE_TYPE_OPTIONS } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleConstants';

import { useTrainerScheduleMutations } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/useTrainerOperationsLeaveRequestsScheduleMutations';

import { TrainerScheduleCreateLeaveDtoSchema } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/schemas/TrainerOperationsLeaveRequestsScheduleDomainSchemas';

import { useTrainerScheduleStore } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/state/useTrainerOperationsLeaveRequestsScheduleStore';

import type { TrainerScheduleCreateLeaveDto } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/types/TrainerOperationsLeaveRequestsScheduleTypes';

















/**
 * @description Modal for trainers to submit a new leave request.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the schedule feature form/modal surface for ScheduleRequestLeaveModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerScheduleRequestLeaveModal() {
  const t = useTranslations('TRAINER_SCHEDULE');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showLeaveModal, closeLeaveModal } = useTrainerScheduleStore();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const { requestLeave, requestLeavePending } = useTrainerScheduleMutations();
  
  const {
    register,
    handleSubmit: submitForm,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm<TrainerScheduleCreateLeaveDto>({
    resolver: zodResolver(TrainerScheduleCreateLeaveDtoSchema),
    defaultValues: { leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' },
    mode: 'onTouched',
  });

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !requestLeavePending);
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const watchedPayload = useWatch({ control });
  const payloadFingerprint = JSON.stringify(watchedPayload);
  useEffect(() => {
    actionKeys.syncPayload('request-leave', payloadFingerprint);
  }, [actionKeys.syncPayload, payloadFingerprint]);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: showLeaveModal, dialogRef, onEscape: () => void handleClose() });

// Effect contract: synchronize modal form values when the modal opens for a fresh leave request.
  useEffect(() => {
    if (showLeaveModal) {
      reset({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
    }
  }, [showLeaveModal, reset]);

  if (!showLeaveModal) return null;

  const handleClose = async () => {
    const approved = await guardNavigation(closeLeaveModal);
    if (approved) actionKeys.clear('request-leave');
  };

  const handleSubmit = async (data: TrainerScheduleCreateLeaveDto) => {
    try {
      const response = await requestLeave({ data, idempotencyKey: actionKeys.begin('request-leave') });
      showSuccess(response.message, 'trainer-schedule-leave-success');
      actionKeys.clear('request-leave');
      reset({ leaveType: 'Casual Leave', startDate: '', endDate: '', reason: '' });
      closeLeaveModal();
    } catch (error) {
      showError(error, 'trainer-schedule-leave-error');
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-overlay-backdrop backdrop-blur-sm z-40 motion-safe:transition-opacity" onClick={() => void handleClose()}  data-testid="trainer_schedule-trainerschedulerequestleavemodal-div_1"/>
      <div ref={dialogRef} className="fixed end-0 top-0 h-full w-full max-w-drawer bg-overlay border-s border-border shadow-dialog z-40 flex flex-col motion-safe:transition-transform motion-safe:duration-slow" role="dialog" aria-modal="true" aria-labelledby="trainer-request-leave-title">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-header shrink-0">
          <div>
            <h2 id="trainer-request-leave-title" className="text-section-title font-black text-primary">{t("TEXT_REQUEST_LEAVE")}</h2>
            <p className="text-xs text-secondary mt-1">{t("TEXT_SUBMIT_TIME_OFF_FOR_MANAGER_APPROVAL")}</p>
          </div>
          <button type="button" onClick={() => void handleClose()} className="min-w-11 min-h-11 inline-flex items-center justify-center p-2 bg-input hover:bg-input text-secondary rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t("TEXT_CANCEL")} data-testid="trainer_schedule-trainerschedulerequestleavemodal-button_2">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <form id="leave-form" onSubmit={submitForm(handleSubmit)} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar" data-testid="trainer_schedule-trainerschedulerequestleavemodal-form_3">
          <div>
            <label htmlFor="trainer-leave-type" className="block text-sm font-bold text-primary mb-1.5">{t("TEXT_LEAVE_TYPE")}</label>
            <select
              id="trainer-leave-type"
              aria-invalid={Boolean(errors.leaveType)}
              aria-describedby={errors.leaveType ? "trainer-leave-type-error" : undefined}
              {...register('leaveType')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all ${errors.leaveType ? 'border-border focus-visible:border-border focus-visible:ring-focus-ring' : 'border-border focus-visible:border-focus focus-visible:ring-focus-ring'}`}
             data-testid="trainer_schedule-trainerschedulerequestleavemodal-select_4">
              {TRAINER_SCHEDULE_LEAVE_TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} data-testid={`trainer_schedule-request-leave_modal_leave_type_option${opt.value}`}>{t(opt.labelKey)}</option>
              ))}
            </select>
            {errors.leaveType && <p id="trainer-leave-type-error" className="text-danger text-xs mt-1" data-testid={"trainer_schedule-request-leave-modal-error-state-101"}>{t(errors.leaveType?.message || '')}</p>}
          </div>

          <div>
            <label htmlFor="trainer-leave-start-date" className="block text-sm font-bold text-primary mb-1.5">{t("TEXT_START_DATE")}</label>
            <input 
              id="trainer-leave-start-date"
              type="date"
              aria-invalid={Boolean(errors.startDate)}
              aria-describedby={errors.startDate ? "trainer-leave-start-date-error" : undefined}
              {...register('startDate')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all ${errors.startDate ? 'border-border focus-visible:border-border focus-visible:ring-focus-ring' : 'border-border focus-visible:border-focus focus-visible:ring-focus-ring'}`}
             data-testid="trainer_schedule-trainerschedulerequestleavemodal-input_5"/>
            {errors.startDate && <p id="trainer-leave-start-date-error" className="text-danger text-xs mt-1" data-testid={"trainer_schedule-request-leave-modal-error-state-114"}>{t(errors.startDate?.message || '')}</p>}
          </div>
          
          <div>
            <label htmlFor="trainer-leave-end-date" className="block text-sm font-bold text-primary mb-1.5">{t("TEXT_END_DATE")}</label>
            <input 
              id="trainer-leave-end-date"
              type="date"
              aria-invalid={Boolean(errors.endDate)}
              aria-describedby={errors.endDate ? "trainer-leave-end-date-error" : undefined}
              {...register('endDate')}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all ${errors.endDate ? 'border-border focus-visible:border-border focus-visible:ring-focus-ring' : 'border-border focus-visible:border-focus focus-visible:ring-focus-ring'}`}
             data-testid="trainer_schedule-trainerschedulerequestleavemodal-input_6"/>
            {errors.endDate && <p id="trainer-leave-end-date-error" className="text-danger text-xs mt-1" data-testid={"trainer_schedule-request-leave-modal-error-state-127"}>{t(errors.endDate?.message || '')}</p>}
          </div>

          <div>
            <label htmlFor="trainer-leave-reason" className="block text-sm font-bold text-primary mb-1.5">{t("TEXT_REASON_FOR_LEAVE")}</label>
            <textarea
              id="trainer-leave-reason"
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? "trainer-leave-reason-error" : undefined}
              rows={4}
              {...register('reason')}
              placeholder={t("TEXT_E_G_MEDICAL_REASONS_FAMILY_FUNCTION")}
              className={`w-full bg-input border rounded-xl px-4 py-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-1 motion-safe:transition-all resize-none ${errors.reason ? 'border-border focus-visible:border-border focus-visible:ring-focus-ring' : 'border-border focus-visible:border-focus focus-visible:ring-focus-ring'}`}
             data-testid="trainer_schedule-trainerschedulerequestleavemodal-textarea_7"/>
            {errors.reason && <p id="trainer-leave-reason-error" className="text-danger text-xs mt-1" data-testid={"trainer_schedule-request-leave-modal-error-state-141"}>{t(errors.reason?.message || '')}</p>}
          </div>
        </form>

        <div className="p-4 sm:p-6 border-t border-border bg-header flex justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={() => void handleClose()}
            className="min-h-11 px-5 py-2.5 text-sm font-bold text-secondary bg-input hover:bg-input rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_schedule-trainerschedulerequestleavemodal-button_8">
            {t("TEXT_CANCEL")}</button>
          <button 
            type="submit"
            form="leave-form"
            disabled={requestLeavePending}
            className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-on-primary bg-primary hover:bg-primary-hover rounded-xl motion-safe:transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_schedule-schedule-request_leave_modal_submit">
            {requestLeavePending ? <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> : null}
            {t("TEXT_SUBMIT_REQUEST")}</button>
        </div>

      </div>
    </>
  );
}


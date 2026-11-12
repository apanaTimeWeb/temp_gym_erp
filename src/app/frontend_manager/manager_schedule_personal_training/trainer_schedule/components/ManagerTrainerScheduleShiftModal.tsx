// RESPONSIBILITY: Renders ManagerTrainerScheduleShiftModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { X, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleLocalDialogFocusTrap';

import { SHIFT_DAYS, SHIFT_STATUS_OPTIONS, TIME_OPTIONS } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/constants/manager_trainer_schedule_shared.constants';
import { useManagerTrainerScheduleShiftForm } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/hooks/useManagerTrainerScheduleShiftForm';

/** @description Renders the ManagerTrainerScheduleShiftModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerTrainerScheduleShiftModal() {
  const t = useTranslations('MANAGER_TRAINER_SCHEDULE');

  const { open, editShift, form, submit, handleClose, trainers } = useManagerTrainerScheduleShiftForm();
  const dialogRef = useRef<HTMLDivElement>(null);
  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: open, onClose: handleClose });
  const { register, formState: { errors, isSubmitting } } = form;
  if (!open) return null;
  return (
    <div data-testid="manager_schedule-managerscheduleshiftmodal-dialog" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 overflow-y-auto" role="presentation">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="manager-schedule-shift-title" className="my-auto bg-overlay border border-border rounded-2xl shadow-dialog w-full max-w-md max-h-dialog-desktop flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border shrink-0 bg-overlay">
          <h2 id="manager-schedule-shift-title" className="text-lg font-bold text-text-primary">{editShift ? t('COPY_EDIT_SHIFT_2') : t('COPY_ADD_SHIFT')}</h2>
          <button data-testid="manager_schedule-manager-schedule-shift-modal-close-1" type="button" onClick={handleClose} className="p-1.5 rounded-lg min-h-11 min-w-11 inline-flex items-center justify-center hover:bg-input text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" aria-label={t("COPY_CLOSE_SHIFT_FORM")}>
            <X size={18} strokeWidth={2}/>
          </button>
        </div>
        <form onSubmit={submit} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6 custom-scrollbar" data-testid="manager_schedule-managerscheduleshiftmodal-form-1">
          <div>
            <label htmlFor="manager-managerscheduleshiftmodal-field-1" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_TRAINER_1")}</label>
            <ManagerSearchableDropdown ariaLabel={t("COPY_TRAINER_1")} dataTestId="manager_schedule-managerscheduleshiftmodal-managersearchabledropdown-1" value={form.getValues('trainerId')} onChange={(value) => form.setValue('trainerId', String(value), { shouldDirty: true, shouldValidate: true })} options={trainers.map((t) => ({ value: t.trainerId, label: `${t.trainerName} — ${t.trainerRole}` }))} placeholder={t("COPY_SELECT_TRAINER")}  data-testid="manager_schedule-managerscheduleshiftmodal-searchable-dropdown-1"/>
            {errors.trainerId && <p id="managerscheduleshiftmodal-trainerId-error" className="text-xs text-danger-text mt-1">{errors.trainerId.message}</p>}
          </div>
          <div>
            <label htmlFor="manager-managerscheduleshiftmodal-field-2" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_DAY")}</label>
            <select id="manager-managerscheduleshiftmodal-field-2" data-testid="manager_schedule-manager-schedule-shift-modal-select-option-1" {...register('day')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={errors.day ? 'true' : undefined} aria-describedby={errors.day ? 'managerscheduleshiftmodal-day-error' : undefined}>
              {SHIFT_DAYS.map((day) => <option key={day} value={day} data-testid={`manager_schedule-managerscheduleshiftmodal-option-day-${day}`}>{day}</option>)}
            </select>
            {errors.day && <p id="managerscheduleshiftmodal-day-error" className="text-xs text-danger-text mt-1">{errors.day.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="manager-managerscheduleshiftmodal-field-3" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_START_TIME")}</label>
              <select id="manager-managerscheduleshiftmodal-field-3" data-testid="manager_schedule-manager-schedule-shift-modal-select-option-2" {...register('startTime')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={errors.startTime ? 'true' : undefined} aria-describedby={errors.startTime ? 'managerscheduleshiftmodal-startTime-error' : undefined}>
                {TIME_OPTIONS.map((time) => <option key={time} value={time} data-testid={`manager_schedule-managerscheduleshiftmodal-option-start-${time}`}>{time}</option>)}
              </select>
              {errors.startTime && <p id="managerscheduleshiftmodal-startTime-error" className="text-xs text-danger-text mt-1">{errors.startTime.message}</p>}
            </div>
            <div>
              <label htmlFor="manager-managerscheduleshiftmodal-field-4" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_END_TIME")}</label>
              <select id="manager-managerscheduleshiftmodal-field-4" data-testid="manager_schedule-manager-schedule-shift-modal-select-option-3" {...register('endTime')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={errors.endTime ? 'true' : undefined} aria-describedby={errors.endTime ? 'managerscheduleshiftmodal-endTime-error' : undefined}>
                {TIME_OPTIONS.map((time) => <option key={time} value={time} data-testid={`manager_schedule-managerscheduleshiftmodal-option-end-${time}`}>{time}</option>)}
              </select>
              {errors.endTime && <p id="managerscheduleshiftmodal-endTime-error" className="text-xs text-danger-text mt-1">{errors.endTime.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="manager-managerscheduleshiftmodal-field-5" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_STATUS")}</label>
            <select id="manager-managerscheduleshiftmodal-field-5" data-testid="manager_schedule-manager-schedule-shift-modal-select-option-4" {...register('status')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">
              {SHIFT_STATUS_OPTIONS.map((status) => <option key={status} value={status} data-testid={`manager_schedule-managerscheduleshiftmodal-option-status-${status}`}>{status}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="manager-managerscheduleshiftmodal-field-6" className="block text-sm font-medium text-text-secondary mb-1">{t("COPY_NOTES")}</label>
            <input id="manager-managerscheduleshiftmodal-field-6" data-testid="manager_schedule-manager-schedule-shift-modal-input-value" {...register('notes')} className="w-full bg-input border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" />
          </div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-4 flex justify-end gap-3 shrink-0">
            <button data-testid="manager_schedule-manager-schedule-shift-modal-close-2" type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">{t("COPY_CANCEL")}</button>
            <button data-testid="manager_schedule-manager-schedule-shift-modal-button-submit" type="submit" disabled={isSubmitting} className="min-w-32 px-5 py-2 text-sm font-semibold bg-primary text-on-primary rounded-lg disabled:opacity-60 flex items-center justify-center gap-2 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110">
              {isSubmitting && <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>}
              {editShift ? t('COPY_SAVE_CHANGES') : t('COPY_ADD_SHIFT')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

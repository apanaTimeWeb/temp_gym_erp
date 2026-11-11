"use client";
// RESPONSIBILITY: Renders the accessible add/edit form for one progress entry; mutation ownership stays in TrainerProgressTrackingMain.
// DATA FLOW: RHF + Zod form -> onSave Promise -> API mutation -> success closes/resets, failure preserves input.

import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { X, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureUnsavedChangesGuard';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/TrainerCoachingIndividualProgressuseTrainerInfrastructureDialogFocusTrap';

import { TrainerProgressTrackingCreateProgressEntrySchema } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/schemas/TrainerCoachingIndividualProgressProgressTrackingDomainSchemas';

import type { TrainerProgressTrackingModalProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingModalProps';

import type { TrainerProgressTrackingCreateProgressEntryFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';












/**
 * @description Owns the progress tracking feature UI responsibility represented by EMPTY, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const EMPTY: TrainerProgressTrackingCreateProgressEntryFormValues = {
  date: new Date().toISOString().slice(0, 10),
  weightKg: 0,
  heightCm: 0,
};

/**
 * @description Owns the progress tracking feature UI responsibility represented by INPUT_CLASS, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const INPUT_CLASS = 'w-full px-3 py-2 border border-border rounded-lg bg-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95';

/**
 * @description Provides the create/edit form for member progress entries with schema validation and mutation state handling.
 * @dependencies Progress-tracking schema, mutation hook, and module-owned feedback contract.
 * @edge-case Editing retains the selected entry identity and failed submissions preserve entered values.
 */
/**
 * @description Renders and coordinates the progress tracking feature form/modal surface for ProgressTrackingModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerProgressTrackingModal({ editingEntry, onSave, onClose, testId }: TrainerProgressTrackingModalProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const dialogRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TrainerProgressTrackingCreateProgressEntryFormValues>({
    resolver: zodResolver(TrainerProgressTrackingCreateProgressEntrySchema),
    defaultValues: EMPTY,
  
    mode: 'onTouched',});

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef, onEscape: () => void guardNavigation(onClose) });

// Effect contract: synchronize editable entry values into React Hook Form when the selected entry changes.
  useEffect(() => {
    if (editingEntry) {
      reset({
        date: editingEntry.date,
        weightKg: editingEntry.weightKg,
        heightCm: editingEntry.heightCm,
        bodyFatPercent: editingEntry.bodyFatPercent ?? undefined,
        muscleMassKg: editingEntry.muscleMassKg ?? undefined,
        chestCm: editingEntry.chestCm ?? undefined,
        waistCm: editingEntry.waistCm ?? undefined,
        hipCm: editingEntry.hipCm ?? undefined,
        notes: editingEntry.notes ?? undefined,
      });
    } else {
      reset(EMPTY);
    }
  }, [editingEntry, reset]);

  const handleFormSubmit = async (formData: TrainerProgressTrackingCreateProgressEntryFormValues) => {
    const data = TrainerProgressTrackingCreateProgressEntrySchema.parse(formData);
    const succeeded = await onSave(data);
    if (succeeded) reset(data);
  };

  const handleClose = () => { void guardNavigation(onClose); };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay-backdrop p-4 " role="presentation" data-testid={testId}>
      <div className="my-auto bg-overlay w-full max-w-lg max-h-dialog-desktop flex flex-col rounded-2xl shadow-dialog border border-border overflow-hidden motion-safe:transition-opacity motion-safe:duration-base" ref={dialogRef} role="dialog" aria-modal={true} aria-labelledby="trainer-progress-modal-title">
        <div className="flex items-center justify-between p-5 border-b border-border shrink-0 bg-overlay ">
          <h3 id="trainer-progress-modal-title" className="text-lg font-bold text-primary ">{editingEntry ? t("TEXT_EDIT_ENTRY") : t("TEXT_ADD_PROGRESS_ENTRY")}</h3>
          <button type="button" onClick={handleClose} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-secondary hover:text-primary hover:bg-input p-2 rounded-lg motion-safe:transition-colors motion-safe:duration-base min-w-11 min-h-11 motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t("TEXT_CLOSE_MODAL")} data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-button_1"><X size={18}  strokeWidth={2}/></button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1 min-h-0 " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-form_2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div><label htmlFor="progress-date" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_DATE")}</label><input id="progress-date" type="date" aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "progress-date-error" : undefined} {...register('date')} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_3"/>{errors.date && <span id="progress-date-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-progress-tracking_progress_tracking_modal_progress_date_error">{t(errors.date?.message || '')}</span>}</div>
            <div><label htmlFor="progress-weight" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_WEIGHT_KG")}</label><input id="progress-weight" type="number" min="30" max="300" step="0.1" aria-invalid={Boolean(errors.weightKg)} aria-describedby={errors.weightKg ? "progress-weight-error" : undefined} {...register('weightKg', { valueAsNumber: true })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_4"/>{errors.weightKg && <span id="progress-weight-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-progress-tracking_progress_tracking_modal_progress_weight_error">{t(errors.weightKg?.message || '')}</span>}</div>
            <div><label htmlFor="progress-height" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_HEIGHT_CM")}</label><input id="progress-height" type="number" min="100" max="300" step="0.1" aria-invalid={Boolean(errors.heightCm)} aria-describedby={errors.heightCm ? "progress-height-error" : undefined} {...register('heightCm', { valueAsNumber: true })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_5"/>{errors.heightCm && <span id="progress-height-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_5_error">{t(errors.heightCm?.message || '')}</span>}</div>
            <div><label htmlFor="progress-body-fat" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_BODY_FAT")}</label><input id="progress-body-fat" type="number" min="3" max="60" step="0.1" aria-invalid={Boolean(errors.bodyFatPercent)} aria-describedby={errors.bodyFatPercent ? "progress-body-fat-error" : undefined} {...register('bodyFatPercent', { setValueAs: (value) => value === '' ? undefined : Number(value) })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_6"/>{errors.bodyFatPercent && <span id="progress-body-fat-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_6_error">{t(errors.bodyFatPercent?.message || '')}</span>}</div>
            <div><label htmlFor="progress-muscle" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_MUSCLE_MASS_KG")}</label><input id="progress-muscle" type="number" min="10" max="150" step="0.1" aria-invalid={Boolean(errors.muscleMassKg)} aria-describedby={errors.muscleMassKg ? "progress-muscle-error" : undefined} {...register('muscleMassKg', { setValueAs: (value) => value === '' ? undefined : Number(value) })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_7"/>{errors.muscleMassKg && <span id="progress-muscle-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_7_error">{t(errors.muscleMassKg?.message || '')}</span>}</div>
            <div><label htmlFor="progress-waist" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_WAIST_CM")}</label><input id="progress-waist" type="number" min="1" max="300" step="0.1" aria-invalid={Boolean(errors.waistCm)} aria-describedby={errors.waistCm ? "progress-waist-error" : undefined} {...register('waistCm', { setValueAs: (value) => value === '' ? undefined : Number(value) })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_8"/>{errors.waistCm && <span id="progress-waist-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_8_error">{t(errors.waistCm?.message || '')}</span>}</div>
            <div><label htmlFor="progress-chest" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_CHEST_CM")}</label><input id="progress-chest" type="number" min="1" max="300" step="0.1" aria-invalid={Boolean(errors.chestCm)} aria-describedby={errors.chestCm ? "progress-chest-error" : undefined} {...register('chestCm', { setValueAs: (value) => value === '' ? undefined : Number(value) })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_9"/>{errors.chestCm && <span id="progress-chest-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_9_error">{t(errors.chestCm?.message || '')}</span>}</div>
            <div><label htmlFor="progress-hip" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_HIP_CM")}</label><input id="progress-hip" type="number" min="1" max="300" step="0.1" aria-invalid={Boolean(errors.hipCm)} aria-describedby={errors.hipCm ? "progress-hip-error" : undefined} {...register('hipCm', { setValueAs: (value) => value === '' ? undefined : Number(value) })} className={INPUT_CLASS}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_10"/>{errors.hipCm && <span id="progress-hip-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-input_10_error">{t(errors.hipCm?.message || '')}</span>}</div>
          </div>
          <div><label htmlFor="progress-notes" className="block text-sm font-semibold text-secondary mb-1 ">{t("TEXT_NOTES")}</label><textarea id="progress-notes" rows={2} aria-invalid={Boolean(errors.notes)} aria-describedby={errors.notes ? "progress-notes-error" : undefined} {...register('notes')} className={`${INPUT_CLASS} resize-none  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}  data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-textarea_11"/>{errors.notes && <span id="progress-notes-error" role="alert" className="text-xs text-danger mt-1 block " data-testid="trainer_progress_tracking-progress-tracking_progress_tracking_modal_progress_notes_error">{t(errors.notes?.message || '')}</span>}</div>
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-3 flex justify-end gap-2 z-10 shrink-0 ">
            <button type="button" onClick={handleClose} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-button_12">{t("TEXT_CANCEL")}</button>
            <button type="submit" disabled={isSubmitting} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-36 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_progress_tracking-trainerprogresstrackingmodal-button_13">{isSubmitting && <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/>}{editingEntry ? t("TEXT_SAVE_CHANGES") : t("TEXT_ADD_ENTRY")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}


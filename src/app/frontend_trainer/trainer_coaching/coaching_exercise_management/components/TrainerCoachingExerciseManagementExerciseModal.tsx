"use client";
// RESPONSIBILITY: Form modal for creating or editing a single exercise entry in the TrainerWorkoutWorkout Library module.
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, X, Save } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm, Controller } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureSearchableDropdown';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureDialogFocusTrap';

import { TRAINER_WORKOUT_EQUIPMENT_OPTIONS, TRAINER_WORKOUT_EXERCISE_DIFFICULTY_OPTIONS, TRAINER_WORKOUT_EXERCISE_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementConstants';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters';

import { useTrainerWorkoutMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementMutations';

import { useTrainerWorkoutExercisesQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementQuery';

import { TrainerWorkoutCreateExerciseSchema, TrainerWorkoutEMPTY_EXERCISE_FORM } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/schemas/TrainerCoachingExerciseManagementDomainSchemas';

import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/state/useTrainerCoachingExerciseManagementStore';

import type { TrainerWorkoutCreateExerciseFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTypes';

/**
 * @description Form modal for creating or editing a single exercise entry in the TrainerWorkoutWorkout Library module.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the workout feature form/modal surface for WorkoutExerciseModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerWorkoutExerciseModal() {
  const t = useTranslations('TRAINER_WORKOUT');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showExModal, setShowExModal, editExerciseId, setEditExerciseId } = useTrainerWorkoutStore();
  const { search, category, page, sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data: exerciseData } = useTrainerWorkoutExercisesQuery(search, category, page, sortBy, sortDirection, showExModal && Boolean(editExerciseId));
  const editExercise = exerciseData?.exercises.find((exercise) => exercise.id === editExerciseId) ?? null;
  const { createExercise, createExercisePending, updateExercise, updateExercisePending } = useTrainerWorkoutMutations();

  const {
    register,
    handleSubmit: submitForm,
    reset,
    control,
    formState: { errors, isDirty }
  } = useForm<TrainerWorkoutCreateExerciseFormValues>({
    resolver: zodResolver(TrainerWorkoutCreateExerciseSchema),
    defaultValues: TrainerWorkoutEMPTY_EXERCISE_FORM,
    mode: 'onTouched',});

  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();

// Effect contract: initialize exercise form fields from the selected exercise when the modal opens.
  useEffect(() => {
    if (showExModal) {
      if (editExercise) {
        reset({
          name: editExercise.name,
          category: editExercise.category ?? 'Strength',
          muscle: editExercise.muscleGroup?.[0] ?? '',
          equipment: editExercise.equipment ?? 'Bodyweight',
          difficulty: editExercise.difficulty,
          instructions: editExercise.instructions ?? '',
          videoUrl: editExercise.videoUrl ?? ''
        });
      } else {
        reset(TrainerWorkoutEMPTY_EXERCISE_FORM);
      }
    }
  }, [showExModal, editExercise, reset]);

  const isSaving = createExercisePending || updateExercisePending;

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !isSaving);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: showExModal, dialogRef, onEscape: () => void guardNavigation(() => { setEditExerciseId(null); setShowExModal(false); }) });

  const handleSubmit = async (data: TrainerWorkoutCreateExerciseFormValues) => {
    const dto = TrainerWorkoutCreateExerciseSchema.parse(data);
    const actionId = editExercise ? `update-exercise-${editExercise.id}` : 'create-exercise';
    const key = actionKeys.begin(actionId);
    try {
      const response = editExercise
        ? await updateExercise({ id: editExercise.id, dto, idempotencyKey: key })
        : await createExercise({ dto, idempotencyKey: key });
      showSuccess(response.message, actionId);
      reset(dto);
      actionKeys.clear(actionId);
      setEditExerciseId(null);
      setShowExModal(false);
    } catch (error) {
      showError(error, actionId);
    }
  };

  if (!showExModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-overlay-backdrop p-3 sm:p-4" role="presentation">
      <div className="my-auto flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-white dark:bg-[#0F172A] shadow-dialog overflow-hidden" ref={dialogRef} role="dialog" aria-modal={true} aria-labelledby="trainer-workout-exercise-modal-title">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-border shrink-0 bg-white dark:bg-[#0F172A]">
          <h3 id="trainer-workout-exercise-modal-title" className="font-bold text-lg text-text-primary">
            {editExercise ? t("TEXT_EDIT_EXERCISE") : t("TEXT_ADD_EXERCISE")}
          </h3>
          <button
            type="button"
            onClick={() => void guardNavigation(() => { setEditExerciseId(null); setShowExModal(false); })}
            className="min-w-10 min-h-10 inline-flex items-center justify-center text-secondary hover:text-primary hover:bg-primary-subtle p-1.5 rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" aria-label={t("TEXT_CANCEL")} data-testid="trainer_workout-trainerworkoutexercisemodal-button_1">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <form onSubmit={submitForm(handleSubmit)} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5 custom-scrollbar" data-testid="trainer_workout-trainerworkoutexercisemodal-form_2">
          <div>
            <label htmlFor="trainer-workout-exercise-name" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_EXERCISE_NAME")}</label>
            <input id="trainer-workout-exercise-name"
              type="text"
              {...register('name')}
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "trainer-workout-exercise-name-error" : undefined}
              className={`w-full min-h-11 px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                errors.name ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
              } bg-input text-text-primary`} data-testid="trainer_workout-trainerworkoutexercisemodal-input_3"/>
            {errors.name && <p id="trainer-workout-exercise-name-error" role="alert" className="text-danger text-xs mt-1" data-testid={"trainer_workout-exercise_modal-error_state_109_1"}>{t(errors.name?.message || '')}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="trainer-workout-exercise-muscle" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_PRIMARY_MUSCLE")}</label>
              <input id="trainer-workout-exercise-muscle"
                type="text"
                placeholder={t("TEXT_E_G_CHEST_QUADRICEPS")}
                {...register('muscle')}
                aria-invalid={Boolean(errors.muscle)} aria-describedby={errors.muscle ? "trainer-workout-exercise-muscle-error" : undefined}
                className={`w-full min-h-11 px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.muscle ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-text-primary`} data-testid="trainer_workout-trainerworkoutexercisemodal-input_4"/>
              {errors.muscle && <p id="trainer-workout-exercise-muscle-error" role="alert" className="text-danger text-xs mt-1" data-testid={"trainer_workout-exercise_modal-error_state_121_2"}>{t(errors.muscle?.message || '')}</p>}
            </div>
            <div>
              <label htmlFor="trainer-workout-exercise-category" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_CATEGORY")}</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TrainerInfrastructureSearchableDropdown
                    value={field.value || 'Strength'}
                    onChange={field.onChange}
                    options={TRAINER_WORKOUT_EXERCISE_CATEGORY_OPTIONS.map(c => ({ label: t(c.labelKey), value: c.value }))}
                    id="trainer-workout-exercise-category" ariaLabel={t("TEXT_CATEGORY")} testId="trainer-workout-workout-exercise-modal-category"/>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="trainer-workout-exercise-equipment" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_EQUIPMENT")}</label>
              <Controller
                name="equipment"
                control={control}
                render={({ field }) => (
                  <TrainerInfrastructureSearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={TRAINER_WORKOUT_EQUIPMENT_OPTIONS.map(eq => ({ label: t(eq.labelKey), value: eq.value }))}
                    id="trainer-workout-exercise-equipment" ariaLabel={t("TEXT_EQUIPMENT")} testId="trainer-workout-workout-exercise-modal-equipment"/>
                )}
              />
            </div>
            <div>
              <label htmlFor="trainer-workout-exercise-difficulty" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_DIFFICULTY")}</label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <TrainerInfrastructureSearchableDropdown
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={TRAINER_WORKOUT_EXERCISE_DIFFICULTY_OPTIONS.map(d => ({ label: t(d.labelKey), value: d.value }))}
                    id="trainer-workout-exercise-difficulty" ariaLabel={t("TEXT_DIFFICULTY")} testId="trainer-workout-workout-exercise-modal-difficulty"/>
                )}
              />
            </div>
          </div>
          <div>
            <label htmlFor="trainer-workout-exercise-video-url" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_VIDEO_IMAGE_URL")}</label>
            <input id="trainer-workout-exercise-video-url"
              type="url"
              placeholder={t("TEXT_E_G_HTTPS_YOUTUBE_COM")}
              {...register('videoUrl')}
              aria-invalid={Boolean(errors.videoUrl)} aria-describedby={errors.videoUrl ? "trainer-workout-exercise-video-error" : undefined}
              className={`w-full min-h-11 px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                errors.videoUrl ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
              } bg-input text-text-primary`} data-testid="trainer_workout-trainerworkoutexercisemodal-input_7"/>
            {errors.videoUrl && <p id="trainer-workout-exercise-video-error" role="alert" className="mt-1 text-xs text-danger">{t("ERR_INVALID_MEDIA_URL")}</p>}
          </div>
          <div>
            <label htmlFor="trainer-workout-exercise-instructions" className="block text-sm font-medium text-secondary mb-1">{t("TEXT_INSTRUCTIONS_SETS_REPS")}</label>
            <textarea id="trainer-workout-exercise-instructions"
              rows={2}
              placeholder={t("TEXT_E_G_3_SETS_OF_10_12_REPS_KEEP_BACK_STRAIGHT")}
              {...register('instructions')}
              aria-invalid={Boolean(errors.instructions)}
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-text-primary custom-scrollbar" data-testid="trainer_workout-trainerworkoutexercisemodal-textarea_8"/>
          </div>

          <div className="sticky bottom-0 bg-white dark:bg-[#0F172A] border-t border-border pt-3 pb-1 flex flex-col-reverse sm:flex-row justify-end gap-2.5 z-10 shrink-0">
            <button
              type="button"
              onClick={() => void guardNavigation(() => { setEditExerciseId(null); setShowExModal(false); })}
              className="min-h-11 px-4 py-2 border border-border rounded-xl font-semibold text-secondary hover:text-text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" data-testid="trainer_workout-trainerworkoutexercisemodal-button_9">
              {t("TEXT_CANCEL")}
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl font-semibold text-on-primary bg-primary hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" data-testid="trainer_workout-trainerworkoutexercisemodal-button_10">
              {isSaving ? <><Loader2 size={16} className="motion-safe:animate-spin" /><span>Saving...</span></> : <><Save size={17} strokeWidth={2}/><span>{t("TEXT_SAVE")}</span></>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



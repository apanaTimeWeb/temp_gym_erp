"use client";
// RESPONSIBILITY: Form modal for creating or editing a workout plan in the TrainerWorkoutWorkout Library module.
/**
 * @description Owns the workout-plan form modal view while delegating validation and submission state to the feature hook/schema contract.
 * @dependencies Uses workout-local form types/schema, mutation handlers, navigation guard, and Trainer infrastructure feedback.
 * @edge-cases Preserves entered values after request failure, blocks duplicate submission, supports cancel/close recovery, and exposes field-level validation.
 */
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { X, Save } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useForm, Controller } from 'react-hook-form';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructureSearchableDropdown';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureDialogFocusTrap';

import TrainerWorkoutExerciseFields from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansExerciseFields';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansFilters';

import { useTrainerWorkoutMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansMutations';

import { useTrainerWorkoutsQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansQuery';

import { TrainerWorkoutCreateWorkoutPlanSchema, TrainerWorkoutEMPTY_WORKOUT_FORM } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/schemas/TrainerCoachingWorkoutPlansDomainSchemas';

import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/state/useTrainerCoachingWorkoutPlansStore';

import { TRAINER_WORKOUT_LEVEL_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansFormConstants';

import type { TrainerWorkoutCreateWorkoutFormValues } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';

/**
 * @description Form modal for creating or editing a workout plan in the TrainerWorkoutWorkout Library module.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the workout feature form/modal surface for WorkoutModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerWorkoutModal() {
  const t = useTranslations('TRAINER_WORKOUT');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { showWkModal, setShowWkModal, editWorkoutId, setEditWorkoutId } = useTrainerWorkoutStore();
  const { search, category, page, sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data: workoutData } = useTrainerWorkoutsQuery(search, category, page, sortBy, sortDirection, showWkModal && Boolean(editWorkoutId));
  const editWorkout = workoutData?.workouts.find((workout) => workout.id === editWorkoutId) ?? null;
  const { createWorkout, createWorkoutPending, updateWorkout, updateWorkoutPending } = useTrainerWorkoutMutations();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<TrainerWorkoutCreateWorkoutFormValues>({
    resolver: zodResolver(TrainerWorkoutCreateWorkoutPlanSchema),
    defaultValues: TrainerWorkoutEMPTY_WORKOUT_FORM,
    mode: 'onTouched',});

  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();

// Effect contract: initialize workout-plan form fields from the selected plan when the modal opens.
  useEffect(() => {
    if (showWkModal && !isDirty && !createWorkoutPending && !updateWorkoutPending) {
      if (editWorkout) {
        reset({
          name: editWorkout.name,
          level: editWorkout.level,
          days: editWorkout.days,
          exercises: editWorkout.workoutExercises === undefined ? editWorkout.exercises : editWorkout.workoutExercises.length,
          focus: editWorkout.focus,
          duration: editWorkout.duration,
          tags: editWorkout.tags.join(', '),
          goal: editWorkout.goal ?? '',
          startDate: editWorkout.startDate ?? '',
          endDate: editWorkout.endDate ?? '',
          instructions: editWorkout.instructions ?? '',
          assignedMemberId: editWorkout.assignedMemberId ?? '',
          workoutExercises: editWorkout.workoutExercises
        });
      } else {
        reset(TrainerWorkoutEMPTY_WORKOUT_FORM);
      }
    }
  }, [showWkModal, editWorkout, reset, isDirty, createWorkoutPending, updateWorkoutPending]);

  const isSaving = createWorkoutPending || updateWorkoutPending;

  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(isDirty && !isSaving);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: showWkModal, dialogRef, onEscape: () => void guardNavigation(() => { setEditWorkoutId(null); setShowWkModal(false); }) });

  const handleWorkoutFormSubmit = async (data: TrainerWorkoutCreateWorkoutFormValues) => {
    const exerciseCount = editWorkout && editWorkout.workoutExercises === undefined
      ? data.exercises
      : (data.workoutExercises?.length ?? 0);
    const dto = TrainerWorkoutCreateWorkoutPlanSchema.parse({ ...data, exercises: exerciseCount });
    const actionId = editWorkout ? `update-workout-${editWorkout.id}` : 'create-workout';
    const key = actionKeys.begin(actionId);
    try {
      const response = editWorkout
        ? await updateWorkout({ id: editWorkout.id, dto, idempotencyKey: key })
        : await createWorkout({ dto, idempotencyKey: key });
      showSuccess(response.message, actionId);
      reset(dto);
      actionKeys.clear(actionId);
      setEditWorkoutId(null);
      setShowWkModal(false);
    } catch (error) {
      showError(error, actionId);
    }
  };

  if (!showWkModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay-backdrop p-4 " role="presentation">
      <div className="flex max-h-dialog-desktop w-full max-w-md flex-col overflow-hidden rounded-2xl bg-overlay shadow-dialog " ref={dialogRef} role="dialog" aria-modal={true} aria-labelledby="trainer-workout-modal-title">
        <div className="flex justify-between items-center p-5 border-b border-border ">
          <h3 id="trainer-workout-modal-title" className="font-bold text-lg text-primary ">
            {editWorkout ? t("TEXT_EDIT_WORKOUT_PLAN") : t("TEXT_ADD_WORKOUT_PLAN")}
          </h3>
          <button 
            type="button"
            onClick={() => void guardNavigation(() => { setEditWorkoutId(null); setShowWkModal(false); })} 
            className="min-h-11 text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t("TEXT_CANCEL")} data-testid="trainer_workout-trainerworkoutmodal-button_1">
            <X size={18}  strokeWidth={2}/>
          </button>
        </div>
        <form onSubmit={handleSubmit(handleWorkoutFormSubmit)} className="min-h-0 space-y-4 overflow-y-auto p-5 " data-testid="trainer_workout-trainerworkoutmodal-form_2">
          <div>
            <label htmlFor="trainer-workout-name" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_PLAN_NAME")}</label>
            <input id="trainer-workout-name" 
              type="text" 
              {...register('name')}
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "trainer-workout-name-error" : undefined}
              className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                errors.name ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
              } bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_workout-trainerworkoutmodal-input_3"/>
            {errors.name && <p id="trainer-workout-name-error" role="alert" className="text-danger text-xs mt-1 " data-testid={"trainer_workout-modal-error_state_121_1"}>{t(errors.name?.message || '')}</p>}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div>
            <label className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_LEVEL")}</label>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <TrainerInfrastructureSearchableDropdown
                  options={TRAINER_WORKOUT_LEVEL_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t("TEXT_SELECT_LEVEL")}
                  ariaLabel={t("TEXT_LEVEL")}
                 testId="trainer-workout-workout-modal-level"/>
              )}
            />
          </div>
            <div>
              <label htmlFor="trainer-workout-days" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_DAYS_PER_WEEK")}</label>
              <input id="trainer-workout-days" 
                type="number" 
                min="1" 
                max="7" 
                step="1"
                {...register('days', { valueAsNumber: true })}
                aria-invalid={Boolean(errors.days)} aria-describedby={errors.days ? "trainer-workout-days-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.days ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_workout-trainerworkoutmodal-input_5"/>
              {errors.days && <p id="trainer-workout-days-error" role="alert" className="text-danger text-xs mt-1 " data-testid={"trainer_workout-modal-error_state_151_2"}>{t(errors.days?.message || '')}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="trainer-workout-focus" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_FOCUS_AREA")}</label>
              <input id="trainer-workout-focus" 
                type="text" 
                placeholder={t("TEXT_E_G_HYPERTROPHY")} 
                {...register('focus')}
                aria-invalid={Boolean(errors.focus)} aria-describedby={errors.focus ? "trainer-workout-focus-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.focus ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_workout-trainerworkoutmodal-input_6"/>
              {errors.focus && <p id="trainer-workout-focus-error" role="alert" className="text-danger text-xs mt-1 " data-testid={"trainer_workout-modal-error_state_165_3"}>{t(errors.focus?.message || '')}</p>}
            </div>
            <div>
              <label htmlFor="trainer-workout-duration" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_DURATION")}</label>
              <input id="trainer-workout-duration" 
                type="text" 
                placeholder={t("TEXT_E_G_60_MIN")} 
                {...register('duration')}
                aria-invalid={Boolean(errors.duration)} aria-describedby={errors.duration ? "trainer-workout-duration-error" : undefined}
                className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 ${
                  errors.duration ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                } bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_workout-trainerworkoutmodal-input_7"/>
              {errors.duration && <p id="trainer-workout-duration-error" role="alert" className="text-danger text-xs mt-1 " data-testid={"trainer_workout-modal-error_state_176_4"}>{t(errors.duration?.message || '')}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="trainer-workout-goal" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_GOAL")}</label>
              <input id="trainer-workout-goal" 
                type="text" 
                placeholder={t("TEXT_E_G_WEIGHT_LOSS")} 
                {...register('goal')}
                aria-invalid={Boolean(errors.goal)}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutmodal-input_8"/>
            </div>
            <div>
              <label htmlFor="trainer-workout-assignedMemberId" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_ASSIGNED_TO_MEMBER_ID")}</label>
              <input id="trainer-workout-assignedMemberId" 
                type="text" 
                placeholder={t("TEXT_LEAVE_BLANK_FOR_GLOBAL_PLAN")} 
                {...register('assignedMemberId')}
                aria-invalid={Boolean(errors.assignedMemberId)}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutmodal-input_9"/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="trainer-workout-startDate" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_START_DATE")}</label>
              <input id="trainer-workout-startDate" 
                type="date" 
                {...register('startDate')}
                aria-invalid={Boolean(errors.startDate)}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutmodal-input_10"/>
            </div>
            <div>
              <label htmlFor="trainer-workout-endDate" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_END_DATE")}</label>
              <input id="trainer-workout-endDate" 
                type="date" 
                {...register('endDate')}
                aria-invalid={Boolean(errors.endDate)}
                className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutmodal-input_11"/>
            </div>
          </div>

          <div>
            <label htmlFor="trainer-workout-instructions" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_INSTRUCTIONS_NOTES")}</label>
            <textarea
              id="trainer-workout-instructions"
              rows={2}
              placeholder={t("TEXT_E_G_WARM_UP_PROPERLY_BEFORE_STARTING")} 
              {...register('instructions')}
              aria-invalid={Boolean(errors.instructions)}
              className="w-full px-3 py-2 border border-border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary custom-scrollbar  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutmodal-textarea_12"/>
          </div>

          <TrainerWorkoutExerciseFields control={control} register={register} />
          {errors.exercises && <p role="alert" className="text-danger text-xs" data-testid="trainer_workout-modal-exercise-count-error">{t(errors.exercises.message ?? 'ERR_POSITIVE_NUMBER')}</p>}
          <div className="pt-2 flex justify-end gap-3 ">
            <button 
              type="button" 
              onClick={() => void guardNavigation(() => { setEditWorkoutId(null); setShowWkModal(false); })} 
              className="min-h-11 px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutmodal-button_13">
              {t("TEXT_CANCEL")}</button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-4 py-2 rounded-lg font-medium text-on-primary bg-primary flex items-center gap-2 hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-70 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-workout-modal_submit">
              {isSaving ? <div className="w-4 h-4 border-2 border-focus border-t-primary rounded-full motion-safe:animate-spin" /> : <><Save size={18}  strokeWidth={2}/> {t("TEXT_SAVE")}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



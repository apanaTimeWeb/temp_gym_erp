"use client";
// RESPONSIBILITY: Renders the repeatable exercise rows inside the Trainer workout form; owns no API calls.
// DATA FLOW: React Hook Form field array → TrainerWorkoutExerciseFields → form inputs.
import { Plus, Trash2, Dumbbell } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useFieldArray } from 'react-hook-form';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureConfirm';

import { TRAINER_WORKOUT_DEFAULT_EXERCISE } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansFormConstants';

import type { TrainerWorkoutExerciseFieldsProps } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansExerciseFieldsProps';










/**
 * @description Renders the repeatable exercise rows inside the Trainer workout form; owns no API calls.
 * @dependencies React Hook Form field array → TrainerWorkoutExerciseFields → form inputs.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the workout feature UI responsibility represented by TrainerWorkoutExerciseFields, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutExerciseFields({ control, register }: TrainerWorkoutExerciseFieldsProps) {
  const t = useTranslations('TRAINER_WORKOUT');
  const { fields, append, remove } = useFieldArray({ control, name: 'workoutExercises' });
  const { confirm } = useTrainerInfrastructureConfirm();
  const handleAppend = () => append({ ...TRAINER_WORKOUT_DEFAULT_EXERCISE, sortOrder: fields.length });
  const handleRemove = async (index: number) => {
    const approved = await confirm({ title: t('TEXT_REMOVE_EXERCISE_TITLE'), message: t('TEXT_REMOVE_EXERCISE_MESSAGE'), type: 'danger', confirmText: t('TEXT_REMOVE') });
    if (approved) remove(index);
  };
  return <div className="pt-2 border-t border-border mt-4 "><div className="flex items-center justify-between mb-3 "><label className="block text-sm font-bold text-primary ">{t("TEXT_WORKOUT_EXERCISES")}</label><button type="button" onClick={handleAppend} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page text-xs font-semibold text-on-primary bg-primary-subtle px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutexercisefields-button_1"><Plus size={18}  strokeWidth={2}/>{t("TEXT_ADD_EXERCISE")}</button></div><div className="space-y-3 ">{fields.map((field, index) => <div key={field.id} className="bg-floating border border-border rounded-xl p-3 flex flex-col sm:flex-row gap-3 "><div className="flex-1 "><label htmlFor={`trainer-workout-exercise-${index}-name`} className="block text-xs uppercase font-bold text-secondary mb-1 ">{t("TEXT_EXERCISE_NAME_4622A0")}</label><input id={`trainer-workout-exercise-${index}-name`} type="text" {...register(`workoutExercises.${index}.name`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid={`trainer_workout-exercise-fields-name-${field.id}`}/></div><div className="w-20 "><label htmlFor={`trainer-workout-exercise-${index}-sets`} className="block text-xs uppercase font-bold text-secondary mb-1 ">{t("TEXT_SETS")}</label><input id={`trainer-workout-exercise-${index}-sets`} type="number" min="1" max="20" step="1" {...register(`workoutExercises.${index}.sets`, { valueAsNumber: true })} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid={`trainer_workout-exercise-fields-sets-${field.id}`}/></div><div className="w-20 "><label htmlFor={`trainer-workout-exercise-${index}-reps`} className="block text-xs uppercase font-bold text-secondary mb-1 ">{t("TEXT_REPS")}</label><input id={`trainer-workout-exercise-${index}-reps`} type="number" min="1" max="100" step="1" {...register(`workoutExercises.${index}.reps`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid={`trainer_workout-exercise-fields-reps-${field.id}`}/></div><div className="flex-1 "><label htmlFor={`trainer-workout-exercise-${index}-weight`} className="block text-xs uppercase font-bold text-secondary mb-1 ">{t("TEXT_WEIGHT")}</label><input id={`trainer-workout-exercise-${index}-weight`} type="text" {...register(`workoutExercises.${index}.weight`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid={`trainer_workout-exercise-fields-weight-${field.id}`}/></div><div className="flex-1 "><label htmlFor={`trainer-workout-exercise-${index}-rest`} className="block text-xs uppercase font-bold text-secondary mb-1 ">{t("TEXT_REST")}</label><input id={`trainer-workout-exercise-${index}-rest`} type="text" {...register(`workoutExercises.${index}.restTime`)} className="w-full px-2 py-1.5 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid={`trainer_workout-exercise-fields-rest-${field.id}`}/></div><div className="flex items-end pb-0.5 "><button type="button" aria-label={t("TEXT_REMOVE_EXERCISE")} onClick={() => void handleRemove(index)} className="min-w-11 min-h-11 p-2 text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid={`trainer_workout-exercise-fields-remove-${field.id}`}><Trash2 size={18}  strokeWidth={2}/></button></div></div>)}{fields.length === 0 && <div className="text-center py-6 border border-dashed border-border rounded-xl text-secondary text-sm "><Dumbbell size={18} className="mx-auto mb-2 opacity-50 "  strokeWidth={2}/>{t("TEXT_NO_EXERCISES_ADDED_YET")}</div>}</div></div>;
}

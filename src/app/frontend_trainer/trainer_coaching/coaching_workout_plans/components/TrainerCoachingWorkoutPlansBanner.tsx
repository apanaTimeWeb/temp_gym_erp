"use client";
// RESPONSIBILITY: Renders the top banner/hero section with module title and CTA for the TrainerWorkoutWorkout Library.
import { Dumbbell } from 'lucide-react';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructureSkeletonBlock';

import { useTranslations } from 'next-intl';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansFilters';

import { useTrainerWorkoutsQuery, useTrainerWorkoutExercisesQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansQuery';






/**
 * @description Renders the top banner/hero section with module title and CTA for the TrainerWorkoutWorkout Library.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the workout feature's contextual banner state using semantic tokens and accessible status communication.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutBanner() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { sortBy, sortDirection } = useTrainerWorkoutFilters();
  const workoutsQuery = useTrainerWorkoutsQuery('', 'All', 1, sortBy, sortDirection);
  const exercisesQuery = useTrainerWorkoutExercisesQuery('', 'All', 1, sortBy, sortDirection);
  const { data: wData, isPending: isWorkoutsPending, isError: isWorkoutsError, refetch: refetchWorkouts } = workoutsQuery;
  const { data: eData, isPending: isExercisesPending, isError: isExercisesError, refetch: refetchExercises } = exercisesQuery;

  if (isWorkoutsPending || isExercisesPending) return <div className="rounded-xl border border-border bg-card p-5" aria-busy="true" aria-label={t('TEXT_LOADING_WORKOUT_DATABASE')}><TrainerInfrastructureSkeletonBlock className="h-12 rounded-lg" /></div>;
  if (isWorkoutsError || isExercisesError || !wData || !eData) return <div role="alert" className="rounded-xl border border-danger-bg bg-danger-bg p-5 text-danger"><p>{t('TEXT_UNABLE_TO_LOAD_WORKOUT_DATABASE')}</p><button type="button" onClick={() => { void refetchWorkouts(); void refetchExercises(); }} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div>;

 return (
 <div className="rounded-xl p-5 text-on-primary bg-card border border-focus shadow-card">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-section-title font-bold">{t("TEXT_COMPLETE_WORKOUT_DATABASE")}</h2>
 <p className="text-on-primary mt-1 text-sm font-medium">
 {wData.total} {t("TEXT_WORKOUT_PROGRAMS")}{eData.total} {t("TEXT_EXERCISES")}</p>
 </div>
 <Dumbbell size={18} className="text-info motion-safe:transform motion-safe:-rotate-12"  strokeWidth={2}/>
 </div>
 </div>
 );
}

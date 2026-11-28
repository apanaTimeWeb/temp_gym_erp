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
 <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#141B2D] dark:to-[#0C1220] border border-orange-500/35 text-text-primary shadow-card">
 <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#FB923C] to-transparent" />
 <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-500/20 blur-3xl" />
 <div className="relative flex items-center justify-between gap-4">
 <div>
 <h2 className="text-section-title font-bold text-text-primary">{t("TEXT_COMPLETE_WORKOUT_DATABASE")}</h2>
 <p className="text-secondary mt-1 text-sm font-medium">
 {wData.total} {t("TEXT_WORKOUT_PROGRAMS")} · {eData.total} {t("TEXT_EXERCISES")}</p>
 </div>
 <span className="p-3 rounded-xl border border-orange-500/35 bg-orange-500/20 text-orange-500 dark:text-orange-400 shrink-0 shadow-[0_2px_12px_rgba(255,90,31,0.2)]">
 <Dumbbell size={20} className="motion-safe:transform motion-safe:-rotate-12" strokeWidth={2.2}/>
 </span>
 </div>
 </div>
 );
}

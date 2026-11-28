"use client";
// RESPONSIBILITY: Exercise-only library overview; does not fetch workout-plan aggregate data.
import { Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureSkeletonBlock';
import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters';
import { useTrainerWorkoutExercisesQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementQuery';

export default function TrainerWorkoutBanner() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data, isPending, isError, refetch } = useTrainerWorkoutExercisesQuery('', 'All', 1, sortBy, sortDirection);
  if (isPending) return <div className="min-h-24 rounded-2xl border border-border bg-card p-5" aria-busy="true" aria-label={t('TEXT_LOADING_WORKOUT_DATABASE')}><TrainerInfrastructureSkeletonBlock className="h-12 rounded-lg" /></div>;
  if (isError || !data) return <div role="alert" className="min-h-24 rounded-2xl border border-border bg-danger-bg p-5 text-danger"><p>{t('TEXT_UNABLE_TO_LOAD_WORKOUT_DATABASE')}</p><button type="button" onClick={() => void refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div>;
  return (
    <div className="relative overflow-hidden min-h-24 rounded-2xl border border-rose-500/35 bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220] p-5 sm:p-6 text-text-primary shadow-card">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F43F5E] via-[#FB923C] to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-rose-500/20 blur-3xl" />
      <div className="relative flex items-center justify-between gap-4">
        <div>
          <h1 className="text-page-title font-extrabold text-text-primary">{t('TEXT_EXERCISES')}</h1>
          <p className="mt-1 text-sm text-secondary font-medium">{data.total} {t('TEXT_EXERCISES')}</p>
        </div>
        <span className="p-3 rounded-xl border border-rose-500/35 bg-rose-500/20 text-rose-500 dark:text-rose-400 shrink-0 shadow-[0_2px_12px_rgba(244,63,94,0.2)]" aria-hidden="true">
          <Flame size={20} strokeWidth={2.2} />
        </span>
      </div>
    </div>
  );
}

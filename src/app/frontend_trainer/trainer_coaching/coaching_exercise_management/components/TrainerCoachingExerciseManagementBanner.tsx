"use client";
// RESPONSIBILITY: Exercise-only library overview; does not fetch workout-plan aggregate data.
import { Dumbbell } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureSkeletonBlock';
import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters';
import { useTrainerWorkoutExercisesQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementQuery';

export default function TrainerWorkoutBanner() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data, isPending, isError, refetch } = useTrainerWorkoutExercisesQuery('', 'All', 1, sortBy, sortDirection);
  if (isPending) return <div className="min-h-24 rounded-xl border border-border bg-card p-5" aria-busy="true" aria-label={t('TEXT_LOADING_WORKOUT_DATABASE')}><TrainerInfrastructureSkeletonBlock className="h-12 rounded-lg" /></div>;
  if (isError || !data) return <div role="alert" className="min-h-24 rounded-xl border border-border bg-danger-bg p-5 text-danger"><p>{t('TEXT_UNABLE_TO_LOAD_WORKOUT_DATABASE')}</p><button type="button" onClick={() => void refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div>;
  return <div className="min-h-24 rounded-xl border border-border bg-card p-5 text-primary shadow-card"><div className="flex items-center justify-between"><div><h1 className="text-page-title font-bold">{t('TEXT_EXERCISES')}</h1><p className="mt-1 text-sm text-secondary">{data.total} {t('TEXT_EXERCISES')}</p></div><Dumbbell size={18} className="text-info" aria-hidden="true" strokeWidth={2}/></div></div>;
}

// RESPONSIBILITY: Composes the Exercise Library page and delegates catalogue querying and persistence to feature-owned components/hooks.
'use client';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerExerciseLibraryExerciseTable from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerExerciseLibraryExerciseTable';
import ManagerExerciseLibraryExerciseModal from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerExerciseLibraryExerciseModal';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansLogic';

export default function ExerciseLibraryMain() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  const { openAddEx } = useManagerWorkoutPlansLogic();
  return (
    <section className="min-h-full space-y-5 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-page-title font-extrabold text-text-primary">{t('COPY_EXERCISE_LIBRARY')}</h1>
        <button type="button" onClick={openAddEx} data-testid="manager_exercise-library-add-exercise" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#F97316] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer w-full sm:w-auto">
          <Plus size={18} aria-hidden="true" />{t('COPY_ADD_EXERCISE')}
        </button>
      </div>
      <ManagerExerciseLibraryExerciseTable />
      <ManagerExerciseLibraryExerciseModal />
    </section>
  );
}

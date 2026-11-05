// RESPONSIBILITY: Composes the Exercise Library page and delegates catalogue querying and persistence to feature-owned components/hooks.
'use client';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerWorkoutPlansExerciseTable from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerWorkoutPlansExerciseTable';
import ManagerWorkoutPlansExerciseModal from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerWorkoutPlansExerciseModal';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansLogic';

export default function ExerciseLibraryMain() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  const { openAddEx } = useManagerWorkoutPlansLogic();
  return (
    <section className="min-h-full space-y-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-text-primary">{t('COPY_EXERCISE_LIBRARY')}</h1>
        <button type="button" onClick={openAddEx} data-testid="manager_exercise-library-add-exercise" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
          <Plus size={18} aria-hidden="true" />{t('COPY_ADD_EXERCISE')}
        </button>
      </div>
      <ManagerWorkoutPlansExerciseTable />
      <ManagerWorkoutPlansExerciseModal />
    </section>
  );
}

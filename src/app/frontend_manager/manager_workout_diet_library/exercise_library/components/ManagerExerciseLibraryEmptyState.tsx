// RESPONSIBILITY: Presents the exercise library's zero-result state without owning search or exercise actions.
'use client';
import { useTranslations } from 'next-intl';

/** @description Accessible empty state for exercise search results. */
export default function ManagerExerciseLibraryEmptyState({ search }: { search: string }) {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  return (
    <div data-testid="manager-exercise-library-empty-state" role="status" aria-live="polite" className="py-8 text-center text-text-secondary">
      {t('COPY_NO_EXERCISES_FOUND_MATCHING_QUOT_2')}{search}{t('COPY_QUOT_2')}
    </div>
  );
}

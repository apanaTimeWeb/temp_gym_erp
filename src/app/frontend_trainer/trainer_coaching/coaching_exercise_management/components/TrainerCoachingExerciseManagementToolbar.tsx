"use client";
// RESPONSIBILITY: Single-workflow coaching_exercise_management search, category filter and create action.
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrainerSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureSearchableDropdown';
import { TRAINER_WORKOUT_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementConstants';
import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters';
import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/state/useTrainerCoachingExerciseManagementStore';

export default function TrainerCoachingExerciseManagementToolbar() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { search, setSearch, category, setCategory } = useTrainerWorkoutFilters({ canonicalizeUrl: true });
  const { setEditExerciseId, setShowExModal } = useTrainerWorkoutStore();
  const [draft, setDraft] = useState(search);
  useEffect(() => setDraft(search), [search]);
  useEffect(() => {
    if (draft === search) return;
    const timeout = setTimeout(() => setSearch(draft), 350);
    return () => clearTimeout(timeout);
  }, [draft, search, setSearch]);
  const options = TRAINER_WORKOUT_CATEGORY_OPTIONS.EXERCISE;
  const handleAdd = () => { setEditExerciseId(null); setShowExModal(true); };
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3">
      <button type="button" onClick={handleAdd}
        className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        data-testid="trainer-coaching_exercise_management-add">
        {t('TEXT_ADD')} {t('TEXT_EXERCISE')}
      </button>
      <div className="relative min-w-0 flex-1 sm:max-w-xs">
        <Search size={18} aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-secondary" />
        <label htmlFor="trainer-coaching_exercise_management-search" className="sr-only">{t('TEXT_SEARCH')}</label>
        <input id="trainer-coaching_exercise_management-search" type="search" value={draft}
          onChange={(event) => setDraft(event.target.value)} placeholder={t('TEXT_SEARCH')}
          className="min-h-11 w-full rounded-lg border border-border bg-input py-2 ps-9 pe-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
      </div>
      <div className="w-full sm:w-56 shrink-0">
        <TrainerSearchableDropdown
          options={options.map((option) => ({value: option.value, label: option.labelKey.startsWith('TEXT_') ? t(option.labelKey) : option.labelKey}))}
          value={category}
          onChange={(value: string | number) => setCategory(String(value))}
          ariaLabel={t('TEXT_CATEGORY')} placeholder={t('TEXT_ALL_CATEGORIES')} className="w-full"
          testId="trainer-coaching_exercise_management-categories" />
      </div>
    </div>
  );
}

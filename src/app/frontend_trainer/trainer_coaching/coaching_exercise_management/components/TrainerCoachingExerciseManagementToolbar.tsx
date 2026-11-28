"use client";
// RESPONSIBILITY: Single-workflow coaching_exercise_management search, category filter and create action.
import { useEffect, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
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
  const hasActiveFilters = Boolean(draft.trim()) || (category !== 'ALL' && category !== '');

  const handleClearAll = () => {
    setDraft('');
    setSearch('');
    setCategory('ALL');
  };

  return (
    <div className="p-4 border-b border-border bg-surface-highlight flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-0 w-full sm:w-auto">
        {/* Search Box Geometry */}
        <div className="relative w-full sm:min-w-[240px] sm:w-72">
          <Search size={16} aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sky-500 w-4 h-4" />
          <label htmlFor="trainer-coaching_exercise_management-search" className="sr-only">{t('TEXT_SEARCH')}</label>
          <input
            id="trainer-coaching_exercise_management-search"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('TEXT_SEARCH')}
            className="w-full min-h-10 pl-9 pr-8 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {draft && (
            <button
              type="button"
              onClick={() => { setDraft(''); setSearch(''); }}
              aria-label="Clear search"
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full sm:w-56 shrink-0">
          <TrainerSearchableDropdown
            options={options.map((option) => ({ value: option.value, label: option.labelKey.startsWith('TEXT_') ? t(option.labelKey) : option.labelKey }))}
            value={category}
            onChange={(value: string | number) => setCategory(String(value))}
            ariaLabel={t('TEXT_CATEGORY')}
            placeholder={t('TEXT_ALL_CATEGORIES')}
            className="w-full"
            testId="trainer-coaching_exercise_management-categories"
          />
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-rose-500 font-semibold px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
          >
            {t('TEXT_CLEAR_ALL') || 'Clear All'}
          </button>
        )}
      </div>

      {/* Right-aligned Primary Action CTA */}
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`${t('TEXT_ADD')} ${t('TEXT_EXERCISE')}`}
        className="min-h-10 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary text-xs sm:text-sm font-bold rounded-xl hover:bg-primary-hover shadow-sm shadow-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95"
        data-testid="trainer-coaching_exercise_management-add"
      >
        <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
        {t('TEXT_ADD')} {t('TEXT_EXERCISE')}
      </button>
    </div>
  );
}

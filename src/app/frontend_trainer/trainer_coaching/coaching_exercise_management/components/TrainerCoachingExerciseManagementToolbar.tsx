"use client";
// RESPONSIBILITY: Single-workflow coaching_exercise_management search, category filter and create action.
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, RefreshCw, Search, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import TrainerSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureSearchableDropdown';
import { TRAINER_WORKOUT_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementConstants';
import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementQueryKeys';
import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters';
import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/state/useTrainerCoachingExerciseManagementStore';
import type { TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementSortTypes';

export default function TrainerCoachingExerciseManagementToolbar() {
  const t = useTranslations('TRAINER_WORKOUT');
  const queryClient = useQueryClient();
  const { search, setSearch, category, setCategory, sortBy, sortDirection, setSort } = useTrainerWorkoutFilters({ canonicalizeUrl: true });
  const { setEditExerciseId, setShowExModal } = useTrainerWorkoutStore();
  const [draft, setDraft] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);
  if (prevSearch !== search) {
    setPrevSearch(search);
    setDraft(search);
  }
  useEffect(() => {
    if (draft === search) return;
    const timeout = setTimeout(() => setSearch(draft), 350);
    return () => clearTimeout(timeout);
  }, [draft, search, setSearch]);

  const options = TRAINER_WORKOUT_CATEGORY_OPTIONS.EXERCISE;
  const sortOptions: Array<{ value: TrainerWorkoutSortField; label: string }> = [
    { value: 'name', label: 'Sort: Name' },
    { value: 'category', label: 'Sort: Muscle / Category' },
    { value: 'difficulty', label: 'Sort: Difficulty' },
  ];
  const handleAdd = () => { setEditExerciseId(null); setShowExModal(true); };
  const hasActiveFilters = Boolean(draft.trim()) || (category !== 'All' && category !== 'ALL' && category !== '');

  const handleClearAll = () => {
    setDraft('');
    setSearch('');
    setCategory('All');
  };

  return (
    <div className="p-4 border-b border-border bg-surface-highlight flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 flex-wrap flex-1 min-w-0 w-full lg:w-auto">
        {/* Search Box Geometry */}
        <div className="relative w-full sm:min-w-[220px] sm:max-w-xs flex-1">
          <Search size={16} aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sky-500 w-4 h-4" />
          <label htmlFor="trainer-coaching_exercise_management-search" className="sr-only">{t('TEXT_SEARCH')}</label>
          <input
            id="trainer-coaching_exercise_management-search"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t('TEXT_SEARCH')}
            className="w-full min-h-11 pl-9 pr-8 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          {draft && (
            <button
              type="button"
              onClick={() => { setDraft(''); setSearch(''); }}
              aria-label="Clear search"
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md cursor-pointer"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full sm:w-48 shrink-0">
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

        {/* Sort Control (syncs with table headers for mobile & desktop) */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0">
          <div className="flex-1 sm:w-48">
            <TrainerSearchableDropdown
              options={sortOptions}
              value={sortBy}
              onChange={(value: string | number) => setSort(String(value) as TrainerWorkoutSortField)}
              ariaLabel={t('TEXT_SORT_BY')}
              placeholder={t('TEXT_SORT_BY')}
              className="w-full"
              testId="trainer-coaching_exercise_management-sort"
            />
          </div>
          <button
            type="button"
            onClick={() => setSort(sortBy)}
            aria-label={sortDirection === 'asc' ? t('TEXT_ASCENDING') : t('TEXT_DESCENDING')}
            title={sortDirection === 'asc' ? 'Sorted Ascending' : 'Sorted Descending'}
            className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-xl border border-border bg-input hover:bg-surface-hover text-orange-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          </button>
        </div>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="min-h-11 inline-flex items-center gap-1 text-xs text-rose-500 font-semibold px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <X size={13} aria-hidden="true" />
            {t('TEXT_CLEAR_ALL')}
          </button>
        )}
      </div>

      {/* Right-aligned Refresh & Primary Action CTA */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
        <button
          type="button"
          onClick={() => void queryClient.invalidateQueries({ queryKey: TRAINER_WORKOUT_QUERY_KEYS.exercisesAll() })}
          aria-label={t('TEXT_REFRESH')}
          title={t('TEXT_REFRESH')}
          className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <RefreshCw size={17} strokeWidth={2} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`${t('TEXT_ADD')} ${t('TEXT_EXERCISE')}`}
          className="flex-1 sm:flex-initial min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary text-xs sm:text-sm font-bold rounded-xl hover:bg-primary-hover shadow-sm shadow-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          data-testid="trainer-coaching_exercise_management-add"
        >
          <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
          {t('TEXT_ADD')} {t('TEXT_EXERCISE')}
        </button>
      </div>
    </div>
  );
}

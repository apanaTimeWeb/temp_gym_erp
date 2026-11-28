"use client";
// RESPONSIBILITY: Single-workflow coaching_workout_plans search, category filter and create action.
import { useEffect, useState } from 'react';
import { RefreshCw, Search, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import TrainerSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructureSearchableDropdown';
import { TRAINER_WORKOUT_CATEGORY_OPTIONS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansConstants';
import { TRAINER_WORKOUT_QUERY_KEYS } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/TrainerCoachingWorkoutPlansQueryKeys';
import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansFilters';
import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/state/useTrainerCoachingWorkoutPlansStore';

export default function TrainerCoachingWorkoutPlansToolbar() {
  const t = useTranslations('TRAINER_WORKOUT');
  const queryClient = useQueryClient();
  const { search, setSearch, category, setCategory } = useTrainerWorkoutFilters({ canonicalizeUrl: true });
  const { setEditWorkoutId, setShowWkModal } = useTrainerWorkoutStore();
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
  const options = TRAINER_WORKOUT_CATEGORY_OPTIONS.WORKOUT;
  const handleAdd = () => { setEditWorkoutId(null); setShowWkModal(true); };
  const hasActiveFilters = Boolean(draft.trim()) || (category !== 'All' && category !== 'ALL' && category !== '');
  const handleClearAll = () => { setDraft(''); setSearch(''); setCategory('All'); };
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3">
      <button type="button" onClick={handleAdd}
        className="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover shadow-sm shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        data-testid="trainer-coaching_workout_plans-add">
        {t('TEXT_ADD')} {t('TEXT_PLAN')}
      </button>
      <div className="relative min-w-0 flex-1 sm:max-w-xs">
        <Search size={18} aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sky-500" />
        <label htmlFor="trainer-coaching_workout_plans-search" className="sr-only">{t('TEXT_SEARCH')}</label>
        <input id="trainer-coaching_workout_plans-search" type="search" value={draft}
          onChange={(event) => setDraft(event.target.value)} placeholder={t('TEXT_SEARCH')}
          className="min-h-11 w-full rounded-lg border border-border bg-input py-2 ps-9 pe-3 text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
      </div>
      <div className="w-full sm:w-56 shrink-0">
        <TrainerSearchableDropdown
          options={options.map((option) => ({value: option.value, label: option.labelKey.startsWith('TEXT_') ? t(option.labelKey) : option.labelKey}))}
          value={category}
          onChange={(value: string | number) => setCategory(String(value))}
          ariaLabel={t('TEXT_CATEGORY')} placeholder={t('TEXT_ALL_CATEGORIES')} className="w-full"
          testId="trainer-coaching_workout_plans-categories" />
      </div>
      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleClearAll}
          className="min-h-10 inline-flex items-center gap-1.5 text-xs text-rose-500 font-semibold px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <X size={14} aria-hidden="true" />
          {t('TEXT_CLEAR_ALL')}
        </button>
      )}
      <button
        type="button"
        onClick={() => void queryClient.invalidateQueries({ queryKey: TRAINER_WORKOUT_QUERY_KEYS.plansAll() })}
        aria-label={t('TEXT_REFRESH')}
        title={t('TEXT_REFRESH')}
        className="ms-auto min-w-11 min-h-11 inline-flex items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <RefreshCw size={17} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

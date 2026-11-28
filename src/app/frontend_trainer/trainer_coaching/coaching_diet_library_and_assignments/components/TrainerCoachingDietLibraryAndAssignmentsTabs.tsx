"use client";
// RESPONSIBILITY: Renders Diet Library search, goal filtering, and refresh controls; does not own server data.
import { ArrowDown, ArrowUp, Plus, RefreshCw, Search, X } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TRAINER_LIBRARY_GOALS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsConstants';

import type { TrainerLibraryTabsProps } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTabsProps';

import type { TrainerLibraryFilterGoal, TrainerLibrarySortField } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';

export default function TrainerLibraryTabs({
  search,
  setSearch,
  filterGoal,
  setFilterGoal,
  sortBy = 'name',
  sortDirection = 'asc',
  onSortChange,
  onRefresh,
  onCreate,
}: TrainerLibraryTabsProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const hasActiveFilters = Boolean(search.trim()) || filterGoal !== 'All';
  return (
    <div className="rounded-xl border border-border flex flex-wrap gap-3 justify-between items-center bg-card p-4 shadow-card">
      <h2 className="text-section-title font-bold text-text-primary whitespace-nowrap">{t("TEXT_DIET_PLANS")}</h2>
      <div className="flex flex-wrap gap-2.5 items-center w-full lg:w-auto">
        <div className="relative w-full sm:w-60">
          <Search size={17} className="absolute start-3 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" strokeWidth={2} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("TEXT_SEARCH_DIET_PLANS")}
            aria-label={t("TEXT_SEARCH_DIET_PLANS_793027")}
            className="min-h-11 ps-9 pe-8 py-2 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-full bg-input text-text-primary motion-safe:transition-colors"
            data-testid="trainer_library-library-tabs_search" />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5 rounded cursor-pointer"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
        <select
          value={filterGoal}
          onChange={(event) => setFilterGoal(event.target.value as TrainerLibraryFilterGoal)}
          aria-label={t("TEXT_FILTER_DIET_PLANS_BY_GOAL")}
          className="min-h-11 w-full sm:w-auto px-3 py-2 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-white dark:bg-[#0F172A] dark:[color-scheme:dark] text-text-primary motion-safe:transition-colors cursor-pointer"
          data-testid="trainer_library-library-tabs_filter">
          <option value="All" data-testid="trainer_library-library-tabs_goal_option_all">{t("TEXT_ALL_GOALS")}</option>
          {TRAINER_LIBRARY_GOALS.map((goal) => <option key={goal.value} value={goal.value} data-testid={`trainer_library-library-tabs_goal_option${goal.value}`}>{t(goal.labelKey)}</option>)}
        </select>
        {onSortChange && (
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value as TrainerLibrarySortField)}
              aria-label="Sort diet plans"
              className="min-h-11 flex-1 sm:flex-initial px-3 py-2 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-white dark:bg-[#0F172A] dark:[color-scheme:dark] text-text-primary cursor-pointer"
              data-testid="trainer_library-library-tabs_sort"
            >
              <option value="name">Sort: Name</option>
              <option value="calories">Sort: Calories</option>
              <option value="protein">Sort: Protein</option>
            </select>
            <button
              type="button"
              onClick={() => onSortChange(sortBy)}
              aria-label={sortDirection === 'asc' ? 'Sorted Ascending' : 'Sorted Descending'}
              title={sortDirection === 'asc' ? 'Sorted Ascending' : 'Sorted Descending'}
              className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-xl border border-border bg-input hover:bg-surface-hover text-orange-500 cursor-pointer"
            >
              {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            </button>
          </div>
        )}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => { setSearch(''); setFilterGoal('All' as TrainerLibraryFilterGoal); }}
            className="min-h-11 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-500 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 motion-safe:transition-colors cursor-pointer"
          >
            <X size={13} aria-hidden="true" />
            Clear All
          </button>
        )}
        <button
          type="button"
          onClick={() => void onRefresh()}
          aria-label={t("TEXT_REFRESH_DIET_PLANS")}
          title={t("TEXT_REFRESH_DIET_PLANS")}
          className="min-w-11 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 rounded-xl text-sky-600 dark:text-sky-300 font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          data-testid="trainer_library-trainerlibrarytabs-button_3">
          <RefreshCw size={18} strokeWidth={2} />
        </button>
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="min-h-11 flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-sm bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary-hover shadow-sm shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
            data-testid="trainer_library-trainerlibrarytabs-button-create"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Diet Plan</span>
          </button>
        )}
      </div>
    </div>
  );
}

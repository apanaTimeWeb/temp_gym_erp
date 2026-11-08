"use client";
// RESPONSIBILITY: Renders Diet Library search, goal filtering, and refresh controls; does not own server data.
import { Plus, RefreshCw, Search } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TRAINER_LIBRARY_GOALS } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/TrainerCoachingDietLibraryAndAssignmentsConstants';

import type { TrainerLibraryTabsProps } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTabsProps';

import type { TrainerLibraryFilterGoal } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsTypes';









/**
 * @description Renders Diet Library search, goal filtering, and refresh controls; does not own server data.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the library feature UI responsibility represented by TrainerLibraryTabs, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryTabs({ search, setSearch, filterGoal, setFilterGoal, onRefresh, onCreate }: TrainerLibraryTabsProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  return (
    <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center bg-card p-2 sm:p-0 ">
      <h2 className="px-5 py-3.5 text-section-title font-bold text-primary whitespace-nowrap ">{t("TEXT_DIET_PLANS")}</h2>
      <div className="px-4 flex flex-wrap gap-3 items-center ">
        <div className="relative ">
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary "  strokeWidth={2}/>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t("TEXT_SEARCH_DIET_PLANS")}
            aria-label={t("TEXT_SEARCH_DIET_PLANS_793027")}
            className="ps-9 pe-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-40 sm:w-64 bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_library-library-tabs_search"/>
        </div>
        <select
          value={filterGoal}
          onChange={(event) => setFilterGoal(event.target.value as TrainerLibraryFilterGoal)}
          aria-label={t("TEXT_FILTER_DIET_PLANS_BY_GOAL")}
          className="px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring bg-input text-primary  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_library-library-tabs_filter">
          <option value="All" data-testid="trainer_library-library-tabs_goal_option_all">{t("TEXT_ALL_GOALS")}</option>
          {TRAINER_LIBRARY_GOALS.map((goal) => <option key={goal.value} value={goal.value} data-testid={`trainer_library-library-tabs_goal_option${goal.value}`}>{t(goal.labelKey)}</option>)}
        </select>
        <button
          type="button"
          onClick={() => void onRefresh()}
          aria-label={t("TEXT_REFRESH_DIET_PLANS")}
          title={t("TEXT_REFRESH_DIET_PLANS")}
          className="min-w-11 min-h-11 flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
         data-testid="trainer_library-trainerlibrarytabs-button_3">
          <RefreshCw size={18}  strokeWidth={2}/>
        </button>
        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="min-h-11 flex items-center gap-2 px-4 py-2 text-sm bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
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

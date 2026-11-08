"use client";
// RESPONSIBILITY: Renders server-filtered and server-paginated Diet Plan records with read-only actions.
import { Apple, Eye, Flame } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureConstants';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureTooltip';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructurePagination';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsTrainerInfrastructureSkeletonBlock';

import { TrainerLibraryFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/utils/TrainerCoachingDietLibraryAndAssignmentsFormatNumber';

import TrainerLibraryEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/components/TrainerCoachingDietLibraryAndAssignmentsEmptyState';

import type { TrainerLibraryDietGridProps } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsDietGridProps';

/**
 * @description Renders server-filtered and server-paginated Diet Plan records with read-only actions.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the library feature UI responsibility represented by TrainerLibraryDietGrid, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryDietGrid({
  dietPlans,
  totalDietPlans,
  currentPage,
  isPending,
  isError,
  search,
  onPageChange,
  onViewDiet,
}: TrainerLibraryDietGridProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const locale = useLocale();
  const totalPages = Math.max(1, Math.ceil(totalDietPlans / TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE));

  if (isError) return <div className="rounded-xl border border-border bg-danger-bg p-5 text-danger" data-testid={"trainer_library-trainer_library-diet-grid-danger-state-33-1"}>{t("TEXT_UNABLE_TO_LOAD_DIET_PLANS_PLEASE_RETRY")}</div>;
  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {['diet-1','diet-2','diet-3','diet-4','diet-5','diet-6'].map((id) => (
          <div key={id} className="rounded-xl border border-border bg-card p-5 h-48">
            <TrainerInfrastructureSkeletonBlock className="w-10 h-10 rounded-xl mb-4" />
            <TrainerInfrastructureSkeletonBlock className="w-3/4 h-5 rounded mb-2" />
            <TrainerInfrastructureSkeletonBlock className="w-1/2 h-4 rounded mb-4" />
            <TrainerInfrastructureSkeletonBlock className="w-full h-10 rounded" />
          </div>
        ))}
      </div>
    );
  }
  if (dietPlans.length === 0) return <TrainerLibraryEmptyState search={search} />;

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dietPlans.map((plan) => (
          <button
            type="button"
            key={plan.id}
            onClick={() => onViewDiet(plan)}
            title={plan.name}
            className="min-h-11 text-start rounded-xl border border-border bg-card p-5 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-shadow flex flex-col motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid={`trainer_library-diet-grid-plan-${plan.id}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-success-bg text-success shrink-0" data-testid={`trainer_library-diet-grid_plan_state${plan.id}`}>
                <Apple size={18}  strokeWidth={2}/>
              </div>
              <div className="flex items-center gap-1.5">
                {plan.deletionRequested && (
                  <span className="px-2 py-0.5 text-2xs font-semibold rounded-full bg-warning-bg text-warning border border-warning/40">
                    Pending Deletion
                  </span>
                )}
                <span className="p-1.5 rounded text-secondary" title={t("TEXT_VIEW_DIET_PLAN")} aria-hidden="true"><Eye size={18}  strokeWidth={2}/></span>
              </div>
            </div>
            <TrainerInfrastructureTooltip content={plan.name}><h4 className="font-bold text-primary truncate mb-1">{plan.name}</h4></TrainerInfrastructureTooltip>
            <TrainerInfrastructureTooltip content={plan.goal}><p className="text-xs text-secondary mb-3 truncate">{plan.goal}</p></TrainerInfrastructureTooltip>
            <div className="mt-auto pt-3 border-t border-border space-y-1">
              {plan.calories != null ? <div className="flex items-center gap-2 text-xs text-secondary"><Flame size={18} className="text-warning" strokeWidth={2}/><span>{TrainerLibraryFormatNumber(plan.calories, locale)} {t("TEXT_KCAL_DAY")}</span></div> : null}
              {plan.protein != null ? <p className="text-xs text-secondary">{t("TEXT_PROTEIN")}{TrainerLibraryFormatNumber(plan.protein, locale)}{t("TEXT_G_CARBS")}{plan.carbs == null ? '—' : TrainerLibraryFormatNumber(plan.carbs, locale)}{t("TEXT_G_FATS")}{plan.fats == null ? '—' : TrainerLibraryFormatNumber(plan.fats, locale)}{t("TEXT_G")}</p> : null}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6">
        <TrainerInfrastructurePagination currentPage={currentPage} totalPages={totalPages} totalItems={totalDietPlans} itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE} onPageChange={onPageChange}/>
      </div>
    </div>
  );
}

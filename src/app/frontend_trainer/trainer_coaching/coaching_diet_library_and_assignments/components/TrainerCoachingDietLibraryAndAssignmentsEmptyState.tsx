"use client";
// RESPONSIBILITY: Displays an empty-state explanation for the Trainer Diet Library.
import { Apple } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerLibraryEmptyStateProps } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/types/TrainerCoachingDietLibraryAndAssignmentsEmptyStateProps';







/**
 * @description Displays an empty-state explanation for the Trainer Diet Library.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the library feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerLibraryEmptyState({ search }: TrainerLibraryEmptyStateProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  return (
    <div data-testid="trainer_library-empty-state" className="flex min-h-60 flex-col items-center justify-center text-center text-secondary">
      <Apple size={18} className="mb-3 text-secondary" aria-hidden="true"  strokeWidth={2}/>
      <p className="text-base font-semibold text-secondary">{t("TEXT_NO_DIET_PLANS_FOUND")}</p>
      <p className="mt-1 text-sm">{search ? t("TEXT_TRY_A_DIFFERENT_SEARCH_TERM") : t("TEXT_DIET_PLANS_WILL_APPEAR_HERE_WHEN_YOUR_MA_7550756B")}</p>
    </div>
  );
}

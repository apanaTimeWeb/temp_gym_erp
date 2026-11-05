"use client";
// RESPONSIBILITY: Empty state UI for the Progress Tracking module.
import { TrendingUp } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerProgressTrackingEmptyStateProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingEmptyStateProps';







/**
 * @description Empty state UI for the Progress Tracking module.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the progress tracking feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerProgressTrackingEmptyState({ onAdd }: TrainerProgressTrackingEmptyStateProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-14 h-14 rounded-full bg-surface-highlight flex items-center justify-center mb-4">
        <TrendingUp className="text-secondary"  strokeWidth={2} size={18}/>
      </div>
      <h3 className="text-base font-semibold text-primary mb-1">{t("TEXT_NO_PROGRESS_ENTRIES_YET")}</h3>
      <p className="text-sm text-secondary max-w-sm mb-6">
        {t("TEXT_START_TRACKING_BODY_MEASUREMENTS_AND_FIT_1D1C5631")}</p>
      <button type="button"
        onClick={onAdd}
        className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-opacity motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
       data-testid="trainer_progress_tracking-trainerprogresstrackingemptystate-button_1">
        {t("TEXT_ADD_FIRST_ENTRY")}</button>
    </div>
  );
}

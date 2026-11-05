"use client";
// RESPONSIBILITY: Owns the progress-comparison empty result presentation.
import { useTranslations } from 'next-intl';

/**
 * @description Renders the existing localized empty message when no comparison snapshots are available.
 * @dependencies Uses the comparison feature's existing translation contract.
 * @edge-case Does not alter selection, query, or comparison eligibility semantics.
 */
export default function TrainerProgressTrackingComparisonEmptyState() {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  return <div className="bg-card rounded-xl border border-border p-8 text-center text-sm text-secondary" data-testid="trainer_progress_tracking-progress-tracking_comparison_table_empty">{t('TEXT_NO_MEMBERS_SELECTED_FOR_COMPARISON')}</div>;
}

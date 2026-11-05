"use client";
// RESPONSIBILITY: Owns the progress-comparison pending presentation.
import { useTranslations } from 'next-intl';

/**
 * @description Announces the existing comparison loading state with a dedicated module-owned component.
 * @dependencies Uses the comparison feature's existing loading translation.
 * @edge-case Keeps the current query pending condition and message unchanged.
 */
export default function TrainerProgressTrackingComparisonLoadingState() {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  return <div role="status" aria-live="polite" className="rounded-xl border border-border bg-card p-6 text-sm text-secondary" data-testid="trainer_progress_tracking-comparison-loading">{t('TEXT_COMPARISON_LOADING')}</div>;
}

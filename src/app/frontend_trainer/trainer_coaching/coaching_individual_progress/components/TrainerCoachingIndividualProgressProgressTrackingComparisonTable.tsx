"use client";
// RESPONSIBILITY: Renders the read-only member progress comparison as a semantic desktop table and mobile card stack.
// DATA FLOW: Progress comparison query → snapshot rows → trend/metric presentation.
import { AlertCircle, Minus, TrendingDown, TrendingUp } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureTooltip';

import TrainerProgressTrackingComparisonDelta from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingComparisonDelta';

import { TrainerProgressTrackingFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingDisplayFormatters';

import type { TrainerProgressTrackingComparisonTableProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingComparisonTableProps';








/**
 * @description Owns the progress tracking feature UI responsibility represented by TREND_CONFIG, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const TREND_CONFIG = {
  improving: { labelKey: 'TEXT_IMPROVING', icon: TrendingUp, cls: 'bg-success-bg text-success border-border' },
  plateau: { labelKey: 'TEXT_PLATEAU', icon: Minus, cls: 'bg-warning-bg text-warning border-border' },
  declining: { labelKey: 'TEXT_DECLINING', icon: TrendingDown, cls: 'bg-danger-bg text-danger border-border' },
  insufficient: { labelKey: 'TEXT_INSUFFICIENT', icon: AlertCircle, cls: 'bg-input text-secondary border-border' },
} as const;

/**
 * @description Renders side-by-side progress comparison with complete measurement visibility on desktop and mobile.
 * @dependencies Progress comparison snapshots, localized labels, and the owning feature delta presentation.
 * @edge-case Empty comparison renders the documented empty state; nullable metrics use en-dash fallbacks.
 */
/**
 * @description Renders the progress tracking data table with module-owned status formatting, row actions, responsive behavior, and keyboard-accessible interactions.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves nullable-value fallbacks, keyboard access to row actions, and the documented mobile table strategy.
 */
export default function TrainerProgressTrackingComparisonTable({ snapshots }: TrainerProgressTrackingComparisonTableProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  if (snapshots.length === 0) return <div className="bg-card rounded-xl border border-border p-8 text-center text-sm text-secondary" data-testid="trainer_progress_tracking-progress-tracking_comparison_table_empty">{t('TEXT_NO_MEMBERS_SELECTED_FOR_COMPARISON')}</div>;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border"><h3 className="text-sm font-semibold text-primary">{t('TEXT_MEMBER_COMPARISON_LATEST_SNAPSHOT')}</h3><p className="text-xs text-secondary mt-0.5">{t('TEXT_CHANGE_FROM_FIRST_TO_LATEST_ENTRY')}</p></div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm"><thead><tr className="border-b border-border bg-surface-highlight" data-testid="trainer_progress_tracking-TrainerProgressTrackingComparisonTable-row-1">{['TEXT_MEMBER', 'TEXT_TREND', 'TEXT_WEIGHT_KG', 'TEXT_BMI', 'TEXT_BODY_FAT_PERCENT', 'TEXT_MUSCLE_MASS_KG', 'TEXT_DELTA_WEIGHT', 'TEXT_DELTA_MUSCLE', 'TEXT_ENTRIES'].map((key) => <th key={key} scope="col" className="px-4 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{t(key)}</th>)}</tr></thead><tbody className="divide-y divide-border">{snapshots.map((snapshot) => { const trend = TREND_CONFIG[snapshot.trend]; const TrendIcon = trend.icon; return <tr key={snapshot.memberId} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base" data-testid="trainer_progress_tracking-TrainerProgressTrackingComparisonTable-row-2"><td className="px-4 py-3 font-medium text-primary whitespace-nowrap"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold shrink-0" aria-hidden="true">{snapshot.memberName.charAt(0)}</div>{snapshot.memberName}</div></td><td className="px-4 py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${trend.cls}`}><TrendIcon size={18} strokeWidth={2} aria-hidden="true" />{t(trend.labelKey)}</span></td><td className="px-4 py-3 text-primary">{snapshot.latestWeightKg == null ? '—' : TrainerProgressTrackingFormatNumber(snapshot.latestWeightKg, locale)}</td><td className="px-4 py-3 text-primary">{snapshot.latestBmi == null ? '—' : TrainerProgressTrackingFormatNumber(snapshot.latestBmi, locale)}</td><td className="px-4 py-3 text-primary">{snapshot.latestBodyFatPercent == null ? '—' : `${TrainerProgressTrackingFormatNumber(snapshot.latestBodyFatPercent, locale)}%`}</td><td className="px-4 py-3 text-primary">{snapshot.latestMuscleMassKg == null ? '—' : TrainerProgressTrackingFormatNumber(snapshot.latestMuscleMassKg, locale)}</td><td className="px-4 py-3"><TrainerProgressTrackingComparisonDelta value={snapshot.weightChangeKg} lowerIsBetter={true} /></td><td className="px-4 py-3"><TrainerProgressTrackingComparisonDelta value={snapshot.muscleMassChange} lowerIsBetter={false} /></td><td className="px-4 py-3 text-secondary">{TrainerProgressTrackingFormatNumber(snapshot.totalEntries, locale)}</td></tr>; })}</tbody></table>
      </div>
      <div className="md:hidden space-y-3 p-3">
        {snapshots.map((snapshot) => { const trend = TREND_CONFIG[snapshot.trend]; const TrendIcon = trend.icon; return <article key={snapshot.memberId} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer-progress-tracking-comparison-table-card-${snapshot.memberId}`}>
          <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2 min-w-0"><div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold shrink-0" aria-hidden="true">{snapshot.memberName.charAt(0)}</div><TrainerInfrastructureTooltip content={snapshot.memberName}><h4 className="font-semibold text-primary truncate">{snapshot.memberName}</h4></TrainerInfrastructureTooltip></div><span className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${trend.cls}`}><TrendIcon size={18} strokeWidth={2} aria-hidden="true" />{t(trend.labelKey)}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_WEIGHT_KG')}</span><span className="text-primary">{snapshot.latestWeightKg == null ? '—' : TrainerProgressTrackingFormatNumber(snapshot.latestWeightKg, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BMI')}</span><span className="text-primary">{snapshot.latestBmi == null ? '—' : TrainerProgressTrackingFormatNumber(snapshot.latestBmi, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BODY_FAT_PERCENT')}</span><span className="text-primary">{snapshot.latestBodyFatPercent == null ? '—' : `${TrainerProgressTrackingFormatNumber(snapshot.latestBodyFatPercent, locale)}%`}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MUSCLE_MASS_KG')}</span><span className="text-primary">{snapshot.latestMuscleMassKg == null ? '—' : TrainerProgressTrackingFormatNumber(snapshot.latestMuscleMassKg, locale)}</span></p><div><span className="block text-xs font-semibold text-secondary uppercase mb-1">{t('TEXT_DELTA_WEIGHT')}</span><TrainerProgressTrackingComparisonDelta value={snapshot.weightChangeKg} lowerIsBetter={true} /></div><div><span className="block text-xs font-semibold text-secondary uppercase mb-1">{t('TEXT_DELTA_MUSCLE')}</span><TrainerProgressTrackingComparisonDelta value={snapshot.muscleMassChange} lowerIsBetter={false} /></div><p className="col-span-2"><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_ENTRIES')}</span><span className="text-primary">{TrainerProgressTrackingFormatNumber(snapshot.totalEntries, locale)}</span></p></div>
        </article>; })}
      </div>
    </div>
  );
}

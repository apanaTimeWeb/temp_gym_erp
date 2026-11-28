"use client";
import { displayValue } from '@/lib/display_value';
// RESPONSIBILITY: Renders the read-only member progress comparison as a semantic desktop table and mobile card stack.
// DATA FLOW: Progress comparison query → snapshot rows → trend/metric presentation.
import { useMemo, useState } from 'react';
import { AlertCircle, ArrowDown, ArrowUp, ArrowUpDown, Download, Eye, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import TrainerCoachingProgressComparisonQuickViewModal from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/components/TrainerCoachingProgressComparisonQuickViewModal';
import type { TrainerProgressTrackingComparisonMemberSnapshot } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingTypes';

import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import TrainerProgressTrackingComparisonEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/components/TrainerCoachingProgressComparisonProgressTrackingComparisonEmptyState';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/components/TrainerCoachingProgressComparisonTrainerInfrastructureTooltip';

import TrainerProgressTrackingComparisonDelta from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/components/TrainerCoachingProgressComparisonProgressTrackingComparisonDelta';

import { TrainerProgressTrackingFormatNumber } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/utils/TrainerCoachingProgressComparisonProgressTrackingDisplayFormatters';

import type { TrainerProgressTrackingComparisonTableProps } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/types/TrainerCoachingProgressComparisonProgressTrackingComparisonTableProps';








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
  const [quickViewSnapshot, setQuickViewSnapshot] = useState<TrainerProgressTrackingComparisonMemberSnapshot | null>(null);
  const [sortField, setSortField] = useState<'memberName' | 'latestWeightKg' | 'weightChangeKg' | 'muscleMassChange'>('memberName');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sortedSnapshots = useMemo(() => {
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...snapshots].sort((a, b) => {
      if (sortField === 'memberName') return a.memberName.localeCompare(b.memberName) * dir;
      const va = a[sortField] ?? Number.NEGATIVE_INFINITY;
      const vb = b[sortField] ?? Number.NEGATIVE_INFINITY;
      return (va - vb) * dir;
    });
  }, [snapshots, sortField, sortDir]);

  if (snapshots.length === 0) return <TrainerProgressTrackingComparisonEmptyState />;

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const handleExportCsv = () => {
    const header = ['Member ID', 'Member Name', 'Trend', 'Latest Weight (kg)', 'Weight Delta (kg)', 'Muscle Delta (kg)', 'Latest BMI', 'Body Fat (%)', 'Entries'];
    const csvRows = [
      header.join(','),
      ...sortedSnapshots.map((s) =>
        [
          s.memberId,
          `"${String(s.memberName ?? '').replace(/"/g, '""')}"`,
          s.trend,
          s.latestWeightKg ?? '',
          s.weightChangeKg ?? '',
          s.muscleMassChange ?? '',
          s.latestBmi ?? '',
          s.latestBodyFatPercent ?? '',
          s.totalEntries,
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'member_progress_comparison.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const sortColumns: Array<{ key: string; field: typeof sortField | null }> = [
    { key: 'TEXT_MEMBER', field: 'memberName' },
    { key: 'TEXT_TREND', field: null },
    { key: 'TEXT_WEIGHT_KG', field: 'latestWeightKg' },
    { key: 'TEXT_DELTA_WEIGHT', field: 'weightChangeKg' },
    { key: 'TEXT_DELTA_MUSCLE', field: 'muscleMassChange' },
    { key: 'TEXT_ACTIONS', field: null },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border bg-header flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{t('TEXT_MEMBER_COMPARISON_LATEST_SNAPSHOT')}</h3>
          <p className="text-xs text-secondary mt-0.5">{t('TEXT_CHANGE_FROM_FIRST_TO_LATEST_ENTRY')}</p>
        </div>
        <button
          type="button"
          onClick={handleExportCsv}
          data-testid="trainer_comparison-export-csv"
          className="min-h-9 inline-flex items-center gap-1.5 rounded-xl border border-teal-500/35 bg-teal-500/15 px-3 py-1.5 text-xs font-semibold text-teal-600 dark:text-teal-300 hover:bg-teal-500/25 cursor-pointer"
        >
          <Download size={14} aria-hidden="true" />
          <span>Export CSV</span>
        </button>
      </div>
      <div className="hidden md:block">
        <div className="max-h-[640px] overflow-y-auto overflow-x-hidden">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
              <tr data-testid="trainer_progress_tracking-TrainerProgressTrackingComparisonTable-row-1">
                {sortColumns.map(({ key, field }) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-3 text-start text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap"
                  >
                    {field ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(field)}
                        className="inline-flex items-center gap-1 hover:text-text-primary cursor-pointer"
                      >
                        <span>{t(key)}</span>
                        {sortField === field ? (
                          sortDir === 'asc' ? <ArrowUp size={13} className="text-orange-500" /> : <ArrowDown size={13} className="text-orange-500" />
                        ) : (
                          <ArrowUpDown size={13} className="opacity-50" />
                        )}
                      </button>
                    ) : (
                      t(key)
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedSnapshots.map((snapshot) => {
                const trend = TREND_CONFIG[snapshot.trend];
                const TrendIcon = trend.icon;
                return (
                  <tr
                    key={snapshot.memberId}
                    className="hover:bg-surface-hover transition-colors group"
                    data-testid="trainer_progress_tracking-TrainerProgressTrackingComparisonTable-row-2"
                  >
                    <td className="px-3 py-3 font-medium text-text-primary">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold shrink-0" aria-hidden="true">
                          {snapshot.memberName.charAt(0)}
                        </div>
                        <span className="font-bold text-text-primary text-sm truncate">{snapshot.memberName}</span>
                        <CopyButton value={snapshot.memberName} />
                      </div>
                      <p className="text-xs text-secondary font-mono flex items-center gap-1.5 mt-0.5 ms-9">#{snapshot.memberId.slice(-6)}</p>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${trend.cls}`}>
                        <TrendIcon size={16} strokeWidth={2} aria-hidden="true" />{t(trend.labelKey)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-text-primary whitespace-nowrap">{snapshot.latestWeightKg == null ? displayValue(snapshot.latestWeightKg) : `${TrainerProgressTrackingFormatNumber(snapshot.latestWeightKg, locale)} kg`}</td>
                    <td className="px-3 py-3 whitespace-nowrap"><TrainerProgressTrackingComparisonDelta value={snapshot.weightChangeKg} lowerIsBetter={true} /></td>
                    <td className="px-3 py-3 whitespace-nowrap"><TrainerProgressTrackingComparisonDelta value={snapshot.muscleMassChange} lowerIsBetter={false} /></td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setQuickViewSnapshot(snapshot)}
                        className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                        aria-label={`View full comparison details for ${snapshot.memberName}`}
                        title="View full comparison metrics"
                        data-testid={`trainer_comparison-view-${snapshot.memberId}`}
                      >
                        <Eye size={16} strokeWidth={2.2} aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="md:hidden space-y-3 p-3">
        {sortedSnapshots.map((snapshot) => { const trend = TREND_CONFIG[snapshot.trend]; const TrendIcon = trend.icon; return <article key={snapshot.memberId} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer-progress-tracking-comparison-table-card-${snapshot.memberId}`}>
          <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-2 min-w-0"><div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold shrink-0" aria-hidden="true">{snapshot.memberName.charAt(0)}</div><TrainerInfrastructureTooltip content={snapshot.memberName}><h4 className="font-semibold text-primary truncate">{snapshot.memberName}</h4></TrainerInfrastructureTooltip></div><span className={`shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${trend.cls}`}><TrendIcon size={18} strokeWidth={2} aria-hidden="true" />{t(trend.labelKey)}</span></div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_WEIGHT_KG')}</span><span className="text-text-primary">{snapshot.latestWeightKg == null ? displayValue(snapshot.latestWeightKg) : TrainerProgressTrackingFormatNumber(snapshot.latestWeightKg, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BMI')}</span><span className="text-text-primary">{snapshot.latestBmi == null ? displayValue(snapshot.latestBmi) : TrainerProgressTrackingFormatNumber(snapshot.latestBmi, locale)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_BODY_FAT_PERCENT')}</span><span className="text-text-primary">{snapshot.latestBodyFatPercent == null ? '—' : `${TrainerProgressTrackingFormatNumber(snapshot.latestBodyFatPercent, locale)}%`}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MUSCLE_MASS_KG')}</span><span className="text-text-primary">{snapshot.latestMuscleMassKg == null ? displayValue(snapshot.latestMuscleMassKg) : TrainerProgressTrackingFormatNumber(snapshot.latestMuscleMassKg, locale)}</span></p><div><span className="block text-xs font-semibold text-secondary uppercase mb-1">{t('TEXT_DELTA_WEIGHT')}</span><TrainerProgressTrackingComparisonDelta value={snapshot.weightChangeKg} lowerIsBetter={true} /></div><div><span className="block text-xs font-semibold text-secondary uppercase mb-1">{t('TEXT_DELTA_MUSCLE')}</span><TrainerProgressTrackingComparisonDelta value={snapshot.muscleMassChange} lowerIsBetter={false} /></div><p className="col-span-2"><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_ENTRIES')}</span><span className="text-text-primary">{TrainerProgressTrackingFormatNumber(snapshot.totalEntries, locale)}</span></p></div>
          <div className="mt-4 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setQuickViewSnapshot(snapshot)}
              className="w-full min-h-10 inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 text-xs font-semibold hover:bg-sky-500 hover:text-white motion-safe:transition-colors cursor-pointer"
            >
              <Eye size={15} /> View Full Comparison
            </button>
          </div>
        </article>; })}
      </div>
      <div className="border-t border-border px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-card text-xs text-secondary">
        <p>
          Showing <span className="font-semibold text-text-primary">{snapshots.length}</span> member comparison records
        </p>
      </div>
      <TrainerCoachingProgressComparisonQuickViewModal
        snapshot={quickViewSnapshot}
        onClose={() => setQuickViewSnapshot(null)}
      />
    </div>
  );
}

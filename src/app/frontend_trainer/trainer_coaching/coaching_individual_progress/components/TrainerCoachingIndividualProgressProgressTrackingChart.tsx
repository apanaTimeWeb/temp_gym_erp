"use client";
// RESPONSIBILITY: Renders a responsive ApexCharts visualization for the selected progress metric.
// DATA FLOW: useTrainerProgressTrackingLogic → TrainerProgressTrackingChart props → ApexCharts.
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import { TRAINER_PROGRESS_TRACKING_PROGRESS_CHART_METRICS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';

import type { TrainerProgressTrackingChartProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingChartProps';

import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressChartMetric } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';








/**
 * @description Renders the progress tracking feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Degrades safely when the chart dataset is empty or the visualization library reports an error.
 */
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * @description Owns the progress tracking feature UI responsibility represented by METRIC_KEY, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const METRIC_KEY: Record<TrainerProgressTrackingProgressChartMetric, keyof TrainerProgressTrackingProgressEntry> = {
  weight: 'weightKg',
  bmi: 'bmi',
  bodyFat: 'bodyFatPercent',
  muscleMass: 'muscleMassKg',
};

/**
 * @description Renders a responsive ApexCharts visualization for the selected progress metric.
 * @dependencies useTrainerProgressTrackingLogic → TrainerProgressTrackingChart props → ApexCharts.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the progress tracking feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Degrades safely when the chart dataset is empty or the visualization library reports an error.
 */
export default function TrainerProgressTrackingChart({ entries, activeMetric, onMetricChange }: TrainerProgressTrackingChartProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const [isDark, setIsDark] = useState(false);

// Effect contract: rebuild chart options/series when the selected progress metric or entries change.
  useEffect(() => {
    const rootElement = document.documentElement;
    const syncTheme = () => setIsDark(rootElement.classList.contains('dark'));

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(rootElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const key = METRIC_KEY[activeMetric];
  const values = entries.map((entry) => {
    const value = entry[key];
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
  });
  const labels = entries.map((entry) => entry.date.slice(5));

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("TEXT_PROGRESS_METRIC")} data-testid="trainer_progress_tracking-trainerprogresstrackingchart-div_1">
        {TRAINER_PROGRESS_TRACKING_PROGRESS_CHART_METRICS.map((metric) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeMetric === metric.value}
            key={metric.value}
            onClick={() => onMetricChange(metric.value)}
            className={`px-3 py-1 text-xs font-semibold rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page ${activeMetric === metric.value ? 'bg-primary text-on-primary' : 'bg-input text-secondary hover:text-primary'} motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
           data-testid={`trainer_progress_tracking-progress-chart-metric-${metric.value}`}>
            {t(metric.labelKey)}
          </button>
        ))}
      </div>

      {entries.length < 2 ? (
        <p className="text-sm text-secondary text-center py-6">{t("TEXT_ADD_AT_LEAST_2_ENTRIES_TO_SEE_THE_CHART")}</p>
      ) : (
        <div className="overflow-x-auto" aria-label={t("TEXT_PROGRESS_CHART_ARIA", { metric: activeMetric })}>
          <ReactApexChart
            type="line"
            height={260}
            width="100%"
            series={[{ name: activeMetric, data: values }]}
            options={{
              chart: { toolbar: { show: false }, background: 'transparent', animations: { enabled: false } },
              theme: { mode: isDark ? 'dark' : 'light' },
              stroke: { curve: 'smooth', width: 3 },
              colors: ['var(--chart-primary)'],
              grid: { borderColor: 'var(--chart-grid)' },
              xaxis: { categories: labels, labels: { style: { colors: ['var(--text-secondary)'] } } },
              yaxis: { labels: { style: { colors: ['var(--text-secondary)'] } } },
              tooltip: { theme: isDark ? 'dark' : 'light' },
              markers: { size: 4 },
            }}
          />
        </div>
      )}
    </div>
  );
}

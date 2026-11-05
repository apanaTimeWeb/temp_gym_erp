"use client";
// RESPONSIBILITY: ApexCharts grouped bar chart for multi-member progress comparison.
// DATA FLOW: useTrainerProgressTrackingLogic → TrainerProgressTrackingComparisonChart
// Uses dynamic import (no SSR) per web_global_design.md Rule — ApexCharts only.

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

import { TRAINER_PROGRESS_TRACKING_COMPARISON_METRICS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';

import type { TrainerProgressTrackingComparisonChartProps } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingComparisonChartProps';


/**
 * @description Renders the progress tracking feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Degrades safely when the chart dataset is empty or the visualization library reports an error.
 */
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * @description Owns the progress tracking feature UI responsibility represented by THEME_MEMBER_TOKENS, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const THEME_MEMBER_TOKENS = ['--chart-primary', '--chart-success', '--chart-info', '--chart-danger'] as const;



/**
 * @description ApexCharts grouped bar chart for multi-member progress comparison.
 * @dependencies useTrainerProgressTrackingLogic → TrainerProgressTrackingComparisonChart
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the progress tracking feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Degrades safely when the chart dataset is empty or the visualization library reports an error.
 */
export default function TrainerProgressTrackingComparisonChart({ snapshots, activeMetric, onMetricChange }: TrainerProgressTrackingComparisonChartProps) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const metricConfig = TRAINER_PROGRESS_TRACKING_COMPARISON_METRICS.find(m => m.value === activeMetric)!;
  const [chartColors, setChartColors] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);

  // Theme tokens are read again when the host toggles its theme class.
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      const styles = getComputedStyle(root);
      setChartColors(THEME_MEMBER_TOKENS.map((token) => styles.getPropertyValue(token).trim()).filter(Boolean));
      setIsDark(root.classList.contains('dark'));
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const series = snapshots.map((s, i) => ({
    name: s.memberName,
    data: [typeof s[activeMetric] === 'number' && Number.isFinite(s[activeMetric]) ? s[activeMetric] : null],
    color: chartColors.length ? chartColors[i % chartColors.length] : undefined,
  }));

  const options: ApexOptions = {
    chart: {
      type: 'bar' as const,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}${metricConfig.unit}`,
      style: { colors: chartColors.length ? [chartColors[0] as string] : undefined },
      offsetY: -20,
    },
    xaxis: {
      categories: [t(metricConfig.labelKey)],
      labels: { style: { colors: chartColors.length ? [chartColors[0] as string] : undefined, fontSize: "var(--font-size-table-header)" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: chartColors.length ? [chartColors[0] as string] : undefined, fontSize: "var(--font-size-badge)" },
        formatter: (val: number) => `${val}${metricConfig.unit}`,
      },
    },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: { colors: chartColors.length ? chartColors[0] : undefined },
      markers: { size: 8 },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: { formatter: (val: number) => `${val}${metricConfig.unit}` },
    },
    colors: chartColors.length ? chartColors : undefined,
  };

  if (snapshots.length < 2) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center text-sm text-secondary">
        {t("TEXT_SELECT_AT_LEAST_2_MEMBERS_TO_COMPARE")}</div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex flex-wrap gap-2">
        {TRAINER_PROGRESS_TRACKING_COMPARISON_METRICS.map(m => (
          <button type="button"
            key={m.value}
            onClick={() => onMetricChange(m.value)}
            className={`px-3 py-1 text-xs font-semibold rounded-full motion-safe:transition-colors ${
              activeMetric === m.value
                ? 'bg-primary text-on-primary'
                : 'bg-input text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`}
           data-testid={`trainer_progress_tracking-progress-comparison-metric-${m.value}`}>
            {t(m.labelKey)}
          </button>
        ))}
      </div>

      <ApexChart
        type="bar"
        series={series}
        options={options}
        height={280}
      />
    </div>
  );
}

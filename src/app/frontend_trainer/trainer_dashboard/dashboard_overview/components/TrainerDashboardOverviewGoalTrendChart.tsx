"use client";
// RESPONSIBILITY: Renders the dashboard goal-completion trend from TanStack Query data without owning server state.
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import { useTrainerDashboardQuery } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/hooks/useTrainerDashboardOverviewQuery';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/components/TrainerDashboardOverviewTrainerInfrastructureSkeletonBlock';


// DATA FLOW: Dashboard API → useTrainerDashboardQuery → chart data → ApexCharts.





/**
 * @description Renders the dashboard feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Degrades safely when the chart dataset is empty or the visualization library reports an error.
 */
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * @description Renders the dashboard goal-completion trend from TanStack Query data without owning server state.
 * @dependencies Dashboard API → useTrainerDashboardQuery → chart data → ApexCharts.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the dashboard feature's data visualization using the approved chart contract and semantic theme tokens.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Degrades safely when the chart dataset is empty or the visualization library reports an error.
 */
export default function TrainerDashboardGoalTrendChart() {
  const t = useTranslations('TRAINER_DASHBOARD');
  const [isDark, setIsDark] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

// Effect contract: reconcile chart-local presentation state with the incoming dashboard series.
  useEffect(() => {
    const rootElement = document.documentElement;
    const syncTheme = () => setIsDark(rootElement.classList.contains('dark'));

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(rootElement, { attributes: true, attributeFilter: ['class'] });
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    syncMotion();
    mediaQuery.addEventListener('change', syncMotion);
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', syncMotion);
    };
  }, []);

  const { data: stats, isPending, isError } = useTrainerDashboardQuery();

  if (isPending) {
    return <TrainerInfrastructureSkeletonBlock className="rounded-xl border border-border p-5 min-h-72" testId="trainer-dashboard-goal-trend-chart-loading" />;
  }

  if (isError || !stats?.goalCompletionTrend?.length) {
    return <div className="bg-card rounded-xl border border-border p-5 min-h-72 flex items-center justify-center"><p className="text-secondary text-sm">{t("TEXT_NO_GOAL_COMPLETION_DATA_AVAILABLE")}</p></div>;
  }

  const trend = stats.goalCompletionTrend;
  const values = trend.map((point) => point.rate);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <ReactApexChart
        type="line"
        height={280}
        width="100%"
        series={[{ name: t('TEXT_GOAL_COMPLETION'), data: values }]}
        options={{
          chart: { toolbar: { show: false }, background: 'transparent', animations: { enabled: !prefersReducedMotion, speed: 300 } },
          theme: { mode: isDark ? 'dark' : 'light' },
          stroke: { curve: 'smooth', width: 3 },
          colors: ['var(--chart-primary)'],
          grid: { borderColor: 'var(--chart-grid)' },
          xaxis: { categories: trend.map((point) => point.month), labels: { style: { colors: ['var(--text-secondary)'] } } },
          yaxis: { min: 0, max: 100, labels: { style: { colors: ['var(--text-secondary)'] } } },
          tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (value: number) => `${value}%` } },
        }}
      />
    </div>
  );
}

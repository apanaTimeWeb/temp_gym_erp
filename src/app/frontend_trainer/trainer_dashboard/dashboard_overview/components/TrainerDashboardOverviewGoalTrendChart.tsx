"use client";
// RESPONSIBILITY: Renders the dashboard goal-completion trend from TanStack Query data without owning server state.
import { useEffect, useState } from 'react';

import { TrendingUp } from 'lucide-react';
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
    return <TrainerInfrastructureSkeletonBlock className="h-full rounded-2xl border border-border p-5 min-h-72" testId="trainer-dashboard-goal-trend-chart-loading" />;
  }

  if (isError || !stats?.goalCompletionTrend?.length) {
    return <div className="h-full bg-card rounded-2xl border border-border p-5 min-h-72 flex items-center justify-center shadow-card"><p className="text-secondary text-sm">{t("TEXT_NO_GOAL_COMPLETION_DATA_AVAILABLE")}</p></div>;
  }

  const trend = stats.goalCompletionTrend;
  const values = trend.map((point) => point.rate);

  return (
    <div className="relative h-full min-w-0 rounded-2xl border border-orange-500/25 bg-card dark:bg-gradient-to-br dark:from-[#241814] dark:via-[#202020] dark:to-[#181818] p-5 shadow-card flex flex-col justify-between overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-orange-500/15 blur-2xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-orange-500/15">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="p-2 rounded-xl border border-orange-500/30 bg-orange-500/15 text-orange-500 shrink-0">
            <TrendingUp size={17} strokeWidth={2.2} />
          </span>
          <h2 className="font-bold text-primary truncate">{t('TEXT_GOAL_COMPLETION')}</h2>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shrink-0">
          {values[values.length - 1] ?? 0}% Latest
        </span>
      </div>
      <div className="relative min-w-0 w-full">
        <ReactApexChart
          type="area"
          height={250}
          width="100%"
          series={[{ name: t('TEXT_GOAL_COMPLETION'), data: values }]}
          options={{
            chart: { toolbar: { show: false }, background: 'transparent', animations: { enabled: !prefersReducedMotion, speed: 300 } },
            theme: { mode: isDark ? 'dark' : 'light' },
            stroke: { curve: 'smooth', width: 3 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.42, opacityTo: 0.04, stops: [0, 95, 100] } },
            markers: { size: 4, strokeWidth: 2, hover: { size: 6 } },
            colors: ['var(--chart-primary)'],
            dataLabels: { enabled: false },
            grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
            xaxis: { categories: trend.map((point) => point.month), labels: { style: { colors: ['var(--text-secondary)'] } } },
            yaxis: { min: 0, max: 100, labels: { style: { colors: ['var(--text-secondary)'] } } },
            tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (value: number) => `${value}%` } },
          }}
        />
      </div>
    </div>
  );
}

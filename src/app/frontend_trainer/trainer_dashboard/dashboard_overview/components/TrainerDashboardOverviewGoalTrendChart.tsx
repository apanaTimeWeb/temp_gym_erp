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
    <div className="relative h-full min-w-0 rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#141B2D] dark:to-[#0C1220] p-5 shadow-card flex flex-col justify-between overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="relative flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-orange-500/20">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="p-2 rounded-xl border border-orange-500/40 bg-orange-500/20 text-orange-500 dark:text-orange-400 shrink-0 shadow-[0_2px_10px_rgba(255,90,31,0.2)]">
            <TrendingUp size={17} strokeWidth={2.2} />
          </span>
          <h2 className="font-bold text-text-primary truncate">{t('TEXT_GOAL_COMPLETION')}</h2>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/35 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 shrink-0">
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
            chart: { toolbar: { show: false }, background: 'transparent', animations: { enabled: !prefersReducedMotion, speed: 300 }, dropShadow: { enabled: true, top: 4, blur: 6, opacity: 0.35, color: '#FF5A1F' } },
            theme: { mode: isDark ? 'dark' : 'light' },
            stroke: { curve: 'smooth', width: 3.5 },
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05, stops: [0, 95, 100] } },
            markers: { size: 5, strokeWidth: 2, colors: ['#FF5A1F'], strokeColors: '#FFFFFF', hover: { size: 7 } },
            colors: ['#FF5A1F'],
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

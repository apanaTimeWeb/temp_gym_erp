// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsInfrastructureUptimeChart within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the validated historical infrastructure uptime series. No API calls are performed in the component.
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { useSuperadminSystemOpsInfrastructureTheme } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureTheme';
import { useSuperadminSystemOpsInfrastructureUptime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureUptime';
import { formatDecimal } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/utils/SuperadminSystemOpsInfrastructureFormatters';

import type { ApexOptions } from 'apexcharts';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * @description Renders the 24-hour infrastructure uptime series from the feature API contract.
 * @dependencies TanStack Query hook for server state, next-intl for visible UI text, and ApexCharts for the approved chart surface.
 * @edge-case Loading, empty, error, retry, and reduced-width states remain visible and recoverable without fabricating chart data.
 */
export default function SuperadminSystemOpsInfrastructureUptimeChart() {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  const locale = useLocale();
  const { theme } = useSuperadminSystemOpsInfrastructureTheme();
  const dateFormatter = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  const query = useSuperadminSystemOpsInfrastructureUptime();
  const points = query.data?.data ?? [];

  if (query.isPending) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 shadow-card" aria-labelledby="superadmin-uptime-title" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-loading">
        <div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" />
        <div className="mt-4 h-56 w-full rounded-lg bg-skeleton-base motion-safe:animate-pulse" />
      </section>
    );
  }

  if (query.isError) {
    return (
      <section className="rounded-xl border border-border bg-danger-bg p-6 shadow-card" role="alert" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-error">
        <h2 id="superadmin-uptime-title" className="text-base font-semibold text-danger">{t('ui.unable_to_load_historical_uptime_32e3665')}</h2>
        <button
          type="button"
          onClick={() => void query.refetch()}
          className="mt-4 min-h-11 min-w-28 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-retry"
        >
          {t('ui.retry')}
        </button>
      </section>
    );
  }

  if (points.length === 0) {
    return (
      <section className="rounded-xl border border-border bg-card p-6 shadow-card" aria-labelledby="superadmin-uptime-title" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-empty">
        <h2 id="superadmin-uptime-title" className="text-base font-semibold text-primary">{t('ui.historical_uptime_24h_1f009d6')}</h2>
        <p className="mt-2 text-sm text-secondary">{t('ui.no_uptime_history_available_054ab5f')}</p>
      </section>
    );
  }

  const series = [
    {
      name: t('ui.series_uptime_percent'),
      data: points.map((point) => ({ x: point.timestamp, y: point.uptimePercent })),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent',
      animations: { enabled: false },
    },
    colors: ['var(--chart-success)'],
    dataLabels: { enabled: false },
    stroke: { width: 2, curve: 'smooth' },
    grid: { borderColor: 'var(--chart-grid)' },
    xaxis: {
      type: 'datetime',
      labels: {
        style: { colors: 'var(--text-secondary)' },
        formatter: (value, timestamp) => typeof timestamp === 'number' ? dateFormatter.format(new Date(timestamp)) : String(value),
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: { colors: 'var(--text-secondary)' },
        formatter: (value) => formatDecimal(value, 2),
      },
    },
    tooltip: { theme, x: { formatter: (_value, details) => { const timestamp = details?.w?.globals?.seriesX?.[details.seriesIndex ?? 0]?.[details.dataPointIndex ?? 0]; return typeof timestamp === 'number' ? dateFormatter.format(new Date(timestamp)) : String(_value); } }, y: { formatter: (value) => `${formatDecimal(value, 2)}%` } },
  };

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-card" aria-labelledby="superadmin-uptime-title" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-uptime-chart-superadmin_system_ops_infrastructure-uptime-chart">
      <div className="mb-4">
        <h2 id="superadmin-uptime-title" className="text-lg font-semibold text-primary">{t('ui.historical_uptime_24h_1f009d6')}</h2>
      </div>
      <div className="h-56 w-full md:h-72" role="img" aria-label={t('ui.historical_uptime_24h_1f009d6')} data-testid="superadmin_system_ops_infrastructure-uptime-chart">
        <Chart options={options} series={series} type="line" height="100%" width="100%" />
      </div>
    </section>
  );
}

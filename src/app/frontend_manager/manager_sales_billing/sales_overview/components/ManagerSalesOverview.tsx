// RESPONSIBILITY: Renders ManagerSalesOverview's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import dynamic from 'next/dynamic';

import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalEnvConfig';

import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';
import { ManagerSalesOverviewFormatCurrency, ManagerSalesOverviewFormatKpi } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewFormatters';
import type { OverviewDataPoint } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';


/**
 * @description Renders/orchestrates the ManagerSalesOverview user interface for the sales module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_sales_billing/manager_sales_utils/ManagerSalesOverviewFormatters; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig; @/app/frontend_manager/manager_sales_billing/manager_sales_hooks/useManagerSalesOverviewLogic; @/app/frontend_manager/manager_sales_billing/manager_sales_types/ManagerSalesOverviewTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });

/** @description Renders the ManagerSalesOverview component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves loading state, error state. */
export default function ManagerSalesOverview() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
  const locale = useLocale();

  const { overviewData, isPending, isError, errorMessage } = useManagerSalesOverviewLogic();

  if (isPending) {
    return <div className="space-y-5" aria-label={t("COPY_LOADING_SALES_OVERVIEW")}>
      <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_3")}</span>
      </div>
    );
  }

  const revenueOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', stacked: true },
    colors: ['var(--chart-primary)', 'var(--chart-success)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => ManagerSalesOverviewFormatCurrency(v, ManagerEnvConfig.currencyCode, locale) } },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' }, formatter: (v: number) => ManagerSalesOverviewFormatKpi(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' }, position: 'top' as const },
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } } };

  const membersOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['var(--chart-danger)'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'solid',
      opacity: 0.22
    },
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-table-header)' } } },
    dataLabels: { enabled: false } };

  return (
    <div className="space-y-6">
      <div className="bg-card p-5 rounded-xl border border-border shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <h3 className="font-bold text-text-primary mb-4">{t("COPY_MONTHLY_REVENUE")}</h3>
        <Chart
          type="bar"
          height={280}
          options={revenueOptions}
          series={[
            { name: t("TEXT_SERIES_MEMBERSHIPS"), data: overviewData.map((d: OverviewDataPoint) => d.revenue || 0) },
            { name: t("TEXT_SERIES_STORE_POS"), data: overviewData.map((d: OverviewDataPoint) => d.storeRevenue || 0) },
          ]}
        />
      </div>

      <div className="bg-card p-5 rounded-xl border border-border shadow-card col-span-1 md:col-span-2 lg:col-span-3 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <h3 className="font-bold text-text-primary mb-4">{t("COPY_NEW_MEMBERS_TREND")}</h3>
        <Chart
          type="area"
          height={250}
          options={membersOptions}
          series={[
            { name: t("TEXT_SERIES_NEW_MEMBERS"), data: overviewData.map((d: OverviewDataPoint) => d.newMembers || 0) },
          ]}
        />
      </div>
    </div>
  );
}

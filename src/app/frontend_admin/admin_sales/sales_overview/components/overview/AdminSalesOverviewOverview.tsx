"use client";
// RESPONSIBILITY: Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts.
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsOverview → accessible UI/events routed to owning hooks (admin_sales/sales_overview/components/overview/AdminSalesAnalyticsOverview.tsx)

import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { RefreshCw } from 'lucide-react';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewFormatCurrency';
import { formatKPI } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewFormatters';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewChartThemeTokens';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * @description AdminSalesAnalyticsOverview renders the SalesAnalyticsOverview interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminSalesAnalyticsOverview() {
  const locale = useLocale();
  const t = useTranslations();
  const {
    overviewData, referralData, overviewStatus, overviewError, retryOverview, isCustomRangeBlocked,
    referralStatus, referralError, retryReferrals,
  } = useAdminSalesLogic();

  const errorState = (message: string, retry: () => Promise<unknown>) => (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg p-4 text-danger">
      <p>{message}</p>
      <button type="button" onClick={() => void retry()} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="sales-analytics-sales-analytics-overview-retry">
        <RefreshCw size={16} aria-hidden="true" />{t('sales.SalesError.text_042c862e44')}
      </button>
    </div>
  );
  const skeleton = <div className="h-64 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" aria-busy="true" />;

  if (isCustomRangeBlocked) return <div role="status" className="rounded-xl border border-border bg-card p-5 text-secondary" data-testid="admin_sales-overview-invalid-range">{t('sales.AdminSalesDateFilterDropdown.customRangeHelp')}</div>;

  const months = overviewData.map((item) => item.date);
  const revenue = overviewData.map((item) => item.revenue);
  const members = overviewData.map((item) => item.newMembers);
  const pieLabels = referralData.map((item) => item.source);
  const pieSeries = referralData.map((item) => item.revenue);

  return <div className="space-y-6">
    {overviewStatus === 'pending' ? skeleton : overviewStatus === 'error' ? errorState(overviewError || t('sales.admin_sales_overview.text_41bdcad919'), retryOverview) : overviewData.length === 0 ? <p className="rounded-xl border border-border bg-card p-5 text-center text-secondary" role="status" data-testid="admin_sales-overview-empty">{t('sales.admin_sales_overview.auto_noOverviewData')}</p> : (
      <>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-bold text-primary">{t('sales.admin_sales_overview.text_762e600e5f')}</h3>
          <ReactApexChart type="bar" height={288} options={{ chart: { toolbar: { show: false } }, xaxis: { categories: months, labels: { style: { colors: ADMIN_CHART_THEME.textSecondary } } }, yaxis: { labels: { formatter: (value: number) => formatKPI(value, locale) } }, dataLabels: { enabled: false }, grid: { borderColor: ADMIN_CHART_THEME.border }, tooltip: { y: { formatter: (value: number) => AdminSalesFormatCurrency(value, undefined, locale) } } }} series={[{ name: t('sales.admin_sales_overview.series_revenue'), data: revenue }]} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-bold text-primary">{t('sales.admin_sales_overview.text_c7474256e3')}</h3>
          <ReactApexChart type="area" height={256} options={{ chart: { toolbar: { show: false } }, xaxis: { categories: months }, dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 3 }, fill: { opacity: 0.25 }, grid: { borderColor: ADMIN_CHART_THEME.border }, tooltip: { y: { formatter: (value: number) => formatKPI(value, locale) } } }} series={[{ name: t('sales.admin_sales_overview.remaining_newMembers'), data: members }]} />
        </div>
      </>
    )}
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="mb-4 font-bold text-primary">{t('sales.admin_sales_overview.text_6f62ec7108')}</h3>
      {referralStatus === 'pending' ? <div className="h-56 rounded-lg bg-skeleton-base motion-safe:animate-pulse" aria-busy="true" /> : referralStatus === 'error' ? errorState(referralError || t('sales.admin_sales_overview.text_41bdcad919'), retryReferrals) : referralData.length === 0 ? <p className="py-10 text-center text-secondary">{t('sales.admin_sales_overview.auto_noReferralData')}</p> : (
        <ReactApexChart type="donut" height={256} options={{ labels: pieLabels, chart: { toolbar: { show: false } }, legend: { position: 'bottom' }, dataLabels: { enabled: false }, tooltip: { y: { formatter: (value: number) => AdminSalesFormatCurrency(value, undefined, locale) } } }} series={pieSeries} />
      )}
    </div>
  </div>;
}

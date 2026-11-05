// RESPONSIBILITY: Renders ManagerExpenseRegisterAndReportingChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { MANAGER_EXPENSE_CHART_COLORS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_chart.constants';
import { useExpensesListQuery } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingQueries';
import { ManagerExpenseRegisterAndReportingFormatCurrency, ManagerExpenseRegisterAndReportingFormatKpi } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/utils/ManagerExpenseRegisterAndReportingFormatters';


/**
 * @description Renders/orchestrates the ManagerExpenseRegisterAndReportingChart user interface for the expenses module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_expenses_utils/ManagerExpenseRegisterAndReportingFormatters; @/app/frontend_manager/manager_finance_expenses/manager_expenses_constants/ManagerExpenseRegisterAndReportingChartConstants; @/app/frontend_manager/manager_finance_expenses/manager_expenses_hooks/useManagerExpenseRegisterAndReportingQueries; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });



/** @description Renders the ManagerExpenseRegisterAndReportingChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves loading state, error state. */
export default function ManagerExpenseRegisterAndReportingChart() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  const locale = useLocale();

  const { data, isPending, isError } = useExpensesListQuery({ limit: '1000' });
  const expenses = data?.expenses || [];

  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    
    // Group and sum expenses by category
    expenses.forEach(exp => {
      const cat = exp.category || 'Other';
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += exp.amount;
    });

    // Convert to array format
    const chartDataArray = Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));

    // Sort descending by value
    return chartDataArray.sort((a, b) => (b.value || 0) - (a.value || 0));
  }, [expenses]);

  if (isPending) {
    return <div className="min-h-72 space-y-4 p-4" aria-label={t("COPY_LOADING_EXPENSE_CHART")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {['expense-kpi-a','expense-kpi-b','expense-kpi-c'].map((key) => <div key={key} className="h-20 rounded-lg bg-skeleton-base motion-safe:animate-pulse" />)}
      </div>
      <div className="h-72 rounded-lg bg-skeleton-base motion-safe:animate-pulse" />
    </div>;
  }

  if (isError) {
    return <div role="alert" className="h-full min-h-72 flex items-center justify-center"><p className="text-danger-text font-medium">{t('TEXT_GENERIC_ERROR')}</p></div>;
  }

  if (chartData.length === 0) {
    return <div className="h-full min-h-72 flex items-center justify-center"><p className="text-text-secondary font-medium">{t('COPY_NO_EXPENSE_DATA_AVAILABLE_CHART')}</p></div>;
  }

  // Calculate total and highest for the summary headers
  const totalThisMonth = chartData.reduce((acc, curr) => acc + (curr.value || 0), 0);
  const highestCategory = chartData.length > 0 ? chartData[0] : null;

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: chartData.map((_, i) => MANAGER_EXPENSE_CHART_COLORS[i % MANAGER_EXPENSE_CHART_COLORS.length]) as string[],
    plotOptions: {
      bar: { borderRadius: 4, distributed: true }
    },
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { 
      theme: 'dark' as const,
      y: { formatter: (v: number) => ManagerExpenseRegisterAndReportingFormatCurrency(v, ManagerEnvConfig.currencyCode, locale) }
    },
    xaxis: {
      categories: chartData.map(d => d.name),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-caption)' } },
      axisBorder: { show: false }, 
      axisTicks: { show: false } },
    yaxis: { 
      labels: { style: { colors: 'var(--text-secondary)', fontSize: 'var(--font-size-caption)' }, formatter: (v: number) => ManagerExpenseRegisterAndReportingFormatKpi(v) } 
    },
    dataLabels: { enabled: false },
    legend: { show: false }
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-1">{t("COPY_TOTAL_TRACKED_EXPENSES")}</p>
          <p className="text-2xl font-black text-danger-text">
            {ManagerExpenseRegisterAndReportingFormatCurrency(totalThisMonth, ManagerEnvConfig.currencyCode, locale)}
          </p>
        </div>
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-1">{t("COPY_HIGHEST_CATEGORY")}</p>
          <p className="text-2xl font-black text-warning-text">
            {highestCategory ? `${highestCategory.name} (${ManagerExpenseRegisterAndReportingFormatCurrency(highestCategory.value || 0, ManagerEnvConfig.currencyCode, locale)})` : t('COPY_N')}
          </p>
        </div>
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-1">{t("COPY_TOTAL_CATEGORIES")}</p>
          <p className="text-2xl font-black text-text-primary">
            {chartData.length}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-72 w-full">
        <Chart
          type="bar"
          height="100%"
          options={options}
          series={[
            { name: t('COPY_AMOUNT'), data: chartData.map(d => d.value || 0) },
          ]}
        />
      </div>
    </div>
  );
}

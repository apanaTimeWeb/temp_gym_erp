// RESPONSIBILITY: Renders ManagerExpenseRegisterAndReportingKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { IndianRupee, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { useExpensesStatsQuery } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingQueries';
import { ManagerExpenseRegisterAndReportingFormatCurrency } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/utils/ManagerExpenseRegisterAndReportingFormatters';


/** @description Renders the ManagerExpenseRegisterAndReportingKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerExpenseRegisterAndReportingKPIs() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  const locale = useLocale();

  const { data: stats, isPending, isError, refetch } = useExpensesStatsQuery();

  if (isPending) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 motion-safe:animate-pulse" aria-label={t('COPY_LOADING_EXPENSE_CHART')}><div className="h-24 rounded-xl bg-input"/><div className="h-24 rounded-xl bg-input"/><div className="h-24 rounded-xl bg-input"/><div className="h-24 rounded-xl bg-input"/></div>;
  if (isError || !stats) return <div role="alert" className="rounded-lg border border-danger p-4 text-sm text-danger-text">{t('TEXT_GENERIC_ERROR')} <button type="button" className="min-h-11 underline" onClick={() => void refetch()}>{t('COPY_RETRY')}</button></div>;

  const KPI_CARDS = [
    { label: t("COPY_TOTAL_EXPENSES_ALL_TIME"), value: ManagerExpenseRegisterAndReportingFormatCurrency(stats.totalAmount, ManagerEnvConfig.currencyCode, locale), icon: IndianRupee, color: 'text-primary', bg: "bg-primary-subtle" },
    { label: t("COPY_EXPENSES_MONTH"), value: ManagerExpenseRegisterAndReportingFormatCurrency(stats.thisMonthAmount, ManagerEnvConfig.currencyCode, locale), icon: TrendingDown, color: 'text-info-text', bg: 'bg-info-bg' },
    { label: t("COPY_PENDING_DUES"), value: ManagerExpenseRegisterAndReportingFormatCurrency(stats.pendingAmount, ManagerEnvConfig.currencyCode, locale), icon: Clock, color: 'text-danger-text', bg: 'bg-danger-bg' },
    { label: t("COPY_TOTAL_PAID"), value: ManagerExpenseRegisterAndReportingFormatCurrency(stats.paidAmount, ManagerEnvConfig.currencyCode, locale), icon: CheckCircle, color: 'text-success-text', bg: 'bg-success-bg' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPI_CARDS.map(kpi => (
        <div key={kpi.label} className="bg-card border border-border p-5 rounded-xl shadow-card hover:shadow-card motion-safe:transition-all flex items-center gap-4 group motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
          <div className={[`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.color} group-motion-safe:hover:scale-110 motion-safe:transition-all`, "motion-safe:duration-200 ease-in-out"].filter(Boolean).join(' ')}>
            <kpi.icon size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className="text-xl font-bold text-text-primary">{kpi.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

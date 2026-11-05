// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryKpiCards's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { IndianRupee, Wallet, Clock, TrendingUp, Percent, ArrowLeftRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import { ManagerFinancePaymentsAndSummaryKpiCard } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryKpiCard';
import { useManagerFinancePaymentsAndSummaryLogic } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryLogic';
import { ManagerFinancePaymentsAndSummaryFormatCurrency, ManagerFinancePaymentsAndSummaryFormatNumber } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/utils/ManagerFinancePaymentsAndSummaryFormatters';



/** @description Renders the ManagerFinancePaymentsAndSummaryKpiCards component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinancePaymentsAndSummaryKpiCards() {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  const locale = useLocale();
  const { summary } = useManagerFinancePaymentsAndSummaryLogic();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
      <ManagerFinancePaymentsAndSummaryKpiCard label={t("COPY_TOTAL_REVENUE")}   value={summary ? ManagerFinancePaymentsAndSummaryFormatCurrency(summary.totalRevenue, ManagerEnvConfig.currencyCode, locale)   : '—'} icon={<TrendingUp size={18} strokeWidth={2} className="text-success-text"/>} color="bg-success-bg" />
      <ManagerFinancePaymentsAndSummaryKpiCard label={t("COPY_MONTH")}      value={summary ? ManagerFinancePaymentsAndSummaryFormatCurrency(summary.monthlyRevenue, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<IndianRupee size={18} strokeWidth={2} className="text-primary"/>} color="bg-primary-subtle" />
      <ManagerFinancePaymentsAndSummaryKpiCard label={t("COPY_TOTAL_PAYMENTS")}  value={summary ? ManagerFinancePaymentsAndSummaryFormatNumber(summary.totalPayments) : '—'} icon={<Wallet size={18} strokeWidth={2} className="text-info-text"/>} color="bg-info-bg"    />
      <ManagerFinancePaymentsAndSummaryKpiCard label={t("COPY_PENDING_AMOUNT")}  value={summary ? ManagerFinancePaymentsAndSummaryFormatCurrency(summary.pendingAmount, ManagerEnvConfig.currencyCode, locale)  : '—'} icon={<Clock size={18} strokeWidth={2} className="text-warning-text"/>} color="bg-warning-bg" />
      <ManagerFinancePaymentsAndSummaryKpiCard label={t("COPY_GST_COLLECTED")}   value={summary ? ManagerFinancePaymentsAndSummaryFormatCurrency(summary.gstCollected || 0, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<Percent size={18} strokeWidth={2} className="text-success-text"/>} color="bg-success-bg" />
      <ManagerFinancePaymentsAndSummaryKpiCard label={t("COPY_TOTAL_REFUNDS")}   value={summary ? ManagerFinancePaymentsAndSummaryFormatCurrency(summary.totalRefunds || 0, ManagerEnvConfig.currencyCode, locale) : '—'} icon={<ArrowLeftRight size={18} strokeWidth={2} className="text-danger-text"/>} color="bg-danger-bg" />
    </div>
  );
}

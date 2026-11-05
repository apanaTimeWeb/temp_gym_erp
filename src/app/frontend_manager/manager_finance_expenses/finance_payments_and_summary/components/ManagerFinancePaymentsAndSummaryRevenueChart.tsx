"use client";
// RESPONSIBILITY: Renders ManagerFinancePaymentsAndSummaryRevenueChart's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import dynamic from 'next/dynamic';

import { Loader2 } from 'lucide-react';

import { ManagerFinancePaymentsAndSummaryMethodBreakdown } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryMethodBreakdown';
import { ManagerFinancePaymentsAndSummaryRevenueExpenseChart } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryRevenueExpenseChart';
import { useManagerFinancePaymentsAndSummaryLogic } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryLogic';

/**
 * @description Renders/orchestrates the ManagerFinancePaymentsAndSummaryRevenueChart user interface for the finance module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_finance_expenses/manager_finance_components/manager_finance_main/manager_finance_method_breakdown/ManagerFinancePaymentsAndSummaryMethodBreakdown; @/app/frontend_manager/manager_finance_expenses/manager_finance_components/manager_finance_main/manager_finance_revenue_expense_chart/ManagerFinancePaymentsAndSummaryRevenueExpenseChart; @/app/frontend_manager/manager_finance_expenses/manager_finance_hooks/useManagerFinancePaymentsAndSummaryLogic
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1" aria-hidden="true" /> });




/** @description Renders the ManagerFinancePaymentsAndSummaryRevenueChart component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves loading state. */
export default function ManagerFinancePaymentsAndSummaryRevenueChart() {
  const { summary } = useManagerFinancePaymentsAndSummaryLogic();

  if (!summary) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin text-primary"/>
      </div>
    );
  }

  return (
    <>
      <ManagerFinancePaymentsAndSummaryRevenueExpenseChart data={summary.monthlyData ?? []} />
      <ManagerFinancePaymentsAndSummaryMethodBreakdown data={summary.revenueByMethod} />
    </>
  );
}

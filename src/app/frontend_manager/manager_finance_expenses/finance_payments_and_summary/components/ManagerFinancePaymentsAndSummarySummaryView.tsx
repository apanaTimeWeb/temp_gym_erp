// RESPONSIBILITY: Renders the Summary screen body for Manager Finance; data fetching remains in module hooks.
'use client';
import ManagerFinancePaymentsAndSummaryRevenueChart from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryRevenueChart';
import ManagerFinancePaymentsAndSummaryDailyCollectionReport from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryDailyCollectionReport';
import ManagerFinancePaymentsAndSummaryDefaultersList from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryDefaultersList';

export default function ManagerFinancePaymentsAndSummarySummaryView() {
  return (
    <div className="space-y-6">
      <ManagerFinancePaymentsAndSummaryDailyCollectionReport />
      <ManagerFinancePaymentsAndSummaryDefaultersList />
      <ManagerFinancePaymentsAndSummaryRevenueChart />
    </div>
  );
}

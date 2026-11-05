// Autonomous leaf route for manager_finance.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryMain';
import Loading from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/loading';

export const dynamic = 'force-dynamic';

export default function ManagerFinancePaymentsAndSummaryPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}

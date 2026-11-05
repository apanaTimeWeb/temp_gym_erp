// Autonomous leaf route for manager_expenses.
import { Suspense } from 'react';
import Main from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/components/ManagerExpenseRegisterAndReportingMain';
import Loading from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/loading';


export default function ManagerExpenseRegisterAndReportingPage() {
  return <Suspense fallback={<Loading />}><Main /></Suspense>;
}

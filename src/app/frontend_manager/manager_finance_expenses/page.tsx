// Preserve the historical domain URL by redirecting to the verified canonical leaf route.
import { redirect } from 'next/navigation';

export default function ManagerFinanceExpensesDomainRedirectPage() {
  redirect('/frontend_manager/manager_finance_expenses/finance_payments_and_summary');
}

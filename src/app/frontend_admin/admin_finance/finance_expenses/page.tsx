"use client";
// Route entry for the independently navigable Finance Expenses capability.
import { useTranslations } from 'next-intl';
import { RefreshCw } from 'lucide-react';
import AdminFinanceOverviewExpensesTable from '@/app/frontend_admin/admin_finance/finance_expenses/components/expenses_table/AdminFinanceExpensesExpensesTable';
import { AdminFinanceOverviewDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_expenses/components/date_filter/AdminFinanceExpensesDateFilterDropdown';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_expenses/hooks/useAdminFinanceExpensesLogic';
import AdminFinanceOverviewKPIs from '@/app/frontend_admin/admin_finance/finance_expenses/components/kpis/AdminFinanceExpensesKPIs';
import AdminFinanceOverviewRevenueByMethod from '@/app/frontend_admin/admin_finance/finance_expenses/components/revenue_by_method/AdminFinanceExpensesRevenueByMethod';

export default function AdminFinanceExpensesPage() {
  const t = useTranslations();
  const { isError, error, loadAll } = useAdminFinanceLogic();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">{t('finance.admin_finance_tabs.expenses')}</h1><AdminFinanceOverviewDateFilterDropdown /></header>
    {isError && <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-4 text-danger"><p>{error || t('finance.admin_finance_tabs.financeLoadError')}</p><button type="button" onClick={()=>void loadAll()} className="mt-2 min-h-11 rounded-lg border border-danger px-4">{t('finance.admin_finance_tabs.retry')}</button></div>}
    <AdminFinanceOverviewKPIs />
    <AdminFinanceOverviewRevenueByMethod />
    <div className="flex justify-end"><button type="button" onClick={() => void loadAll()} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('finance.admin_finance_tabs.text_1e5fcf297b')}><RefreshCw size={18} aria-hidden="true"/></button></div>
    <section aria-label={t('finance.admin_finance_expenses.accessibility.data')} className="rounded-xl border border-border bg-card p-5"><AdminFinanceOverviewExpensesTable /></section>
  </main>;
}

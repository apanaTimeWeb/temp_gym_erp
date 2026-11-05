"use client";
// Route entry for the independently navigable Finance Summary capability.
import { useTranslations } from 'next-intl';
import { Search, RefreshCw } from 'lucide-react';
import AdminFinanceOverviewRevenueSummary from '@/app/frontend_admin/admin_finance/finance_summary/components/revenue_summary/AdminFinanceSummaryRevenueSummary';
import { AdminFinanceOverviewDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_summary/components/date_filter/AdminFinanceSummaryDateFilterDropdown';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryLogic';
import AdminFinanceOverviewKPIs from '@/app/frontend_admin/admin_finance/finance_summary/components/kpis/AdminFinanceSummaryKPIs';
import AdminFinanceOverviewRevenueByMethod from '@/app/frontend_admin/admin_finance/finance_summary/components/revenue_by_method/AdminFinanceSummaryRevenueByMethod';
import { FINANCE_PAYMENT_METHOD_OPTIONS, FINANCE_PAYMENT_STATUS_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_summary/constants/AdminFinanceSummaryConstants';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_summary/components/searchable_dropdown/AdminFinanceSummarySearchableDropdown';

export default function AdminFinanceSummaryPage() {
  const t = useTranslations();
  const { search, setSearch, methodFilter, setMethodFilter, statusFilter, setStatusFilter, isError, error, loadAll } = useAdminFinanceLogic();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">{t('finance.admin_finance_tabs.summary')}</h1><AdminFinanceOverviewDateFilterDropdown /></header>
    {isError && <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-4 text-danger"><p>{error || t('finance.admin_finance_tabs.financeLoadError')}</p><button type="button" onClick={()=>void loadAll()} className="mt-2 min-h-11 rounded-lg border border-danger px-4">{t('finance.admin_finance_tabs.retry')}</button></div>}
    <AdminFinanceOverviewKPIs />
    <AdminFinanceOverviewRevenueByMethod />
    
    <section aria-label={t('finance.admin_finance_summary.accessibility.data')} className="rounded-xl border border-border bg-card p-5"><AdminFinanceOverviewRevenueSummary /></section>
  </main>;
}

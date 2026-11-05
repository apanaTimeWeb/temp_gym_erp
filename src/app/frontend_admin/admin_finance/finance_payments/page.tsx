"use client";
// Route entry for the independently navigable Finance Payments capability.
import { useTranslations } from 'next-intl';
import { Search, RefreshCw } from 'lucide-react';
import type { ChangeEvent } from 'react';
import AdminFinanceOverviewPaymentsTable from '@/app/frontend_admin/admin_finance/finance_payments/components/payments_table/AdminFinancePaymentsPaymentsTable';
import { AdminFinanceOverviewDateFilterDropdown } from '@/app/frontend_admin/admin_finance/finance_payments/components/date_filter/AdminFinancePaymentsDateFilterDropdown';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_payments/hooks/useAdminFinancePaymentsLogic';
import AdminFinanceOverviewKPIs from '@/app/frontend_admin/admin_finance/finance_payments/components/kpis/AdminFinancePaymentsKPIs';
import AdminFinanceOverviewRevenueByMethod from '@/app/frontend_admin/admin_finance/finance_payments/components/revenue_by_method/AdminFinancePaymentsRevenueByMethod';
import { FINANCE_PAYMENT_METHOD_OPTIONS, FINANCE_PAYMENT_STATUS_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_payments/constants/AdminFinancePaymentsConstants';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_finance/finance_payments/components/searchable_dropdown/AdminFinancePaymentsSearchableDropdown';

export default function AdminFinancePaymentsPage() {
  const t = useTranslations();
  const { search, setSearch, methodFilter, setMethodFilter, statusFilter, setStatusFilter, isError, error, loadAll } = useAdminFinanceLogic();
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-bold">{t('finance.admin_finance_tabs.payments')}</h1><AdminFinanceOverviewDateFilterDropdown /></header>
    {isError && <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-4 text-danger"><p>{error || t('finance.admin_finance_tabs.financeLoadError')}</p><button type="button" onClick={()=>void loadAll()} className="mt-2 min-h-11 rounded-lg border border-danger px-4">{t('finance.admin_finance_tabs.retry')}</button></div>}
    <AdminFinanceOverviewKPIs />
    <AdminFinanceOverviewRevenueByMethod />
    <div className="flex flex-wrap gap-2 items-center"><div className="relative"><span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} className="text-secondary" aria-hidden="true" /></span><input aria-label={t('finance.admin_finance_tabs.text_3a82474c4f')} value={search} onChange={(e: ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} placeholder={t('finance.admin_finance_tabs.text_7e1f7a5cf9')} className="min-h-11 rounded-lg border border-border bg-input pl-9 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div><div className="w-44"><AdminNavigationLayoutSearchableDropdown options={FINANCE_PAYMENT_METHOD_OPTIONS.map((option)=>({value:option.value,label:t(option.labelKey)}))} value={methodFilter} onChange={(v)=>setMethodFilter(String(v))} testId="admin-finance-method-filter" /></div><div className="w-44"><AdminNavigationLayoutSearchableDropdown options={FINANCE_PAYMENT_STATUS_OPTIONS.map((option)=>({value:option.value,label:t(option.labelKey)}))} value={statusFilter} onChange={(v)=>setStatusFilter(String(v))} testId="admin-finance-status-filter" /></div><button type="button" onClick={()=>void loadAll()} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('finance.admin_finance_tabs.text_1e5fcf297b')}><RefreshCw size={18} aria-hidden="true"/></button></div>
    <section aria-label={t('finance.admin_finance_payments.accessibility.data')} className="rounded-xl border border-border bg-card p-5"><AdminFinanceOverviewPaymentsTable /></section>
  </main>;
}

"use client";
// Route entry for the independently navigable Sales Membership report capability.
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import AdminSalesAnalyticsMembershipReport from '@/app/frontend_admin/admin_sales/sales_membership_report/components/membership_report/AdminSalesMembershipReportMembershipReport';
import { AdminSalesAnalyticsDateFilterDropdown } from '@/app/frontend_admin/admin_sales/sales_membership_report/components/date_filter/AdminSalesMembershipReportDateFilterDropdown';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportLogic';
import { useAdminSalesToolbarSearch } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportToolbarSearch';

export default function AdminSalesMembershipreportPage() {
  const t = useTranslations();
  const { search, setSearch, isCustomRangeBlocked } = useAdminSalesLogic();
  const { localSearch, setLocalSearch } = useAdminSalesToolbarSearch(search, setSearch);
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('sales.AdminSalesTabs.membershipReport')}</h1>
    <section className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-border bg-card p-4" aria-label={t('sales.admin_sales_membership_report.accessibility.filters')}>
      <AdminSalesAnalyticsDateFilterDropdown />
      <div className="flex flex-wrap gap-2 items-center">
        <label htmlFor="admin-sales-capability-search" className="sr-only">{t('sales.admin_sales_toolbar.searchMembers')}</label>
        <div className="relative"><span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} aria-hidden="true" className="text-secondary" /></span><input id="admin-sales-capability-search" type="search" value={localSearch} onChange={(event)=>setLocalSearch(event.target.value)} placeholder={t('sales.admin_sales_toolbar.text_6d7a30a931')} className="min-h-11 rounded-lg border border-border bg-input pl-9 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
        
      </div>
    </section>
    {isCustomRangeBlocked ? <p role="alert" className="rounded-lg border border-border bg-warning-bg p-4 text-warning">{t('sales.admin_sales_date_filter.customRangeBlocked')}</p> : <section aria-label={t('sales.admin_sales_membership_report.accessibility.data')} className="rounded-xl border border-border bg-card p-5"><AdminSalesAnalyticsMembershipReport /></section>}
  </main>;
}

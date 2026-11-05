"use client";
// Route entry for the independently navigable Sales Overview capability.
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { downloadAdminSalesOverviewCsv } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewDownloadCsv';
import { AdminSalesOverviewCreateExportCsv } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewCreateExportCsv';
import { Download, Search } from 'lucide-react';
import AdminSalesAnalyticsOverview from '@/app/frontend_admin/admin_sales/sales_overview/components/overview/AdminSalesOverviewOverview';
import { AdminSalesAnalyticsDateFilterDropdown } from '@/app/frontend_admin/admin_sales/sales_overview/components/date_filter/AdminSalesOverviewDateFilterDropdown';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewLogic';
import { useAdminSalesToolbarSearch } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewToolbarSearch';

export default function AdminSalesOverviewPage() {
  const t = useTranslations();
  const [exportFailed, setExportFailed] = useState(false);
  const { search, setSearch, overviewData, isCustomRangeBlocked } = useAdminSalesLogic();
  const { localSearch, setLocalSearch } = useAdminSalesToolbarSearch(search, setSearch);
  return <main className="min-h-full bg-page p-6 text-primary space-y-5">
    <h1 className="text-2xl font-bold">{t('sales.AdminSalesTabs.overview')}</h1>
    <section className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-border bg-card p-4" aria-label={t('sales.admin_sales_overview.accessibility.filters')}>
      <AdminSalesAnalyticsDateFilterDropdown />
      <div className="flex flex-wrap gap-2 items-center">
        <label htmlFor="admin-sales-capability-search" className="sr-only">{t('sales.admin_sales_toolbar.searchMembers')}</label>
        <div className="relative"><span className="absolute inset-y-0 left-3 flex items-center"><Search size={18} aria-hidden="true" className="text-secondary" /></span><input id="admin-sales-capability-search" type="search" value={localSearch} onChange={(event)=>setLocalSearch(event.target.value)} placeholder={t('sales.admin_sales_toolbar.text_6d7a30a931')} className="min-h-11 rounded-lg border border-border bg-input pl-9 pr-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" /></div>
        <button type="button" onClick={() => { try { const header=t('sales.admin_sales_toolbar.remaining_csvHeader'); const csv=AdminSalesOverviewCreateExportCsv(header,overviewData); downloadAdminSalesOverviewCsv(csv); setExportFailed(false); } catch { setExportFailed(true); } }} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 text-sm text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="admin-sales-overview-export"><Download size={18} aria-hidden="true" />{t('sales.admin_sales_toolbar.text_f3e4fadb9e')}</button>
      </div>
    </section>
    {exportFailed && <p role="alert" className="text-sm text-danger">{t('sales.admin_sales_toolbar.exportFailed')}</p>}
    {isCustomRangeBlocked ? <p role="alert" className="rounded-lg border border-border bg-warning-bg p-4 text-warning">{t('sales.admin_sales_date_filter.customRangeBlocked')}</p> : <section aria-label={t('sales.admin_sales_overview.accessibility.data')} className="rounded-xl border border-border bg-card p-5"><AdminSalesAnalyticsOverview /></section>}
  </main>;
}

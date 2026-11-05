"use client";
// RESPONSIBILITY: Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state.
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsToolbar → accessible UI/events routed to owning hooks (admin_sales/sales_overview/components/toolbar/AdminSalesAnalyticsToolbar.tsx)

import { useTranslations } from 'next-intl';
import { useState, type ChangeEvent } from 'react';
import { downloadAdminSalesOverviewCsv } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewDownloadCsv';
import { AdminSalesOverviewCreateExportCsv } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewCreateExportCsv';

import { Download, Search } from 'lucide-react';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewLogic';
import { AdminSalesAnalyticsDateFilterDropdown as AdminSalesDateFilterDropdown } from '@/app/frontend_admin/admin_sales/sales_overview/components/date_filter/AdminSalesOverviewDateFilterDropdown';
import { useAdminSalesToolbarSearch } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewToolbarSearch';

/**
 * AdminSalesAnalyticsToolbar renders the admin sales toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsToolbar: Renders the date filter dropdown (with Custom date range pickers), search input, and export button for the Sales module. Reads/writes state via useAdminSalesLogic state.
 * @dependencies Consumes useAdminSalesLogic, AdminSalesDateFilterDropdown.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAnalyticsToolbar() {
  const t = useTranslations();
  const [exportFailed, setExportFailed] = useState(false);

  const { search, setSearch, overviewData, overviewStatus, isCustomRangeBlocked } = useAdminSalesLogic();
  const canExport = !isCustomRangeBlocked && overviewStatus === 'success' && overviewData.length > 0;
  const { localSearch, setLocalSearch } = useAdminSalesToolbarSearch(search, setSearch);



  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 space-y-3 mb-5">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-3 flex-wrap">
          <AdminSalesDateFilterDropdown />
        </div>

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <label htmlFor="admin-sales-search" className="sr-only">{t('sales.admin_sales_toolbar.searchLabel')}</label>
            <span className="absolute inset-y-0 left-3 flex items-center" aria-hidden="true"><Search size={18} className="text-secondary" strokeWidth={2}/></span>
            <input aria-label={t('sales.admin_sales_toolbar.searchMembers')}
              id="admin-sales-search"
              type="search"
              value={localSearch}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setLocalSearch(e.target.value)}
              placeholder={t('sales.admin_sales_toolbar.text_6d7a30a931')}
              className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm:w-56 bg-input text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11"
             data-testid="admin_sales-admin_sales-toolbar-control"/>
          </div>
          <button
            type="button"
            disabled={!canExport}
            aria-disabled={!canExport}
            onClick={() => {
              if (!canExport) return;
              try {
                const header = t('sales.admin_sales_toolbar.remaining_csvHeader');
                const csv = AdminSalesOverviewCreateExportCsv(header, overviewData);
                downloadAdminSalesOverviewCsv(csv);
                setExportFailed(false);
              } catch {
                setExportFailed(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_sales-admin_sales-toolbar-click">
            <Download size={18}  strokeWidth={2}/> {t('sales.admin_sales_toolbar.text_f3e4fadb9e')}</button>
          {exportFailed && <p role="alert" className="text-sm text-danger">{t('sales.admin_sales_toolbar.exportFailed')}</p>}
        </div>
      </div>
    </div>
  );
}

// RESPONSIBILITY: Renders ManagerSalesOverviewToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';

import { Download, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLocalDebouncedValueCommit';

import ManagerSalesOverviewDateFilterDropdown from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewDateFilterDropdown';
import { SALES_VIEW_TO_TAB } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_shared.constants';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';


/** @description Renders the ManagerSalesOverviewToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesOverviewToolbar() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');

  const { 
    view, search, setSearch, setCurrentPage,
    overviewData, membershipReport, pendingPayments, allMemberships
  } = useManagerSalesOverviewLogic();
  const tab = SALES_VIEW_TO_TAB[view];
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  useManagerInfrastructureDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
  <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-wrap gap-3 items-center justify-between mb-5 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
  <div className="flex gap-2 flex-wrap items-center">
    <ManagerSalesOverviewDateFilterDropdown  data-testid="manager_sales-managersalestoolbar-sales-date-filter-dropdown-1"/>
  </div>
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
  <div className="relative">
    <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
    <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-9 pr-3 py-1.5 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-40 sm:w-full sm:w-64  bg-input text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_sales-manager-sales-toolbar-input-value" 
      value={localSearch} 
      onChange={e => setLocalSearch(e.target.value)} 
      placeholder={t("COPY_SEARCH")} 
      
     aria-label={t("COPY_SEARCH")}/>
  </div>
  <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-primary-subtle text-text-secondary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_sales-manager-sales-toolbar-button-export" 
    onClick={() => {
      let csv = '';
      let filename = 'sales_report.csv';
      if (tab === 'Revenue Overview') {
        csv = 'Month,Revenue\n' + overviewData.map(d => `${d.month},${d.revenue}`).join('\n');
        filename = 'revenue_overview.csv';
      } else if (tab === 'Membership Report') {
        csv = 'Plan,Receivable,Received,Remaining,Refund\n' + membershipReport.map(r => `${r.plan},${r.receivable},${r.received},${r.remaining},${r.refund}`).join('\n');
        filename = 'membership_report.csv';
      } else if (tab === 'Pending Payments') {
        // Export aggregate totals only; member names and contact details are personal data.
        csv = `Metric,Value\nPending Members,${pendingPayments.length}`;
        filename = 'pending_payment_summary.csv';
      } else if (tab === 'All Memberships') {
        // Do not export member-level identity/contact data from this synchronous client action.
        csv = `Metric,Value\nMembership Records,${allMemberships.length}`;
        filename = 'membership_summary.csv';
      }

      if (!csv) {
        return;
      }

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }}
    
   type="button">
    <Download size={18} strokeWidth={2} />{t("COPY_EXPORT")}</button>
 </div>
 </div>
 );
}

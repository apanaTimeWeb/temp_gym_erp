// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useEffect, useState } from 'react';
import { Search, Download, FileText, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import ManagerFinancePaymentsAndSummaryDateFilterDropdown from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/components/ManagerFinancePaymentsAndSummaryDateFilterDropdown';
import { FINANCE_METHOD_FILTER_OPTIONS, FINANCE_STATUS_FILTER_OPTIONS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';
import { useManagerFinancePaymentsAndSummaryLogic } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryLogic';


/** @description Renders the ManagerFinancePaymentsAndSummaryFilters component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerFinancePaymentsAndSummaryFilters() {
  const t = useTranslations('MANAGER_FINANCE_PAYMENTS_AND_SUMMARY');
  const {
    search, setSearch,
    statusFilter, setStatusFilter,
    methodFilter, setMethodFilter,
    reload, exportCSV, exportPDF
  } = useManagerFinancePaymentsAndSummaryLogic();

  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => { setSearchInput(search); }, [search]);
  useEffect(() => {
    if (searchInput === search) return;
    const timeoutId = window.setTimeout(() => setSearch(searchInput), 300);
    return () => window.clearTimeout(timeoutId);
  }, [search, searchInput, setSearch]);

  return (
    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3 p-4 border-b border-border">
      <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
        <div className="relative w-full sm:w-64">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_finance-manager-finance-main-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_PAYMENTS")}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            
           aria-label={t("COPY_SEARCH_PAYMENTS")}/>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ManagerFinancePaymentsAndSummaryDateFilterDropdown  data-testid="manager_finance-managerfinancefilters-finance-date-filter-dropdown-1"/>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 w-full xl:w-auto justify-start xl:justify-end">
        <div className="w-40">
          <ManagerSearchableDropdown dataTestId="manager_finance-managerfinancefilters-managersearchabledropdown-1"
            value={statusFilter}
            onChange={(val) => setStatusFilter(val.toString())}
            options={FINANCE_STATUS_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            className="bg-input"
           data-testid="manager_finance-managerfinancefilters-searchable-dropdown-1"/>
        </div>
        <div className="w-44">
          <ManagerSearchableDropdown dataTestId="manager_finance-managerfinancefilters-managersearchabledropdown-2"
            value={methodFilter}
            onChange={(val) => setMethodFilter(val.toString())}
            options={FINANCE_METHOD_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            className="bg-input"
           data-testid="manager_finance-managerfinancefilters-searchable-dropdown-2"/>
        </div>
        <button data-testid="manager_finance-manager-finance-main-export-csv" onClick={exportCSV}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" type="button">
          <Download size={18} strokeWidth={2}/>{t("COPY_CSV")}</button>
        <button data-testid="manager_finance-manager-finance-main-export-pdf" onClick={exportPDF}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-info text-on-info motion-safe:transition-all hover:brightness-110 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" type="button">
          <FileText size={18} strokeWidth={2}/>{t("COPY_PDF")}</button>
        <button data-testid="manager_finance-manager-finance-main-reload" onClick={reload}
          className="min-w-32 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-input border border-border text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" type="button">
          <RefreshCw size={18} strokeWidth={2}/>{t("COPY_REFRESH")}</button>
      </div>
    </div>
  );
}

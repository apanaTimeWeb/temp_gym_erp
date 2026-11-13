// RESPONSIBILITY: Renders ManagerExpenseRegisterAndReportingToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useEffect, useState } from 'react';
import { Search, Plus, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { EXPENSE_STATUS_LABELS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import { useManagerExpenseRegisterAndReportingLogic } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingLogic';


/** @description Renders the ManagerExpenseRegisterAndReportingToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerExpenseRegisterAndReportingToolbar() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');

  const { search, setSearch, statusFilter, setStatusFilter, openAdd, exportExpenses, range, setRange } = useManagerExpenseRegisterAndReportingLogic();
  const [searchDraft, setSearchDraft] = useState(search);
  useEffect(() => { setSearchDraft(search); }, [search]);
  useEffect(() => { const timer = window.setTimeout(() => setSearch(searchDraft), 300); return () => window.clearTimeout(timer); }, [searchDraft, setSearch]);

  return (
    <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-card flex-wrap">
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-text-primary mr-2 shrink-0">{t("COPY_EXPENSES_2")}</h1>
        <div className="relative w-full sm:w-64">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring text-text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_expenses-manager-expenses-toolbar-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_EXPENSES")}
            value={searchDraft}
            onChange={e => setSearchDraft(e.target.value)}
            
           aria-label={t("COPY_SEARCH_EXPENSES")}/>
        </div>
        <div className="w-full sm:w-48">
          <ManagerSearchableDropdown dataTestId="manager_expenses-managerexpensestoolbar-managersearchabledropdown-1"
            value={statusFilter}
            onChange={(val) => setStatusFilter(val.toString())}
            options={[
              { value: t('COPY_ALL'), label: t("COPY_ALL_STATUSES") },
              ...Object.entries(EXPENSE_STATUS_LABELS).map(([val, label]) => ({ value: val, label }))
            ]}
            className="bg-input"
           data-testid="manager_expenses-managerexpensestoolbar-searchable-dropdown-1"/>
        </div>
        <div className="w-full sm:w-44">
          <ManagerSearchableDropdown
            dataTestId="manager_expenses-managerexpensestoolbar-date-filter"
            value={range}
            onChange={(val) => setRange(val.toString())}
            options={[
              { value: 'this_month', label: 'This Month' },
              { value: 'last_month', label: 'Last Month' },
              { value: 'last_3_months', label: 'Last 3 Months' },
              { value: 'this_year', label: 'This Year' },
              { value: 'custom', label: 'Custom' },
            ]}
            className="bg-input"
            ariaLabel="Date range filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex-1 sm:flex-none flex items-center justify-center gap-2 bg-input border border-border text-text-secondary px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-subtle hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_expenses-manager-expenses-toolbar-button-export"
          onClick={() => exportExpenses && exportExpenses()}
          
         type="button">
          <Download size={18} strokeWidth={2}/>{t("COPY_EXPORT")}</button>
        <button data-testid="manager_expenses-manager-expenses-toolbar-add"
          onClick={openAdd}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-bold shadow-card hover:shadow-card hover:shadow-card motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
         type="button">
          <Plus size={18} strokeWidth={2}/>{t("COPY_ADD_EXPENSE")}</button>
      </div>
    </div>
  );
}

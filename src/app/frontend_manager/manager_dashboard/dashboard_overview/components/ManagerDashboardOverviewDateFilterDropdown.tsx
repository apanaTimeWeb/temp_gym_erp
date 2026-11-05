// RESPONSIBILITY: Renders ManagerDashboardOverviewDateFilterDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/constants/manager_dashboard_overview_date_filter.constants';
import { useManagerDashboardOverviewUrlState } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/hooks/useManagerDashboardOverviewUrlState';
import type { ManagerDashboardOverviewDateRange, ManagerDashboardOverviewDateField } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';


/** @description Renders the ManagerDashboardOverviewDateFilterDropdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerDashboardOverviewDateFilterDropdown() {
  const t = useTranslations('MANAGER_DASHBOARD');

  const { range, startDate, endDate, setRange, setCustomDateRange } = useManagerDashboardOverviewUrlState();


  const handleRangeChange = (value: string | number) => {
    // Presets are represented by the range value alone. Calling setCustomDateRange
    // here would overwrite the preset with `range=custom` in a second URL update.
    setRange(value as ManagerDashboardOverviewDateRange);
  };

  const handleDateChange = useCallback((key: ManagerDashboardOverviewDateField, value: string) => {
    const nextStart = key === 'startDate' ? value : startDate;
    const nextEnd = key === 'endDate' ? value : endDate;
    setCustomDateRange(nextStart, nextEnd);
  }, [endDate, setCustomDateRange, startDate]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-2 w-full sm:w-auto">
      <div className="w-full sm:w-48">
        <ManagerSearchableDropdown dataTestId="manager_dashboard-managerdashboarddatefilterdropdown-managersearchabledropdown-1"
          options={MANAGER_DASHBOARD_OVERVIEW_DATE_RANGE_OPTIONS.map(({ value, labelKey }) => ({ value, label: t(labelKey) }))}
          value={range}
          onChange={handleRangeChange}
          className="bg-input"
         data-testid="manager_dashboard-managerdashboarddatefilterdropdown-searchable-dropdown-1"/>
      </div>
      {range === 'custom' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
          <label className="sr-only" htmlFor="manager-dashboard-start-date">{t("COPY_START_DATE")}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-date-filter-dropdown-manager-dashboard-start-date"
            id="manager-dashboard-start-date"
            type="date"
            value={startDate}
            onChange={(event) => handleDateChange('startDate', event.target.value)}
            
          />
          <label className="sr-only" htmlFor="manager-dashboard-end-date">{t("COPY_END_DATE")}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_dashboard-manager-dashboard-date-filter-dropdown-manager-dashboard-end-date"
            id="manager-dashboard-end-date"
            type="date"
            value={endDate}
            onChange={(event) => handleDateChange('endDate', event.target.value)}
            
          />
        </div>
      )}
    </div>
  );
}

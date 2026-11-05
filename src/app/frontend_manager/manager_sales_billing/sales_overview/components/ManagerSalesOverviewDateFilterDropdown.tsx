// RESPONSIBILITY: Renders ManagerSalesOverviewDateFilterDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { MANAGER_SALES_OVERVIEW_DATE_RANGE_OPTIONS, MANAGER_SALES_OVERVIEW_DATE_RANGE_VALUES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_date_filter.constants';
import { ManagerSalesOverviewConstants } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview.constants';
import type { ManagerSalesOverviewDateRange } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';


/**
 * @description Provides the `toDateInputValue` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * @description Provides the `resolvePresetDates` transformation used by the owning Manager feature. Keeps display/domain shaping local so components remain focused on rendering and interaction orchestration.
 * @dependencies Uses only the values and module constants visible in this file; it does not call APIs or cross feature boundaries.
 * @edge-case Handles missing, empty, nullable, and boundary inputs according to the caller's documented UI contract without inventing business data.
 */
function resolvePresetDates(range: ManagerSalesOverviewDateRange): { startDate: string; endDate: string } {
  const now = new Date();
  switch (range) {
    case 'this_month':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth(), 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };
    case 'last_month':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 1, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth(), 0)),
      };
    case 'last_3_months':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 3, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };
    case 'last_6_months':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() - 6, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
      };
    case 'this_year':
      return {
        startDate: toDateInputValue(new Date(now.getFullYear(), 0, 1)),
        endDate: toDateInputValue(new Date(now.getFullYear(), 11, 31)),
      };
    case 'custom':
      return { startDate: '', endDate: '' };
  }
}

/** @description Renders the ManagerSalesOverviewDateFilterDropdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerSalesOverviewDateFilterDropdown() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedRange = searchParams.get('range');
  const range: ManagerSalesOverviewDateRange = MANAGER_SALES_OVERVIEW_DATE_RANGE_VALUES.some((value) => value === requestedRange) ? requestedRange as ManagerSalesOverviewDateRange : ManagerSalesOverviewConstants.defaultDateRange;
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleRangeChange = useCallback((input: string | number) => {
    const selected = input as ManagerSalesOverviewDateRange;
    const dates = resolvePresetDates(selected);
    updateUrl({
      range: selected,
      startDate: dates.startDate || null,
      endDate: dates.endDate || null,
    });
  }, [updateUrl]);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="w-full sm:w-48">
        <ManagerSearchableDropdown dataTestId="manager_sales-managersalesdatefilterdropdown-managersearchabledropdown-1"
          options={[...MANAGER_SALES_OVERVIEW_DATE_RANGE_OPTIONS]}
          value={range}
          onChange={handleRangeChange}
          className="bg-input"
         data-testid="manager_sales-managersalesdatefilterdropdown-searchable-dropdown-1"/>
      </div>
      {range === 'custom' && (
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <label className="sr-only" htmlFor="manager-sales-start-date">{t("COPY_START_DATE")}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_sales-manager-sales-date-filter-dropdown-manager-sales-start-date"
            id="manager-sales-start-date"
            type="date"
            value={startDate}
            onChange={(event) => updateUrl({ range: 'custom', startDate: event.target.value || null })}
            
          />
          <label className="sr-only" htmlFor="manager-sales-end-date">{t("COPY_END_DATE")}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 bg-input border border-border rounded-lg px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_sales-manager-sales-date-filter-dropdown-manager-sales-end-date"
            id="manager-sales-end-date"
            type="date"
            value={endDate}
            onChange={(event) => updateUrl({ range: 'custom', endDate: event.target.value || null })}
            
          />
        </div>
      )}
    </div>
  );
}

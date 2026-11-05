// RESPONSIBILITY: Renders ManagerReportsOverviewDateFilterDropdown's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/constants/manager_reports_overview_date_filter.constants';
import type { ManagerReportsOverviewDateRange } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';

/** @description Renders the ManagerReportsOverviewDateFilterDropdown component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsOverviewDateFilterDropdown() {
  const locale = useLocale();
  const isHindi = locale.toLowerCase().startsWith('hi');
  const localizedOptions = MANAGER_REPORTS_OVERVIEW_DATE_RANGE_OPTIONS.map((option) => ({
    ...option,
    label: isHindi ? ({ this_month: 'इस महीने', last_month: 'पिछले महीने', last_3_months: 'पिछले 3 महीने', last_6_months: 'पिछले 6 महीने', this_year: 'इस वर्ष', monthly: 'मासिक (सभी समय)', yearly: 'वार्षिक (सभी समय)' } as const)[option.value] : option.label,
  }));
  const router=useRouter(); const pathname=usePathname(); const searchParams=useSearchParams(); const requestedRange = searchParams.get('range'); const range: ManagerReportsOverviewDateRange = localizedOptions.some((option) => option.value === requestedRange) ? requestedRange as ManagerReportsOverviewDateRange : 'this_month';
  const update=useCallback((next:string)=>{const p=new URLSearchParams(searchParams.toString()); if(next==='this_month')p.delete('range');else p.set('range',next);router.replace(`${pathname}${p.toString()?`?${p.toString()}`:''}`,{scroll:false});},[pathname,router,searchParams]);
  return <div className="w-full sm:w-48"><ManagerSearchableDropdown dataTestId="manager_reports-managerreportsdatefilterdropdown-managersearchabledropdown-1" options={localizedOptions} value={range} onChange={(v)=>update(String(v))} className="bg-input min-h-11" data-testid="manager_reports-managerreportsdatefilterdropdown-searchable-dropdown-1"/></div>;
}

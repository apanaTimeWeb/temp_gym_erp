// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';

import { RefreshCw, Plus, Search, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLocalDebouncedValueCommit';

import { MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking.constants';
import { ATTENDANCE_TABS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/constants/manager_attendance_tracking_shared.constants';
import { useManagerAttendanceTrackingLogic } from '@/app/frontend_manager/manager_attendance/attendance_tracking/hooks/useManagerAttendanceTrackingLogic';


/** @description Renders the ManagerAttendanceTrackingToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerAttendanceTrackingToolbar() {
  const t = useTranslations('MANAGER_ATTENDANCE_TRACKING');

  const { tab, setTab, loadAll, setShowModal, search, setSearch, dateFilter, setDateFilter, range, setRange, statusFilter, setStatusFilter, setCurrentPage, exportAttendance } = useManagerAttendanceTrackingLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  useManagerInfrastructureDebouncedValueCommit(localSearch, search, setSearch, 300);

 return (
 <div className="border-b border-border flex flex-col">
 <div className="flex w-full overflow-x-auto border-b border-border bg-card px-2 no-scrollbar">
 {ATTENDANCE_TABS.map((t, mapIndex) => (
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`whitespace-nowrap px-5 py-3.5 text-sm font-medium motion-safe:transition-all border-b-2 ${
 tab === t 
 ? 'text-primary bg-primary-subtle border-primary font-semibold' 
 : 'border-transparent text-text-secondary hover:text-primary'
 } motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_attendance-attendance-managerattendancetoolbar-button-primary-${mapIndex}`} 
 key={t} 
 onClick={() => setTab(t)}
 
  type="button">
 {t}
 </button>
 ))}
 </div>
  <div className="p-4 flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between w-full">
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center flex-1 min-w-0">
    <div className="relative w-full sm:w-auto sm:min-w-[220px]">
      <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"/>
      <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-9 pr-3 py-2 border border-border bg-input text-text-primary rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-full"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_attendance-attendance-toolbar-input-value" 
        value={localSearch} 
        onChange={e => setLocalSearch(e.target.value)} 
        placeholder={t("TEXT_SEARCH_TAB", { value: tab.toLowerCase() })} 
        
       aria-label={t("TEXT_SEARCH_TAB", { value: tab.toLowerCase() })}/>
    </div>
    
    <div className="w-full sm:w-auto">
      <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-2 border border-border bg-input text-text-primary rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-full"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_attendance-attendance-toolbar-input-date"
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
        
       aria-label={t("TEXT_FILTER_ATTENDANCE_DATE")}/>
    </div>
    
    <div className="w-full sm:w-auto z-30">
      <ManagerSearchableDropdown dataTestId="manager_attendance-managerattendancetoolbar-managersearchabledropdown-1"
        value={statusFilter || MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ALL_FILTER}
        onChange={(v) => setStatusFilter(String(v) === MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ALL_FILTER ? '' : String(v))}
        options={[{label: t("COPY_ALL_STATUS"), value: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ALL_FILTER}, {label: t("COPY_PRESENT_2"), value: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.PRESENT_DISPLAY}, {label: t("COPY_ABSENT_2"), value: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.ABSENT_DISPLAY}, {label: t("COPY_LATE"), value: MANAGER_ATTENDANCE_TRACKING_STATUS_VALUES.LATE}]}
        placeholder={t("COPY_STATUS_1")}
       data-testid="manager_attendance-managerattendancetoolbar-searchable-dropdown-1"/>
    </div>
    
    <div className="w-full sm:w-40 z-30">
      <ManagerSearchableDropdown dataTestId="manager_attendance-managerattendancetoolbar-range-dropdown"
        value={range}
        onChange={(v) => setRange(String(v))}
        options={[
          { label: 'This Month', value: 'this_month' },
          { label: 'Last Month', value: 'last_month' },
          { label: 'Last 3 Months', value: 'last_3_months' },
          { label: 'This Year', value: 'this_year' },
          { label: 'Custom', value: 'custom' },
        ]}
        placeholder="Period"
        ariaLabel="Attendance period filter"
      />
    </div>
    </div>

    <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto xl:ml-auto">
 <button data-testid="manager_attendance-attendance-toolbar-load-all" 
 type="button"
 aria-label={t("COPY_REFRESH_ATTENDANCE")}
 onClick={loadAll} 
 className="min-h-11 min-w-11 flex justify-center items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-text-secondary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
 >
 <RefreshCw size={18} strokeWidth={2} />
 </button>
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex justify-center items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-info-bg text-info-text motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_attendance-attendance-toolbar-button-export" 
 onClick={() => exportAttendance && exportAttendance()} 
 
  type="button">
 <Download size={18} strokeWidth={2}/>{t("COPY_EXPORT")}</button>
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-on-primary hover:bg-primary-hover rounded-lg motion-safe:transition-all hover:opacity-90 motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_attendance-attendance-toolbar-button-add" 
 onClick={() => setShowModal(true)} 
  
  type="button">
 <Plus size={18} strokeWidth={2}/>{t("COPY_MARK_ATTENDANCE")}</button>
 </div>
 </div>
 </div>
 );
}

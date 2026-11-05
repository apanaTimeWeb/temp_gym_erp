// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewDateFilterDropdown within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Pure View component for the Dashboard date filter dropdown, consuming its local hook.
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { DASHBOARD_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_filter.constants';
import { useSuperadminDashboardOverviewDateFilter } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewDateFilter';



/**
 * @description Pure View component for the Dashboard date filter dropdown, consuming its local hook.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminDashboardOverviewDateFilterDropdown() {
  const t = useTranslations('superadmin_dashboard');
    const { value, customStart, customEnd, handlePresetChange, handleCustomDateChange } = useSuperadminDashboardOverviewDateFilter();
    return (<div className="flex items-center gap-2 flex-wrap">
      <div className="w-48 bg-floating border border-border rounded-lg shadow-card shrink-0">
        <SearchableDropdown data-testid="superadmin_dashboard-superadmin-dashboard-date-filter-dropdown-filter-dropdown-SearchableDropdown-20" options={DASHBOARD_DATE_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={value} onChange={(val) => handlePresetChange(String(val))} className="bg-transparent border-transparent"/>
      </div>

      {value === 'custom' && (<div className="flex items-center gap-2 bg-floating border border-border rounded-lg shadow-card px-3 py-2 shrink-0">
          <label htmlFor="superadmin_dashboard-custom-start-date" className="sr-only">{t('ui.custom_start_date_v3')}</label>
          <input  id="superadmin_dashboard-custom-start-date" type="date" value={customStart} onChange={(e) => handleCustomDateChange('start', e.target.value)} className="min-h-11 bg-input text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin-dashboard-custom-start-date"/>
          <span className="text-secondary text-sm font-medium">{t('ui.to_ad82f63')}</span>
          <label htmlFor="superadmin_dashboard-custom-end-date" className="sr-only">{t('ui.custom_end_date_v3')}</label>
          <input  id="superadmin_dashboard-custom-end-date" type="date" value={customEnd} onChange={(e) => handleCustomDateChange('end', e.target.value)} className="min-h-11 bg-input text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page custom-date-input motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin-dashboard-custom-end-date"/>
        </div>)}
    </div>);
}

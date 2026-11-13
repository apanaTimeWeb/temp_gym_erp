// RESPONSIBILITY: Renders/orchestrates SuperadminGymsToolbar within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsToolbar owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminGymsDirectoryToolbar, useTranslations.
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory_filter.constants, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryToolbar
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the search toolbar for the Gyms table.

import { Search, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_GYMS_PLAN_FILTER_OPTIONS, SUPERADMIN_GYMS_STATUS_SELECT_OPTIONS, SUPERADMIN_GYMS_VIEW_MODE_OPTIONS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory_filter.constants';
import { useSuperadminGymsDirectoryToolbar } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryToolbar';


/**
 * @description Renders GymsToolbar within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryToolbar() {
  const t = useTranslations('superadmin_gyms');
    const { search, handleSearchChange, statusFilter, setStatusFilter, planFilter, setPlanFilter, viewMode, setViewMode, handleExportGyms } = useSuperadminGymsDirectoryToolbar();
    return (<div className="p-4 border-b border-border flex items-center gap-4 flex-wrap">
      <div className="relative flex-1 max-w-md">
        <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-disabled"/>
        <input type="text" placeholder={t('ui.search_gyms_by_name_or_owner_2dbd814f')} value={search} onChange={(e) => handleSearchChange(e.target.value)} className="min-h-11 w-full bg-card border border-border text-primary rounded-lg ps-10 pe-4 py-2 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.search_gyms_a5d3597f')} data-testid="superadmin_gyms-superadmin-gyms-toolbar-gyms-toolbar-search-gyms"/>
      </div>
      <select aria-label={t('ui.filter_by_status_aria')} value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="min-h-11 px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-primary" data-testid="superadmin_gyms-superadmin-gyms-toolbar-superadmin-gyms-toolbar-select">
        {SUPERADMIN_GYMS_STATUS_SELECT_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="superadmingymstoolbar-option-2836">{t(option.labelKey)}</option>)}
      </select>
      <select aria-label={t('ui.filter_by_plan_aria')} value={planFilter} onChange={e => setPlanFilter(e.target.value)} className="min-h-11 px-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-card text-primary" data-testid="superadmin_gyms-superadmin-gyms-toolbar-gyms-toolbar-select-2">
        {SUPERADMIN_GYMS_PLAN_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value} data-testid="superadmingymstoolbar-option-3301">{t(option.labelKey)}</option>)}
      </select>
      
      <div className="flex bg-input border border-border rounded-lg p-1">
        {SUPERADMIN_GYMS_VIEW_MODE_OPTIONS.map((option) => (
          <button type="button" key={option.value} onClick={() => setViewMode(option.value)} aria-pressed={viewMode === option.value} className={`min-h-11 px-3 py-1.5 text-sm rounded-md motion-safe:transition-colors ${viewMode === option.value ? 'bg-page text-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-page'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`} data-testid={`gyms-superadmin-gyms-toolbar-${option.value}`}>
            {t(option.labelKey)}
          </button>
        ))}
      </div>

      <button type="button" onClick={handleExportGyms} className="flex min-h-11 items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-primary bg-card hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" title={t('ui.export_gyms_as_csv_cd1490d9')} data-testid="superadmin_gyms-superadmin-gyms-toolbar-export-gyms-as-csv">
        <Download size={18}/> {t('ui.export_0095a9fa')}</button>
    </div>);
}

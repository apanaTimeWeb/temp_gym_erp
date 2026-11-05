"use client";
// RESPONSIBILITY: Owns search, branch-status filtering, and analytics date-range controls for the Admin Branches list.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryToolbar → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/toolbar/AdminGymsBranchesDirectoryToolbar.tsx)

import { useTranslations } from 'next-intl';
import { Calendar, Search, ShieldCheck } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryLogic';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/searchable_dropdown/AdminGymsBranchesDirectorySearchableDropdown';
import { BRANCH_STATUS_OPTIONS, BRANCH_TIME_RANGE_OPTIONS } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryConstants';

/**
 * AdminGymsBranchesDirectoryToolbar renders the admin branches toolbar UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryToolbar: Owns search, branch-status filtering, and analytics date-range controls for the Admin Branches list.
 * @dependencies Consumes useAdminBranchesLogic, AdminNavigationLayoutSearchableDropdown, AdminBranchesConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryToolbar() {
  const t = useTranslations();

  const { search, setSearch, statusFilter, setStatusFilter, timeRange, setTimeRange, startDate, setStartDate, endDate, setEndDate } = useAdminBranchesLogic();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-subtle">
            <Calendar className="h-5 w-5 text-primary" aria-hidden="true"  size={18} strokeWidth={2}/>
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">{t('branches.admin_branches_toolbar.text_b6d6b08977')}</h2>
            <span className="mt-0.5 flex items-center gap-1 text-xs text-secondary">
              <ShieldCheck size={18} className="text-success" aria-hidden="true"  strokeWidth={2}/> {t('branches.admin_branches_toolbar.text_377d867c5c')}</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          <div className="relative min-w-0 flex-1 sm:w-72">
            <label htmlFor="admin_branches-search" className="sr-only">{t('branches.admin_branches_toolbar.text_ab2f8364dc')}</label>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center"><Search size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/></span>
            <input id="admin_branches-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('branches.admin_branches_toolbar.text_a51f2fb3bd')} className="min-h-11 w-full rounded-lg border border-border bg-input pl-9 pr-3 text-sm text-primary placeholder:text-secondary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="admin_branches-admin_branches-toolbar-search"/>
          </div>
          <div className="w-full sm:w-44">
            <label htmlFor="admin_branches-status" className="sr-only">{t('branches.admin_branches_toolbar.text_1f1f8bfdd5')}</label>
            <AdminNavigationLayoutSearchableDropdown options={BRANCH_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))} value={statusFilter} onChange={(value) => setStatusFilter(value as typeof statusFilter)} placeholder={t('branches.admin_branches_toolbar.text_9cb29e734a')}  testId="admin_branches-admin_branches-toolbar-control"/>
          </div>
          <div className="w-full sm:w-44">
            <label htmlFor="admin_branches-range" className="sr-only">{t('branches.admin_branches_toolbar.text_a1c4a4c55b')}</label>
            <AdminNavigationLayoutSearchableDropdown options={BRANCH_TIME_RANGE_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))} value={timeRange} onChange={(value) => setTimeRange(value as typeof timeRange)} placeholder={t('branches.admin_branches_toolbar.text_119c12c518')}  testId="admin_branches-admin_branches-toolbar-control-2"/>
          </div>
        </div>
      </div>

      {timeRange === 'custom' && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <label htmlFor="admin_branches-start-date" className="text-sm font-medium text-secondary">{t('branches.admin_branches_toolbar.text_c4d63e4c56')}</label>
          <input id="admin_branches-start-date" type="date" className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page" value={startDate} onChange={(event) => setStartDate(event.target.value)}  data-testid="admin_branches-admin_branches-toolbar-control-3"/>
          <label htmlFor="admin_branches-end-date" className="text-sm font-medium text-secondary">{t('branches.admin_branches_toolbar.text_7e7fbc8110')}</label>
          <input id="admin_branches-end-date" type="date" className="min-h-11 rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)}  data-testid="admin_branches-admin_branches-toolbar-control-4"/>
        </div>
      )}
    </div>
  );
}

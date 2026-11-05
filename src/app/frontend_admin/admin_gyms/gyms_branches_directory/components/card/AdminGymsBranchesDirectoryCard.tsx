"use client";
// RESPONSIBILITY: Renders filtered branch records as KPI cards and opens the module-owned detail drawer for the selected view.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryCard → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/card/AdminGymsBranchesDirectoryCard.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { Building2, TrendingUp, TrendingDown, Users, Activity, ChevronRight } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryLogic';
import { AdminBranchesFormatCurrency } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/utils/AdminGymsBranchesDirectoryFormatCurrency';

import AdminBranchesCardSkeleton from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/card/AdminGymsBranchesDirectoryCardSkeleton';
import AdminBranchesEmptyState from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/empty_state/AdminGymsBranchesDirectoryEmptyState';
import { BRANCH_STATUS_LABEL_KEYS, BRANCH_STATUS_STYLES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryConstants';

/**
 * AdminGymsBranchesDirectoryCard renders the admin branches card UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryCard: Renders filtered branch records as KPI cards and opens the module-owned detail drawer for the selected view.
 * @dependencies Consumes useAdminBranchesLogic, AdminBranchesFormatCurrency, AdminBranchesCardSkeleton, AdminBranchesEmptyState, AdminBranchesConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryCard() {
  const locale = useLocale();
  const t = useTranslations();

  const { branches, isPending, isError, openDetail, clearFilters, retry } = useAdminBranchesLogic();

  if (isPending) return <AdminBranchesCardSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-bg"><Building2 size={18} className="text-danger" aria-hidden="true"  strokeWidth={2}/></div>
        <p className="text-sm font-medium text-primary">{t('branches.admin_branches_card.text_6a5638d4a1')}</p>
        <p className="text-xs text-secondary">{t('branches.admin_branches_card.text_36f1f2dde6')}</p>
        <button type="button" onClick={() => void retry()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_branches-admin_branches-card-control">{t('branches.admin_branches_card.text_9f5cd8a2e8')}</button>
      </div>
    );
  }

  if (!branches.length) return <AdminBranchesEmptyState onClearFilters={clearFilters} />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {branches.map((branch , __testIdIndex42) => (
        <div key={branch.id} className="rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-shadow motion-safe:duration-base hover:shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary"><Building2 size={18} aria-hidden="true"  strokeWidth={2}/></div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-tight text-primary">{branch.name}</h3>
              <p className="mt-1 text-sm text-secondary">{branch.location}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => openDetail(branch, 'revenue')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-border hover:bg-success-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_branches-admin_branches-card-control-2-map42-${__testIdIndex42}-1`}>
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><TrendingUp size={18} className="text-success" aria-hidden="true"  strokeWidth={2}/> {t('branches.admin_branches_card.text_35cf82f9d2')}</span>
              <div className="font-bold text-primary motion-safe:transition-colors motion-safe:duration-base group-hover:text-success">{AdminBranchesFormatCurrency(branch.revenue, undefined, locale)}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-success"><span>{t('branches.admin_branches_card.text_badd385121')}</span><ChevronRight size={18} aria-hidden="true"  strokeWidth={2}/></span>
            </button>
            <button type="button" onClick={() => openDetail(branch, 'expenses')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-border hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_branches-admin_branches-card-control-3-map42-${__testIdIndex42}-2`}>
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><TrendingDown size={18} className="text-danger" aria-hidden="true"  strokeWidth={2}/> {t('branches.admin_branches_card.text_8d437dbf95')}</span>
              <div className="font-bold text-primary motion-safe:transition-colors motion-safe:duration-base group-hover:text-danger">{AdminBranchesFormatCurrency(branch.expenses, undefined, locale)}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-danger"><span>{t('branches.admin_branches_card.text_badd385121')}</span><ChevronRight size={18} aria-hidden="true"  strokeWidth={2}/></span>
            </button>
            <button type="button" onClick={() => openDetail(branch, 'students')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-border hover:bg-warning-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_branches-admin_branches-card-control-4-map42-${__testIdIndex42}-3`}>
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><Users size={18} className="text-warning" aria-hidden="true"  strokeWidth={2}/> {t('branches.admin_branches_card.text_fcfac3efb6')}</span>
              <div className="font-bold text-primary motion-safe:transition-colors motion-safe:duration-base group-hover:text-warning">{branch.studentsCount}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-warning"><span>{t('branches.admin_branches_card.text_badd385121')}</span><ChevronRight size={18} aria-hidden="true"  strokeWidth={2}/></span>
            </button>
            <button type="button" onClick={() => openDetail(branch, 'staff')} className="group rounded-xl border border-transparent bg-input p-3 text-left hover:border-focus hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_branches-admin_branches-card-control-5-map42-${__testIdIndex42}-4`}>
              <span className="mb-1 flex items-center gap-1.5 text-xs font-medium text-secondary"><Activity size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/> {t('branches.admin_branches_card.text_a4730a22cf')}</span>
              <div className="font-bold text-primary">{branch.staffCount}</div>
              <span className="mt-1 flex items-center gap-0.5 text-xs text-primary"><span>{t('branches.admin_branches_card.text_badd385121')}</span><ChevronRight size={18} aria-hidden="true"  strokeWidth={2}/></span>
            </button>
          </div>
          <div className="mt-5 space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between gap-3">
              <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider ${BRANCH_STATUS_STYLES[branch.status]}`} data-testid="branches-directory-branches-directory-card-status-badge">{t(BRANCH_STATUS_LABEL_KEYS[branch.status])}</span>
              <span className="text-xs font-medium text-secondary">{t('branches.admin_branches_card.text_d789a1e992')}{branch.id.toUpperCase()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

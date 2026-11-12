"use client";
// RESPONSIBILITY: Renders the selected branch detail drawer from TanStack Query server state, including loading, empty, error, retry, and view-specific states.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryDetailDrawer → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/detail_drawer/AdminGymsBranchesDirectoryDetailDrawer.tsx)

import { useTranslations } from 'next-intl';
import { Building2, TrendingUp, TrendingDown, Users, Activity, X, RefreshCw } from 'lucide-react';
import { useAdminBranchesLogic } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryLogic';
import { BRANCH_DETAIL_TITLES, BRANCH_PAYMENT_METHOD_STYLES, BRANCH_STATUS_STYLES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryConstants';
import { AdminBranchesFormatCurrency } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/utils/AdminGymsBranchesDirectoryFormatCurrency';
import { useAdminBranchesDetailDrawerKeyboard } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryDetailDrawerKeyboard';

import type { DetailView } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryUiTypes';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';

import AdminBranchesDetailContent from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/detail_content/AdminGymsBranchesDirectoryDetailContent';
import AdminBranchesDetailLoading from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/detail_loading/AdminGymsBranchesDirectoryDetailLoading';

/**
 * AdminGymsBranchesDirectoryDetailDrawer renders the admin branches detail drawer UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryDetailDrawer: Renders the selected branch detail drawer from TanStack Query server state, including loading, empty, error, retry, and view-specific states.
 * @dependencies Consumes AdminNavigationLayoutBackendMessage, useAdminBranchesLogic, AdminBranchesConstants, AdminBranchesFormatCurrency, AdminBranchesUiTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryDetailDrawer() {
  const t = useTranslations();

  const {
    selectedBranch: branch,
    detailView,
    closeDetail,
    detailStatus,
    detailError,
    retryDetail,
  } = useAdminBranchesLogic();

  useAdminBranchesDetailDrawerKeyboard(Boolean(branch && detailView), closeDetail);

  if (!branch || !detailView) return null;

  return (
    <>
      <button type="button" aria-label={t('branches.admin_branches_detail_drawer.text_cf7fcd62b8')} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out fixed inset-0 z-40 cursor-default bg-overlay backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" onClick={closeDetail}  data-testid="admin_branches-admin_branches-detail-drawer-control"/>
      <aside role="dialog" aria-modal="true" aria-labelledby="admin_branches-detail-title" className="fixed right-0 top-0 z-40 flex h-full w-full max-w-lg flex-col border-l border-border bg-overlay shadow-dialog" data-testid="admin_branches-admin_branches-detail-drawer-control-2">
        <div className="shrink-0 flex items-center justify-between border-b border-border p-5">
          <div className="min-w-0">
            <h2 id="admin_branches-detail-title" className="text-lg font-bold text-primary">{t(BRANCH_DETAIL_TITLES[detailView].labelKey)}</h2>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-secondary"><Building2 size={18} aria-hidden="true"  strokeWidth={2}/> {branch.name}</p>
          </div>
          <button type="button" onClick={closeDetail} aria-label={t('branches.admin_branches_detail_drawer.text_cf7fcd62b8')} className="min-h-11 min-w-11 rounded-lg bg-input p-2 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="admin_branches-admin_branches-detail-drawer-control-3">
            <X size={18} className="mx-auto text-secondary" aria-hidden="true"  strokeWidth={2}/>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-5">
          {detailStatus === 'pending' && <AdminBranchesDetailLoading />}
          {detailStatus === 'error' && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-input px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-bg" data-testid="admin_branches-adminbranchesdetaildrawer-status-1"><TrendingDown size={18} className="text-danger" aria-hidden="true"  strokeWidth={2}/></div>
              <h3 className="mt-4 text-sm font-semibold text-primary">{t('branches.admin_branches_detail_drawer.text_c43f7b7c3a')}</h3>
              <p className="mt-1 text-xs text-secondary">{t('branches.admin_branches_detail_drawer.auto_c531903b50')}</p>
              <button type="button" onClick={() => void retryDetail()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_branches-admin_branches-detail-drawer-control-4">
                <RefreshCw size={18} aria-hidden="true"  strokeWidth={2}/> {t('branches.admin_branches_detail_drawer.text_9f5cd8a2e8')}</button>
            </div>
          )}
          {detailStatus === 'success' && <AdminBranchesDetailContent branch={branch} view={detailView} />}
        </div>
      </aside>
    </>
  );
}

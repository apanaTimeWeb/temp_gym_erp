"use client";
// RESPONSIBILITY: Renders the loading skeleton for the selected Admin branch detail section.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryDetailLoading → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/detail_loading/AdminGymsBranchesDirectoryDetailLoading.tsx)

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
/**
 * AdminGymsBranchesDirectoryDetailLoading renders the admin branches detail loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryDetailLoading: Renders the loading skeleton for the selected Admin branch detail section.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryDetailLoading() {
  const t = useTranslations();
  return (
    <div className="space-y-3" aria-live="polite" aria-label={t('branches.admin_branches_detail_loading.text_loading_branch_details')} data-testid="admin_branches-admin_branches-detail-loading-loading">
      {['detail-1', 'detail-2', 'detail-3', 'detail-4'].map((item) => <div key={item} className="h-20 rounded-xl border border-border bg-input motion-safe:animate-pulse motion-safe:duration-base" />)}
    </div>
  );
}

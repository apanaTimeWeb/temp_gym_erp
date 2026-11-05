"use client";
// RESPONSIBILITY: Renders the feature-owned empty state when branch filters produce no visible records.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryEmptyState → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/empty_state/AdminGymsBranchesDirectoryEmptyState.tsx)

import type { AdminBranchesEmptyStateProps } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryEmptyStatePropsTypes';
import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';


/**
 * AdminGymsBranchesDirectoryEmptyState renders the admin branches empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryEmptyState: Renders the feature-owned empty state when branch filters produce no visible records.
 * @dependencies Consumes AdminBranchesEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryEmptyState({ onClearFilters }: AdminBranchesEmptyStateProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-subtle">
        <Building2 size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/>
      </div>
      <h3 className="mt-4 text-base font-semibold text-primary">{t('branches.admin_branches_empty_state.text_ca43a19c5d')}</h3>
      <p className="mt-1 max-w-md text-sm text-secondary">{t('branches.admin_branches_empty_state.text_62a18fb502')}</p>
      <button
        type="button"
        onClick={onClearFilters}
        className="mt-5 min-h-11 rounded-lg border border-border bg-input px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95"
       data-testid="admin_branches-admin_branches-empty-state-state">
        {t('branches.admin_branches_empty_state.text_412226715c')}</button>
    </div>
  );
}

"use client";
// RESPONSIBILITY: Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryHeaderSelector → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/header_selector/AdminGymsBranchesDirectoryHeaderSelector.tsx)

import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/searchable_dropdown/AdminGymsBranchesDirectorySearchableDropdown';
import { useAdminBranchesHeaderSelector } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/hooks/useAdminGymsBranchesDirectoryHeaderSelector';

/**
 * AdminGymsBranchesDirectoryHeaderSelector renders the branch-scope selector without directly owning API access.
 * @remarks Business query state and URL mutations are delegated to useAdminBranchesHeaderSelector.
 * @description AdminGymsBranchesDirectoryHeaderSelector: Renders only the authenticated shell's branch-scope selector. Branch data and URL interaction remain in the feature hook.
 * @dependencies Consumes AdminNavigationLayoutSearchableDropdown, useAdminBranchesHeaderSelector.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryHeaderSelector() {
  const t = useTranslations();
  const { branchOptions, selectedBranchId, handleChange, status, retry } = useAdminBranchesHeaderSelector();
  return (
    <div className="hidden lg:flex items-center gap-2 bg-header border border-border rounded-lg px-3 py-1.5">
      <Building2 size={18} strokeWidth={2} className="text-secondary shrink-0" aria-hidden="true" />
      {status === 'pending' ? <span role="status" className="text-xs text-secondary" data-testid="branches-directory-branches-directory-header-selector-status-region">{t('admin_branches_header_selector.loading')}</span> : status === 'error' ? <span role="alert" className="text-xs text-danger"><span>{t('admin_branches_header_selector.error')}</span> <button type="button" onClick={() => void retry()} className="underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="branches-directory-branches-directory-header-selector-retry">{t('admin_branches_header_selector.retry')}</button></span> : <AdminNavigationLayoutSearchableDropdown
        options={branchOptions}
        value={selectedBranchId}
        onChange={handleChange}
        className="w-52"
        placeholder={t('branches.admin_branches_header_selector.text_fcf716ea9b')}
        testId="admin_branches-admin_branches-header-selector-select"
      />}
    </div>
  );
}

"use client";
// RESPONSIBILITY: Empty state for the Blacklist table.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementEmptyState → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/empty_state/AdminMembersBlacklistManagementEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { Ban } from 'lucide-react';
import { useAdminBlacklistLogic } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementLogic';

/**
 * AdminMembersBlacklistManagementEmptyState renders the admin blacklist empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementEmptyState: Empty state for the Blacklist table.
 * @dependencies Consumes useAdminBlacklistLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementEmptyState() {
  const t = useTranslations();

  const { openAdd } = useAdminBlacklistLogic();
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-danger-bg flex items-center justify-center">
        <Ban size={18} className="text-danger"  strokeWidth={2}/>
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-primary">{t('blacklist.admin_blacklist_empty_state.text_209fc8147a')}</p>
        <p className="text-sm text-secondary mt-1">{t('blacklist.admin_blacklist_empty_state.text_c92ec0d993')}</p>
      </div>
      <button type="button" onClick={openAdd} className="px-4 py-2 bg-danger text-on-danger rounded-lg text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid="admin_blacklist-admin_blacklist-empty-state-state">
        {t('blacklist.admin_blacklist_empty_state.text_e0b464e57f')}</button>
    </div>
  );
}

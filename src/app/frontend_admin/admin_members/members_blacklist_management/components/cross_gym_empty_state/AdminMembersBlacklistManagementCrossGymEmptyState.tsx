"use client";
// RESPONSIBILITY: Renders the empty state for cross-gym blacklist records.
// DATA FLOW: feature data/state and user input → AdminMembersBlacklistManagementCrossGymEmptyState → accessible UI/events routed to owning hooks (admin_blacklist/blacklist_management/components/cross_gym_empty_state/AdminMembersBlacklistManagementCrossGymEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { Ban } from 'lucide-react';

/**
 * AdminMembersBlacklistManagementCrossGymEmptyState renders the admin blacklist cross gym empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersBlacklistManagementCrossGymEmptyState: Renders the empty state for cross-gym blacklist records.
 * @dependencies Consumes the owning feature contract.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersBlacklistManagementCrossGymEmptyState() {
  const t = useTranslations();
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center" data-testid="admin_blacklist-admin_blacklist-cross-gym-empty-state-state">
    <Ban size={18} aria-hidden="true" className="text-secondary"  strokeWidth={2}/>
    <h3 className="text-base font-semibold text-primary">{t('blacklist.admin_blacklist_cross_gym_empty_state.text_no_gym_bans')}</h3>
    <p className="text-sm text-secondary">{t('blacklist.admin_blacklist_cross_gym_empty_state.text_no_members')}</p>
  </div>;
}

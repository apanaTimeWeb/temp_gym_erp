"use client";
// RESPONSIBILITY: Renders the empty state for Admin Members when no results match filters.
// DATA FLOW: feature data/state and user input → AdminMembersDirectoryEmptyState → accessible UI/events routed to owning hooks (admin_members/members_directory/components/empty_state/AdminMembersDirectoryEmptyState.tsx)

import { useTranslations } from 'next-intl';

import { Users } from 'lucide-react';

import type { AdminMembersEmptyStateProps } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryEmptyStatePropsTypes';


/**
 * AdminMembersDirectoryEmptyState renders the admin members empty state UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminMembersDirectoryEmptyState: Renders the empty state for Admin Members when no results match filters.
 * @dependencies Consumes AdminMembersEmptyStatePropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminMembersDirectoryEmptyState({ hasFilters }: AdminMembersEmptyStateProps) {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4" data-testid="admin_members-admin_members-empty-state-state">
      <div className="w-16 h-16 rounded-2xl bg-input flex items-center justify-center border border-border">
        <Users size={18} className="text-secondary"  strokeWidth={2}/>
      </div>
      <div>
        <p className="text-base font-semibold text-primary">
          {hasFilters ? t('members.admin_members_empty_state.auto_3b3dc4e403') : t('members.admin_members_empty_state.auto_cfa1045651')}
        </p>
        <p className="text-sm text-secondary mt-1">
          {hasFilters ? t('members.admin_members_empty_state.auto_ba33d5371f') : t('members.admin_members_empty_state.auto_fe81c1cadb')}
        </p>
      </div>
    </div>
  );
}

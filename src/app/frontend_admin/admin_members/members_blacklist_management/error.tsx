"use client";
// RESPONSIBILITY: Error boundary for Admin Blacklist page. Handles 403 permission-denied separately from generic errors.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_blacklist/blacklist_management/error.tsx)

import AdminNavigationLayoutErrorFallback from '@/app/frontend_admin/admin_members/members_blacklist_management/components/AdminMembersBlacklistManagementErrorFallback';
import type { AdminBlacklistErrorProps } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementErrorPropsTypes';

/**
 * BlacklistError is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function BlacklistError({ error, reset }: AdminBlacklistErrorProps) {
  return <AdminNavigationLayoutErrorFallback error={error} reset={reset} moduleName="Blacklist" />;
}

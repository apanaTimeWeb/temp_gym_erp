// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// RESPONSIBILITY: Orchestrates profile query state and profile/password mutations. Form drafts remain local to the RHF-owned view layer.
// DATA FLOW: ManagerProfileAndSecurityApi → TanStack Query → ManagerProfileAndSecurityMain; form submit → mutation → cache invalidation
/** Coordinates the Manager / feature. */
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { resolveManagerProfileAndSecurityView } from '@/app/frontend_manager/manager_dashboard/profile_and_security/utils/ManagerProfileAndSecurityResolveView';
import { useManagerProfileAndSecurityMutations } from '@/app/frontend_manager/manager_dashboard/profile_and_security/hooks/useManagerProfileAndSecurityMutations';
import { useManagerProfileAndSecurityQuery } from '@/app/frontend_manager/manager_dashboard/profile_and_security/hooks/useManagerProfileAndSecurityQueries';
import type { ManagerProfileAndSecurityTab } from '@/app/frontend_manager/manager_dashboard/profile_and_security/types/manager_profile_and_security.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates profile feature state and its documented UI/API boundary through useManagerProfileAndSecurityLogic.
 * @dependencies Uses useManagerProfileAndSecurityMutations, useManagerProfileAndSecurityQueries, ManagerProfileAndSecurityTypes.
 * @edge-case preserves explicit loading state until the query or mutation settles.
 */
export function useManagerProfileAndSecurityLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedView = searchParams.get('view') ?? searchParams.get('tab');
  const activeTab: ManagerProfileAndSecurityTab = resolveManagerProfileAndSecurityView(requestedView);
  const setActiveTab = useCallback((view: ManagerProfileAndSecurityTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', view);
    params.delete('tab');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const profileQuery = useManagerProfileAndSecurityQuery();
  const { profileMutation, passwordMutation } = useManagerProfileAndSecurityMutations();
  const user = profileQuery.data?.data ?? null;
  const displayInitial = (user?.avatarInitial || user?.name || 'M').charAt(0).toUpperCase();

  return {
    activeTab, setActiveTab, user, displayInitial,
    profileQuery, profileMutation, passwordMutation,
    saving: profileMutation.isPending || passwordMutation.isPending };
}

"use client";
// RESPONSIBILITY: Owns the Branches feature query and branchId URL interaction used by the authenticated shell selector.
// DATA FLOW: Branch selector UI → local/URL selection state → branch-reference API/query → selected branch rendered in the Admin shell.

import { ADMIN_BRANCHES_QUERY_KEYS } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryQueryKeys';
import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AdminBranchesApi } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/api/admin_gyms_branches_directory_api';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';
/** @description useAdminBranchesHeaderSelector: Owns the Branches feature query and branchId URL interaction used by the authenticated shell selector. @dependencies Consumes AdminBranchesQueryKeys, AdminBranchesApi, AdminBranchesTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminBranchesHeaderSelector() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const branchesQuery = useQuery({
    queryKey: ADMIN_BRANCHES_QUERY_KEYS.key('header-selector'),
    queryFn: () => AdminBranchesApi.fetchBranches(),
    staleTime: 5 * 60 * 1000,
  });
  const branchesResponse = branchesQuery.data;
  const branches: Branch[] = Array.isArray(branchesResponse?.data) ? branchesResponse.data : [];
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const branchOptions = useMemo(() => [
    { value: 'all', label: t('branches.AdminAuditRepair.allBranchesAggregate') },
    ...branches.map((branch) => ({ value: branch.id, label: branch.name })),
  ], [branches, t]);
  const handleChange = useCallback((value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    const next = String(value);
    if (next === 'all') params.delete('branchId');
    else params.set('branchId', next);
    params.delete('page');
    const search = params.toString();
    router.replace(`${pathname}${search ? `?${search}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);
  return { branchOptions, selectedBranchId, handleChange, status: branchesQuery.status, error: branchesQuery.error, retry: branchesQuery.refetch };
}

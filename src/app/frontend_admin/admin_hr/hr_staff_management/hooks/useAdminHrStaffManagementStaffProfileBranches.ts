"use client";
// RESPONSIBILITY: Loads Admin branch reference data used by the HR staff profile assignment table.
// DATA FLOW: AdminBranchesApi → TanStack Query → HR profile view.

import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementQueryKeys';
import { useQuery } from '@tanstack/react-query';
import type { AdminHrBranchReference } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementBranchReferenceTypes';
import { AdminHrBranchReferenceApi } from '@/app/frontend_admin/admin_hr/hr_staff_management/api/admin_hr_staff_management_branch_reference_api';
/** @description useAdminHrStaffProfileBranches: Loads Admin branch reference data used by the HR staff profile assignment table. @dependencies Consumes AdminHrQueryKeys, AdminHrBranchReferenceTypes, AdminHrBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @param enabled - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminHrStaffProfileBranches(enabled: boolean){
  return useQuery<AdminHrBranchReference[]>({
    queryKey: ADMIN_HR_QUERY_KEYS.key('branch-reference'),
    queryFn: () => AdminHrBranchReferenceApi.fetchHrBranchReferences().then((response)=>response.data?.items??[]),
    enabled,
    staleTime: 1000 * 60 * 10,
  });
}

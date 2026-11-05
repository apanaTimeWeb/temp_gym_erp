"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin hr UI without cross-module imports.
// DATA FLOW: AdminHrBranchReferenceApi → TanStack Query → Admin hr component.

import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminHrBranchReferenceApi } from '@/app/frontend_admin/admin_hr/hr_staff_management/api/admin_hr_staff_management_branch_reference_api';
/** @description useAdminHrBranchReference: Provides minimal branch options to the Admin hr UI without cross-module imports. @dependencies Consumes AdminHrQueryKeys, AdminHrBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminHrBranchReference() {
  return useQuery({ queryKey: ADMIN_HR_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminHrBranchReferenceApi.fetchHrBranchReferences()).data?.items ?? [], staleTime: 300000 });
}

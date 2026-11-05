"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin members UI without cross-module imports.
// DATA FLOW: AdminMembersBranchReferenceApi → TanStack Query → Admin members component.

import { ADMIN_MEMBERS_QUERY_KEYS } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminMembersBranchReferenceApi } from '@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_branch_reference_api';
/** @description useAdminMembersBranchReference: Provides minimal branch options to the Admin members UI without cross-module imports. @dependencies Consumes AdminMembersQueryKeys, AdminMembersBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminMembersBranchReference() {
  return useQuery({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('branch-reference'), queryFn: async () => { const response = await AdminMembersBranchReferenceApi.fetchMemberBranchReferences(); if (!response.data?.items) throw new Error('Branch reference response is missing items'); return response.data.items; }, staleTime: 300000 });
}

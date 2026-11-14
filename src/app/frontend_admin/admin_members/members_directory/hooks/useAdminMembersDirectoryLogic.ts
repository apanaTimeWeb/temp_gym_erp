"use client";
import { normalizeAdminMembersDirectoryUrlPage } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryUrlPage';
// RESPONSIBILITY: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member.
// DATA FLOW: Mock API → useAdminMembersLogic → AdminMembersMain → child components

import { ADMIN_MEMBERS_QUERY_KEYS } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryQueryKeys';

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/members_directory/state/useAdminMembersDirectoryStore';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryUrlQuerySync';
import { ADMIN_MEMBERS_ITEMS_PER_PAGE, MEMBER_STATUS_VALUES } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { AdminMembersStatusFilter, AdminMember } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
import { useAdminMembersDebounce } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryDebounce';
import { useAdminMembersExport } from '@/app/frontend_admin/admin_members/members_directory/hooks/useAdminMembersDirectoryExport';
import { AdminMembersApi } from '@/app/frontend_admin/admin_members/members_directory/api/admin_members_directory_api';
import type { FetchMembersParams } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryApiQueryTypes';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
/** @description useAdminMembersLogic: Data logic hook for Admin Members. Fetches members + summary, applies filters, manages selected member. @dependencies Consumes AdminMembersQueryKeys, useAdminMembersStore, useAdminNavigationLayoutUrlQuerySync, AdminMembersConstants, AdminMembersTypes, feature-local debounce. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminMembersLogic() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { search, statusFilter, branchFilter, expiryFilter, expiryFrom, expiryTo, genderFilter, planFilter, currentPage, setCurrentPage } = useAdminMembersStore();
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => useAdminMembersStore.getState().setSearch(val as string) },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => { if (val === 'all' || Object.values(MEMBER_STATUS_VALUES).some((status) => status === val)) useAdminMembersStore.getState().setStatusFilter(val as AdminMembersStatusFilter); } },
    { key: 'branch', value: branchFilter, defaultValue: 'all', setValue: (val) => useAdminMembersStore.getState().setBranchFilter(val as string) },
    { key: 'expiry', value: expiryFilter, defaultValue: 'all', setValue: (val) => { if (['all', 'this_week', 'this_month', 'next_month', 'expired', 'custom'].includes(val as any)) useAdminMembersStore.getState().setExpiryFilter(val as any); } },
    { key: 'expiryFrom', value: expiryFrom, defaultValue: '', setValue: (val) => useAdminMembersStore.getState().setExpiryRange(val as string, useAdminMembersStore.getState().expiryTo) },
    { key: 'expiryTo', value: expiryTo, defaultValue: '', setValue: (val) => useAdminMembersStore.getState().setExpiryRange(useAdminMembersStore.getState().expiryFrom, val as string) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(normalizeAdminMembersDirectoryUrlPage(value)) },
  ]);
  const memberId = searchParams.get('memberId');
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);
  const queryClient = useQueryClient();

  const debouncedSearch = useAdminMembersDebounce(search, 300).trim();

  // Keep the visible toolbar selection authoritative; a stale branchId URL value must not silently override it.
  const activeBranch = branchFilter !== 'all' ? branchFilter : undefined;
  const selectedGender: FetchMembersParams['gender'] = genderFilter === 'all' ? undefined : (genderFilter as FetchMembersParams['gender']);
  const selectedPlan: FetchMembersParams['plan'] = planFilter === 'all' ? undefined : (planFilter as FetchMembersParams['plan']);

  const queryParams: FetchMembersParams = {
    search: debouncedSearch || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    branchId: activeBranch,
    expiryFilter: expiryFilter !== 'all' ? expiryFilter : undefined,
    expiryFrom: expiryFrom || undefined,
    expiryTo: expiryTo || undefined,
    gender: selectedGender,
    plan: selectedPlan,
    page: currentPage,
    limit: ADMIN_MEMBERS_ITEMS_PER_PAGE,
  };

  const membersQuery = useQuery({
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('list', queryParams),
    queryFn: () => AdminMembersApi.fetchMembers(queryParams),
  });
  
  const summaryQuery = useQuery({
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('summary', activeBranch ?? 'all'),
    queryFn: () => AdminMembersApi.fetchSummary(activeBranch),
  });

  const memberDetailQuery = useQuery({
    queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('detail', memberId),
    queryFn: () => AdminMembersApi.fetchMemberById(memberId as string),
    enabled: Boolean(memberId),
  });

// EFFECT: Keeps the selected member/profile state synchronized with the current module URL/resource identity.
  useEffect(() => {
    if (!memberId) {
      setSelectedMember(null);
      return;
    }
    setSelectedMember(memberDetailQuery?.data?.data ?? null);
  }, [memberId, memberDetailQuery?.data]);

  const { exportMembers, isExporting } = useAdminMembersExport({
    search: debouncedSearch || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    branchId: activeBranch,
    expiryFilter: expiryFilter !== 'all' ? expiryFilter : undefined,
    gender: selectedGender,
    plan: selectedPlan,
  });

  const loadAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('list') });
    await queryClient.invalidateQueries({ queryKey: ADMIN_MEMBERS_QUERY_KEYS.key('summary') });
  }, [queryClient]);

  const status = membersQuery.status;
  const members = membersQuery.data?.data ?? [];
  const allFilteredCount = membersQuery.data?.meta?.total ?? members.length;
  const totalPages = Math.max(1, Math.ceil(allFilteredCount / ADMIN_MEMBERS_ITEMS_PER_PAGE));
  useEffect(() => {
    if (membersQuery.status === 'success' && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [membersQuery.status, currentPage, totalPages, setCurrentPage]);

  return {
    members,
    allFilteredCount,
    summary: summaryQuery.data?.data ?? null,
    summaryStatus: summaryQuery.status,
    retrySummary: summaryQuery.refetch,
    exportMembers,
    isExporting,
    status,
    selectedMember,
    memberId,
    selectedMemberStatus: memberDetailQuery.status,
    selectedMemberError: memberDetailQuery.isError ? t('members.AdminAuditRepair.profileFailed') : '',
    retrySelectedMember: memberDetailQuery.refetch,
    setSelectedMember,
    currentPage,
    setCurrentPage,
    totalPages,
    loadAll,
    retryMembers: membersQuery.refetch,
  };
}

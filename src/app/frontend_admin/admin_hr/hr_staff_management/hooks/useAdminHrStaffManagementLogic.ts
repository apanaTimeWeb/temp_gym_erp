"use client";
// RESPONSIBILITY: Owns HR staff-directory query state and staff lifecycle mutations only.
// DATA FLOW: URL-backed filters → TanStack Query → staff API → staff directory and edit/profile UI.

import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_HR_QUERY_KEYS } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementQueryKeys';
import type { AdminHrLogicUiInputs } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementLogicUiInputsTypes';
import { AdminHrApi } from '@/app/frontend_admin/admin_hr/hr_staff_management/api/admin_hr_staff_management_api';
import { useAdminHrStaffMutations } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementStaffMutations';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementToastStore';
import type { HrServerState } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';

export function useAdminHrLogic(uiInputs: AdminHrLogicUiInputs): HrServerState {
  const { showToast } = useAdminNavigationLayoutToastStore();
  const t = useTranslations();
  const { search, roleFilter, branchFilter, currentPage, debouncedSearch, staffSortKey, staffSortDir } = useAdminHrUrlState();
  const searchParams = useSearchParams();
  const selectedBranchId = searchParams.get('branchId') || 'all';
  const { editId, setShowModal } = uiInputs;

  const staffQuery = useQuery({
    queryKey: ADMIN_HR_QUERY_KEYS.key('staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir }),
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir, limit: '10' };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      return AdminHrApi.fetchStaff(params);
    },
  });

  const staff = staffQuery.data?.data?.staff ?? [];
  const totalStaff = staffQuery.data?.data?.total ?? 0;
  const staffMutations = useAdminHrStaffMutations(editId, setShowModal, showToast);
  const loadAll = useCallback(async () => { await staffQuery.refetch(); }, [staffQuery]);

  return {
    staff,
    totalStaff,
    status: staffQuery.status,
    error: staffQuery.error ? t('hr.AdminAuditRepair.requestFailed') : '',
    retryStaff: staffQuery.refetch,
    saving: staffMutations.isPending,
    loadAll,
    saveStaff: staffMutations.saveStaff,
    deleteStaff: staffMutations.deleteStaff,
    toggleStaffStatus: staffMutations.toggleStaffStatus,
  };
}

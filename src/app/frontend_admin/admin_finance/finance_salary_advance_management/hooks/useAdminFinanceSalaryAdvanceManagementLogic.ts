"use client";
// RESPONSIBILITY: Finance-owned advance workflow server state only; Finance staff CRUD is owned by admin_hr/hr_staff_management.
// DATA FLOW: URL-backed staff filters -> TanStack Query -> module-local API contract -> Finance-owned workflow.

import { useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/constants/AdminFinanceSalaryAdvanceManagementQueryKeys';
import { AdminFinanceSalaryAdvanceManagementApi } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/api/admin_finance_salary_advance_management_api';
import { useAdminFinanceSalaryAdvanceManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementUrlState';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/state/useAdminFinanceSalaryAdvanceManagementToastStore';
import type { FinanceSalaryAdvanceServerState } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementTypes';
import { useAdminFinanceSalaryAdvanceManagementAdvanceMutation } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementAdvanceMutation';

/** Server-state coordinator for the Finance-owned advance workflow. Only the relevant mutation and supporting read queries are active here. */
export function useAdminFinanceSalaryAdvanceManagementLogic(_uiInputs: import('@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementLogicUiInputsTypes').AdminFinanceSalaryAdvanceManagementLogicUiInputs): FinanceSalaryAdvanceServerState {
  const { showToast } = useAdminNavigationLayoutToastStore();
  const errorText = useTranslations('hr.HrError')('text_22b2c820bf');
  const { debouncedSearch, roleFilter, branchFilter, currentPage, staffSortKey, staffSortDir } = useAdminFinanceSalaryAdvanceManagementUrlState();
  const selectedBranchId = useSearchParams().get('branchId') || 'all';
  const staffQuery = useQuery({
    queryKey: ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_QUERY_KEYS.key('staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir }),
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir, limit: '10' };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      return AdminFinanceSalaryAdvanceManagementApi.fetchStaff(params);
    },
  });
  const summaryQuery = useQuery({ queryKey: ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_QUERY_KEYS.key('summary', selectedBranchId), queryFn: () => AdminFinanceSalaryAdvanceManagementApi.fetchSummary(selectedBranchId) });
  const mutation = useAdminFinanceSalaryAdvanceManagementAdvanceMutation(showToast);
  const staff: import('@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementTypes').Staff[] = staffQuery.data?.data?.staff ?? [];
  const loadAll = useCallback(async () => { await Promise.all([staffQuery.refetch(), summaryQuery.refetch()]); }, [staffQuery, summaryQuery]);
  useEffect(() => {
    if (staffQuery.error instanceof Error) showToast(errorText, 'error', 'finance-advance-staff-query-error');
    if (summaryQuery.error instanceof Error) showToast(errorText, 'error', 'finance-advance-summary-query-error');
  }, [staffQuery.error, summaryQuery.error, showToast, errorText]);
  return {
    staff, totalStaff: staffQuery.data?.data?.total ?? 0, summary: summaryQuery.data?.data ?? null,
    status: staffQuery.status, error: staffQuery.error ? errorText : '',
    summaryStatus: summaryQuery.status, summaryError: summaryQuery.error ? errorText : '',
    retryStaff: staffQuery.refetch, retrySummary: summaryQuery.refetch, saving: mutation.isPending, loadAll,
    giveAdvance: mutation.giveAdvance,
  };
}

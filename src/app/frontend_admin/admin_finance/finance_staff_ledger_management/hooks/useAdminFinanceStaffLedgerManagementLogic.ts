"use client";
// RESPONSIBILITY: Finance-owned ledger workflow server state only; Finance staff CRUD is owned by admin_hr/hr_staff_management.
// DATA FLOW: URL-backed staff filters -> TanStack Query -> module-local API contract -> Finance-owned workflow.

import { useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/constants/AdminFinanceStaffLedgerManagementQueryKeys';
import { AdminFinanceStaffLedgerManagementApi } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/api/admin_finance_staff_ledger_management_api';
import { useAdminFinanceStaffLedgerManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementUrlState';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/state/useAdminFinanceStaffLedgerManagementToastStore';
import type { FinanceStaffLedgerServerState } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';


/** Server-state coordinator for the Finance-owned ledger workflow. Only the relevant mutation and supporting read queries are active here. */
export function useAdminFinanceStaffLedgerManagementLogic(_uiInputs: import('@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementLogicUiInputsTypes').AdminFinanceStaffLedgerManagementLogicUiInputs): FinanceStaffLedgerServerState {
  const { showToast } = useAdminNavigationLayoutToastStore();
  const errorText = useTranslations('hr.HrError')('text_22b2c820bf');
  const { debouncedSearch, roleFilter, branchFilter, currentPage, staffSortKey, staffSortDir, setCurrentPage } = useAdminFinanceStaffLedgerManagementUrlState();
  const selectedBranchId = useSearchParams().get('branchId') || 'all';
  const staffQuery = useQuery({
    queryKey: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_QUERY_KEYS.key('staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir }),
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir, limit: '10' };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      return AdminFinanceStaffLedgerManagementApi.fetchStaff(params);
    },
  });
  useEffect(() => {
    if (staffQuery.status !== 'success') return;
    const total = staffQuery.data?.data?.total;
    if (typeof total !== 'number' || !Number.isFinite(total) || total < 0) return;
    const lastPage = Math.max(1, Math.ceil(total / 10));
    if (currentPage > lastPage) setCurrentPage(lastPage);
  }, [staffQuery.status, staffQuery.data?.data?.total, currentPage, setCurrentPage]);
  const summaryQuery = useQuery({ queryKey: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_QUERY_KEYS.key('summary', selectedBranchId), queryFn: () => AdminFinanceStaffLedgerManagementApi.fetchSummary(selectedBranchId) });
  const staff: import('@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes').Staff[] = staffQuery.data?.data?.staff ?? [];
  const loadAll = useCallback(async () => { await Promise.all([staffQuery.refetch(), summaryQuery.refetch()]); }, [staffQuery, summaryQuery]);
  useEffect(() => {
    if (staffQuery.error instanceof Error) showToast(errorText, 'error', 'finance-ledger-staff-query-error');
    if (summaryQuery.error instanceof Error) showToast(errorText, 'error', 'finance-ledger-summary-query-error');
  }, [staffQuery.error, summaryQuery.error, showToast, errorText]);
  return {
    staff, totalStaff: staffQuery.data?.data?.total ?? 0, summary: summaryQuery.data?.data ?? null,
    status: staffQuery.status, error: staffQuery.error ? errorText : '',
    summaryStatus: summaryQuery.status, summaryError: summaryQuery.error ? errorText : '',
    retryStaff: staffQuery.refetch, retrySummary: summaryQuery.refetch, saving: false, loadAll
  };
}

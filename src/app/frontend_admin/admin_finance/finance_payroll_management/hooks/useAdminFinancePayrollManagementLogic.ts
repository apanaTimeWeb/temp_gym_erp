"use client";
// RESPONSIBILITY: Finance-owned payroll workflow server state only; Finance staff CRUD is owned by admin_hr/hr_staff_management.
// DATA FLOW: URL-backed staff filters -> TanStack Query -> module-local API contract -> Finance-owned workflow.

import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { ADMIN_FINANCE_PAYROLL_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementQueryKeys';
import { AdminFinancePayrollManagementApi } from '@/app/frontend_admin/admin_finance/finance_payroll_management/api/admin_finance_payroll_management_api';
import { useAdminFinancePayrollManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUrlState';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementToastStore';
import type { FinancePayrollServerState } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import { useAdminFinancePayrollManagementPayrollMutations } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPayrollMutations';
import type { AdminFinancePayrollManagementLogicUiInputs } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementLogicUiInputsTypes';
import type { Staff } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';

/** Server-state coordinator for payroll only. Staff directory mutations stay in HR; advances and dues have their own Finance leaves. */
export function useAdminFinancePayrollManagementLogic(uiInputs: AdminFinancePayrollManagementLogicUiInputs): FinancePayrollServerState {
  const { showToast } = useAdminNavigationLayoutToastStore();
  const t = useTranslations();
  const safeRequestFailure = t('hr.AdminAuditRepair.requestFailed');
  const { debouncedSearch, roleFilter, branchFilter, currentPage, payrollMonth, staffSortKey, staffSortDir, payrollSortKey, payrollSortDir } = useAdminFinancePayrollManagementUrlState();
  const selectedBranchId = useSearchParams().get('branchId') || 'all';
  const staffQuery = useQuery({
    queryKey: ADMIN_FINANCE_PAYROLL_MANAGEMENT_QUERY_KEYS.key('staff', { search: debouncedSearch, page: currentPage, role: roleFilter, branch: branchFilter, branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir }),
    queryFn: () => {
      const params: Record<string, string> = { search: debouncedSearch, page: String(currentPage), branchId: selectedBranchId, sortKey: staffSortKey, sortDir: staffSortDir, limit: '10' };
      if (roleFilter !== 'All') params.role = roleFilter;
      if (branchFilter !== 'All') params.branch = branchFilter;
      return AdminFinancePayrollManagementApi.fetchStaff(params);
    },
  });
  const payrollQuery = useQuery({
    queryKey: ADMIN_FINANCE_PAYROLL_MANAGEMENT_QUERY_KEYS.key('payroll', { search: debouncedSearch, page: currentPage, month: payrollMonth, branchId: selectedBranchId, sortKey: payrollSortKey, sortDir: payrollSortDir }),
    queryFn: () => AdminFinancePayrollManagementApi.fetchPayrolls({ search: debouncedSearch, page: String(currentPage), month: payrollMonth, branchId: selectedBranchId, sortKey: payrollSortKey, sortDir: payrollSortDir, limit: '10' }),
  });
  const summaryQuery = useQuery({ queryKey: ADMIN_FINANCE_PAYROLL_MANAGEMENT_QUERY_KEYS.key('summary', selectedBranchId), queryFn: () => AdminFinancePayrollManagementApi.fetchSummary(selectedBranchId) });
  const staff: Staff[] = staffQuery.data?.data?.staff ?? [];
  const payrolls = payrollQuery.data?.data?.payrolls ?? [];
  const mutations = useAdminFinancePayrollManagementPayrollMutations(staff, payrolls, uiInputs.setShowPayrollModal, showToast);
  const loadAll = useCallback(async () => { await Promise.all([staffQuery.refetch(), payrollQuery.refetch(), summaryQuery.refetch()]); }, [staffQuery, payrollQuery, summaryQuery]);
  useEffect(() => {
    if (staffQuery.error) showToast(safeRequestFailure, 'error', 'finance-payroll-staff-query-error');
    if (payrollQuery.error) showToast(safeRequestFailure, 'error', 'finance-payroll-query-error');
    if (summaryQuery.error) showToast(safeRequestFailure, 'error', 'finance-payroll-summary-query-error');
  }, [staffQuery.error, payrollQuery.error, summaryQuery.error, showToast, safeRequestFailure]);
  return {
    staff, totalStaff: staffQuery.data?.data?.total ?? 0, payrolls, totalPayrolls: payrollQuery.data?.data?.total ?? 0,
    summary: summaryQuery.data?.data ?? null, status: staffQuery.status, error: staffQuery.error ? safeRequestFailure : '',
    payrollStatus: payrollQuery.status, payrollError: payrollQuery.error ? safeRequestFailure : '',
    summaryStatus: summaryQuery.status, summaryError: summaryQuery.error ? safeRequestFailure : '',
    retryStaff: staffQuery.refetch, retryPayroll: payrollQuery.refetch, retrySummary: summaryQuery.refetch,
    saving: mutations.isPending, loadAll, savePayroll: mutations.savePayroll, markPayrollPaid: mutations.markPayrollPaid,
  };
}

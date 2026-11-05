// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useCallback } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.query_keys';
import type { HrSummary, HrInitialData } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';

/**
 * @description Owns TanStack Query server state for HR staff, payroll, and summary data. URL-backed search/role/month/page values are the request identity; UI state remains outside this hook.
 * @dependencies ManagerStaffPayrollAndAttendanceApi, ManagerStaffPayrollAndAttendanceQueryKeys, HrInitialData/Staff/Payroll/HrSummary.
 * @edge-case Preserves initial demo data when supplied, refetches all three datasets together for retry, and keeps each query independently error-aware.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceQueries owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceQueries(
  params: { search: string; role: string; month: string; page: number; limit: number },
  initialData?: HrInitialData | null,
) {
  const staffQuery = useQuery({
    queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff({ search: params.search, role: params.role, page: params.page, limit: params.limit }),
    queryFn: async () => {
      const response = await ManagerStaffPayrollAndAttendanceApi.fetchStaff({
        search: params.search,
        role: params.role,
        page: String(params.page),
        limit: String(params.limit),
      });
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    initialData: initialData ? { staff: initialData.staff, total: initialData.staff.length } : undefined,
  });

  const payrollQuery = useQuery({
    queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.payroll({ search: params.search, month: params.month, page: params.page, limit: params.limit }),
    queryFn: async () => {
      const response = await ManagerStaffPayrollAndAttendanceApi.fetchPayrolls({
        search: params.search,
        month: params.month,
        page: String(params.page),
        limit: String(params.limit),
      });
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    initialData: initialData ? { payrolls: initialData.payrolls, total: initialData.payrolls.length } : undefined,
  });

  const summaryQuery = useQuery({
    queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary(),
    queryFn: async (): Promise<HrSummary | null> => {
      const response = await ManagerStaffPayrollAndAttendanceApi.fetchHrSummary();
      if (!response.success) throw new Error(response.message);
      return response.data;
    },
    initialData: initialData?.summary ?? undefined,
  });

  const loadAll = useCallback(async () => {
    await Promise.all([staffQuery.refetch(), payrollQuery.refetch(), summaryQuery.refetch()]);
  }, [payrollQuery, staffQuery, summaryQuery]);

  const error = staffQuery.error || payrollQuery.error || summaryQuery.error;

  return {
    staff: staffQuery.data?.staff ?? [],
    totalStaff: staffQuery.data?.total ?? 0,
    payrolls: payrollQuery.data?.payrolls ?? [],
    totalPayrolls: payrollQuery.data?.total ?? 0,
    summary: summaryQuery.data ?? null,
    loadAll,
    isPending: staffQuery.isPending || payrollQuery.isPending || summaryQuery.isPending,
    isError: staffQuery.isError || payrollQuery.isError || summaryQuery.isError,
    error,
  };
}

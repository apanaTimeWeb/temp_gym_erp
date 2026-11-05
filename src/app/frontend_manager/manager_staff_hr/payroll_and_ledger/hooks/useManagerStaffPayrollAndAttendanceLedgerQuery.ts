// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.query_keys';
/** Loads the selected staff ledger through the Manager HR API contract. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceLedgerQuery.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceLedgerQuery owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceLedgerQuery(staffId: string) {
  return useQuery({
    queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.ledger(staffId),
    queryFn: () => ManagerStaffPayrollAndAttendanceApi.fetchLedger(staffId),
    enabled: Boolean(staffId) });
}

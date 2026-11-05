// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { ApiResponse } from '@/lib/api';

import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGenericErrorMessage';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/api/manager_staff_hr_payroll_and_ledger.query_keys';
import { HR_PENDING_STATUS } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_shared.constants';
import { printManagerStaffPayrollAndAttendancePayslip } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceExportUtils';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendancePayrollMutations.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceApi, ManagerStaffPayrollAndAttendanceExportUtils, ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits, ManagerStaffPayrollAndAttendanceTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendancePayrollMutations owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
function requireSuccess<T>(response: ApiResponse<T>): Extract<ApiResponse<T>, { success: true }> {
  if (!response.success) throw new Error(response.message);
  return response;
}

export function useManagerStaffPayrollAndAttendancePayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setShowPayrollModal: (value: boolean) => void,
  setSaving: (value: boolean) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const queryClient = useQueryClient();
  const invalidateLedgers = () => queryClient.invalidateQueries({ queryKey: [...ManagerStaffPayrollAndAttendanceQueryKeys.all, 'ledger'] });

  const bulkGeneratePayrollMutation = useMutation({
    mutationFn: async ({ month, idempotencyKey }: { month: string; idempotencyKey: string }) => requireSuccess(await ManagerStaffPayrollAndAttendanceApi.generatePayrolls(month, idempotencyKey)),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.payrolls() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      void invalidateLedgers();
      showToast(response.message, 'success');
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false) });

  const savePayrollMutation = useMutation({
    mutationFn: async (data: Partial<Payroll> & { amount?: string | number; idempotencyKey: string }) => {
      const staffMember = staff.find((item) => String(item.id) === String(data.staffId));
      if (!staffMember) throw new Error(MANAGER_GENERIC_ERROR_MESSAGE); // Impossible UI state: backend remains the authority for user-visible validation messages.
      const amount = ManagerInfrastructureToManagerMinorUnits(Number(data.amount || 0));
      const paidAmount = ManagerInfrastructureToManagerMinorUnits(Number(data.paidAmount || 0));
      const payload = {
        ...data,
        amount,
        paidAmount,
        pendingAmount: Math.max(0, amount - paidAmount),
        status: Math.max(0, amount - paidAmount) === 0 ? 'Paid' : HR_PENDING_STATUS,
        paidAt: paidAmount > 0 ? new Date() : undefined,
        staff: { name: staffMember.name, role: staffMember.role } };
      return requireSuccess(await ManagerStaffPayrollAndAttendanceApi.createPayroll(payload, data.idempotencyKey));
    },
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.payrolls() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      void invalidateLedgers();
      showToast(response.message, 'success');
      setShowPayrollModal(false);
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false) });

  const markPayrollPaidMutation = useMutation({
    mutationFn: async ({ id, amount, idempotencyKey }: { id: string; amount: number; idempotencyKey: string }) => {
      const payroll = payrolls.find((item) => String(item.id) === String(id));
      if (!payroll) throw new Error(MANAGER_GENERIC_ERROR_MESSAGE); // Stale client state: do not invent a user-facing message; the normal row flow always supplies a record.
      const paidAmount = (payroll.paidAmount || 0) + amount;
      const pendingAmount = Math.max(0, payroll.amount - paidAmount);
      return requireSuccess(await ManagerStaffPayrollAndAttendanceApi.updatePayroll(id, { paidAmount, pendingAmount, status: pendingAmount === 0 ? 'Paid' : HR_PENDING_STATUS }, idempotencyKey));
    },
    onSuccess: (response) => {
      if (!response.data) return;
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.payrolls() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      void invalidateLedgers();
      showToast(response.message, 'success');
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); } });

  const giveAdvanceMutation = useMutation({
    mutationFn: async ({ data, idempotencyKey }: { data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => requireSuccess(await ManagerStaffPayrollAndAttendanceApi.giveStaffAdvance(data, idempotencyKey)),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff() });
      void invalidateLedgers();
      showToast(response.message, 'success');
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false) });

  const payDueMutation = useMutation({
    mutationFn: async ({ data, idempotencyKey }: { data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }; idempotencyKey: string }) => requireSuccess(await ManagerStaffPayrollAndAttendanceApi.payStaffDue(data, idempotencyKey)),
    onMutate: () => setSaving(true),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.staff() });
      queryClient.invalidateQueries({ queryKey: ManagerStaffPayrollAndAttendanceQueryKeys.summary() });
      void invalidateLedgers();
      showToast(response.message, 'success');
    },
    onError: (error) => { showToast(ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')), 'error'); },
    onSettled: () => setSaving(false) });

  const bulkGeneratePayroll = async (month: string, idempotencyKey: string) => { await bulkGeneratePayrollMutation.mutateAsync({ month, idempotencyKey }); };
  const downloadPayslip = async (payrollId: string) => {
    const payroll = payrolls.find((item) => item.id === payrollId);
    if (payroll) printManagerStaffPayrollAndAttendancePayslip(payroll);
  };

  return {
    savePayroll: async (data: Partial<Payroll> & { amount?: string | number; idempotencyKey: string }) => { await savePayrollMutation.mutateAsync(data); },
    markPayrollPaid: async (id: string, amount: number, idempotencyKey: string) => { await markPayrollPaidMutation.mutateAsync({ id, amount, idempotencyKey }); },
    bulkGeneratePayroll, downloadPayslip,
    giveAdvance: async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }, idempotencyKey: string) => { await giveAdvanceMutation.mutateAsync({ data, idempotencyKey }); },
    payDue: async (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }, idempotencyKey: string) => { await payDueMutation.mutateAsync({ data, idempotencyKey }); } };
}

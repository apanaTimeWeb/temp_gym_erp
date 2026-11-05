"use client";
// RESPONSIBILITY: Owns Finance payroll/disbursement mutation orchestration and critical confirmation boundaries.
// DATA FLOW: Payroll action → payroll mutation hook → AdminFinancePayrollManagementApi → TanStack Query cache.

import { ADMIN_FINANCE_PAYROLL_MANAGEMENT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementQueryKeys';
import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminFinancePayrollManagementApi } from '@/app/frontend_admin/admin_finance/finance_payroll_management/api/admin_finance_payroll_management_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementIdempotencyIntentStore';
import type { Payroll, Staff } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import type { AdminToastType } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementToastTypes';
import { PAYROLL_STATUS } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';
import { AdminFinancePayrollManagementToMinorUnits } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementCurrencyUnits';
import { canAdminFinancePayrollManagementPay } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementPaymentBoundary';
/** @description useAdminFinancePayrollManagementPayrollMutations: Owns Finance payroll/disbursement mutation orchestration and critical confirmation boundaries. @dependencies Consumes AdminFinancePayrollManagementQueryKeys, AdminFinancePayrollManagementApi, useAdminNavigationLayoutConfirm, AdminNavigationLayoutIdempotencyIntentStore, AdminFinancePayrollManagementTypes, AdminNavigationLayoutToastTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @param staff - Input consumed by this hook as declared by its TypeScript signature. @param payrolls - Input consumed by this hook as declared by its TypeScript signature. @param setShowPayrollModal - Input consumed by this hook as declared by its TypeScript signature. @param showToast - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinancePayrollManagementPayrollMutations(
  staff: Staff[],
  payrolls: Payroll[],
  setShowPayrollModal: (open: boolean) => void,
  showToast: (message: string, type: AdminToastType, id?: string) => void,
) {
  const { confirm } = useAdminNavigationLayoutConfirm();
  const t = useTranslations();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const queryClient = useQueryClient();
  const invalidateFinancePayroll = useCallback(() => queryClient.invalidateQueries({ queryKey: ADMIN_FINANCE_PAYROLL_MANAGEMENT_QUERY_KEYS.key() }), [queryClient]);
  const createPayrollMutation = useMutation({ mutationFn: ({ payload, idempotencyKey }: { payload: Partial<Payroll>; idempotencyKey: string }) => AdminFinancePayrollManagementApi.createPayroll(payload, idempotencyKey), onSuccess: () => { void invalidateFinancePayroll(); }, onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'hr-payroll-create-error') });
  const updatePayrollMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Payroll>; idempotencyKey: string }) => AdminFinancePayrollManagementApi.updatePayroll(id, payload, idempotencyKey), onSuccess: () => { void invalidateFinancePayroll(); }, onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'hr-payroll-update-error') });
  const updateStaffMutation = useMutation({ mutationFn: ({ id, payload, idempotencyKey }: { id: string; payload: Partial<Staff>; idempotencyKey: string }) => AdminFinancePayrollManagementApi.updateStaff(id, payload, idempotencyKey), onSuccess: () => { void invalidateFinancePayroll(); }, onError: (error) => showToast(t('hr.AdminAuditRepair.requestFailed'), 'error', 'hr-payroll-staff-update-error') });

  const savePayroll = useCallback(async (data: Partial<Payroll> & { amount?: string | number; paidAmount?: string | number }) => {
    const staffMember = staff.find((member) => String(member.id) === String(data.staffId));
    const amountMajor = Number(data.amount ?? 0);
    const paidAmountMajor = Number(data.paidAmount ?? 0);
    const amount = AdminFinancePayrollManagementToMinorUnits(amountMajor);
    const paidAmount = AdminFinancePayrollManagementToMinorUnits(paidAmountMajor);
    const pendingAmount = Math.max(0, amount - paidAmount);
    const status = pendingAmount === 0 ? PAYROLL_STATUS.PAID : paidAmount > 0 ? PAYROLL_STATUS.PARTIAL : PAYROLL_STATUS.PENDING;
    const intentId = `create-payroll:${String(data.staffId)}:${String(data.month ?? '')}:${amount}:${paidAmount}`;
    const confirmed = await confirm({ title: t('hr.AdminHrMutations.auto_disburseTitle'), message: t('hr.AdminHrMutations.auto_disburseMessage', { amount: String(amountMajor), staffName: staffMember?.name ?? data.staffId ?? '' }), confirmText: t('hr.AdminHrMutations.auto_disburseConfirm'), type: 'warning' });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    const deduction = staffMember?.advanceSalary && staffMember.advanceSalary > 0
      ? Math.min(staffMember.salary || 0, staffMember.advanceSalary)
      : 0;
    const deductionIntentId = staffMember ? `payroll-advance-deduction:${staffMember.id}:${String(data.month ?? '')}` : '';
    let advanceDeducted = false;
    try {
      if (staffMember && deduction > 0) {
        await updateStaffMutation.mutateAsync({
          id: staffMember.id,
          payload: { advanceSalary: staffMember.advanceSalary! - deduction },
          idempotencyKey: getIntentKey(deductionIntentId),
        });
        advanceDeducted = true;
      }
      const response = await createPayrollMutation.mutateAsync({
        payload: { ...data, amount, paidAmount, pendingAmount, status, paidAt: paidAmount > 0 ? new Date().toISOString() : undefined, staff: staffMember ? { name: staffMember.name, role: staffMember.role } : undefined },
        idempotencyKey: getIntentKey(intentId),
      });
      clearIntentKey(intentId);
      if (deductionIntentId) clearIntentKey(deductionIntentId);
      showToast(response.message, 'success', 'hr-payroll-create-success');
      setShowPayrollModal(false);
    } catch (error) {
      // Compensate the advance deduction when payroll creation fails. If compensation also fails,
      // invalidate HR queries so the UI re-reads authoritative server state rather than implying rollback.
      if (advanceDeducted && staffMember) {
        try {
          await updateStaffMutation.mutateAsync({
            id: staffMember.id,
            payload: { advanceSalary: staffMember.advanceSalary ?? 0 },
            idempotencyKey: getIntentKey(`payroll-advance-rollback:${staffMember.id}:${String(data.month ?? '')}`),
          });
        } catch {
          showToast(t('hr.AdminHrMutations.advanceRollbackFailed'), 'error', 'hr-payroll-advance-rollback-failed');
        }
      }
      void invalidateFinancePayroll();
      throw error;
    }
  }, [clearIntentKey, confirm, createPayrollMutation, getIntentKey, setShowPayrollModal, showToast, staff, t, updateStaffMutation]);

  const markPayrollPaid = useCallback(async (id: string, amount: number) => {
    const payroll = payrolls.find((item) => String(item.id) === String(id));
    if (!payroll) return false;
    // Validate against the last loaded minor-unit balance BEFORE confirmation/network side effects.
    // The backend still owns authoritative, concurrent-balance enforcement.
    const amountMinor = AdminFinancePayrollManagementToMinorUnits(amount);
    if (!canAdminFinancePayrollManagementPay(amountMinor, payroll.paidAmount, payroll.pendingAmount)) return false;
    const intentId = `payroll-payment:${id}:${amountMinor}`;
    const confirmed = await confirm({
      title: t('hr.AdminHrMutations.auto_paymentTitle'),
      message: t('hr.AdminHrMutations.auto_paymentMessage', { amount: String(amount), staffName: payroll.staff?.name ?? payroll.staffId }),
      confirmText: t('hr.AdminHrMutations.auto_paymentConfirm'),
      type: 'warning',
    });
    if (!confirmed) { clearIntentKey(intentId); return false; }
    const paidAmount = payroll.paidAmount + amountMinor;
    const pendingAmount = payroll.pendingAmount - amountMinor;
    const response = await updatePayrollMutation.mutateAsync({ id, payload: { paidAmount, pendingAmount, status: pendingAmount === 0 ? PAYROLL_STATUS.PAID : paidAmount > 0 ? PAYROLL_STATUS.PARTIAL : PAYROLL_STATUS.PENDING }, idempotencyKey: getIntentKey(intentId) });
    idempotencyKeysRef.current.delete(intentId);
    showToast(response.message, 'success', 'hr-payroll-payment-success');
  }, [clearIntentKey, confirm, getIntentKey, payrolls, showToast, updatePayrollMutation, t]);


  return {
    savePayroll,
    markPayrollPaid,
    isPending: createPayrollMutation.isPending || updatePayrollMutation.isPending || updateStaffMutation.isPending,
  };
}

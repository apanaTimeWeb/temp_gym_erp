// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';
import { EMPTY_PAYROLL_FORM } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_form_defaults.constants';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';
import { useManagerStaffPayrollAndAttendanceStaffAttendanceQuery } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceStaffAttendanceQuery';
import { managerHrPayrollFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_payroll_form.schemas';
import type { PayrollFormValues } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_payroll_and_attendance_form.types';


/** Coordinates payroll calculation and disbursement without business/form logic in the modal component. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendancePayrollForm.
 * @dependencies Uses useManagerStaffPayrollAndAttendanceLogic, useManagerStaffPayrollAndAttendanceStaffAttendanceQuery, ManagerStaffPayrollAndAttendancePayrollFormSchema, ManagerStaffPayrollAndAttendanceFormTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendancePayrollForm owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendancePayrollForm() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useManagerStaffPayrollAndAttendanceLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<PayrollFormValues>({ resolver: zodResolver(managerHrPayrollFormSchema), defaultValues: EMPTY_PAYROLL_FORM });
  const [calcData, setCalcData] = useState<{ base: number; attDed: number; advAdj: number; net: number } | null>(null);
  const selectedStaffId = form.watch('staffId');
  const selectedMonth = form.watch('month');
  const { data: attendanceResponse } = useManagerStaffPayrollAndAttendanceStaffAttendanceQuery(selectedStaffId || '', selectedMonth || '');

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (showPayrollModal) { form.reset(EMPTY_PAYROLL_FORM); setCalcData(null); } }, [form, showPayrollModal]);
  useEffect(() => {
    const selectedStaff = staff.find((item) => String(item.id) === String(selectedStaffId));
    if (!selectedStaff) return;
    const baseSalary = selectedStaff.salary || 0;
    let attendanceDeduction = 0;
    if (selectedMonth && attendanceResponse?.data?.history) {
      const [yearText, monthText] = selectedMonth.split('-'); const year = Number(yearText); const month = Number(monthText); const daysInMonth = new Date(year, month, 0).getDate();
      const presentDays = attendanceResponse.data.history.filter((record) => record.date.startsWith(`${selectedMonth}-`) && record.status === MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES.PRESENT).length;
      attendanceDeduction = Math.round((baseSalary / daysInMonth) * (daysInMonth - presentDays));
    }
    const payableBeforeAdvance = Math.max(0, baseSalary - attendanceDeduction);
    const deductedAdvance = Math.min(payableBeforeAdvance, selectedStaff.advanceSalary || 0);
    const payableAmount = Math.max(0, payableBeforeAdvance - deductedAdvance);
    form.setValue('amount', ManagerInfrastructureFromManagerMinorUnits(payableAmount), { shouldValidate: true }); form.setValue('paidAmount', ManagerInfrastructureFromManagerMinorUnits(payableAmount), { shouldValidate: true });
    setCalcData({ base: baseSalary, attDed: attendanceDeduction, advAdj: deductedAdvance, net: payableAmount });
  }, [attendanceResponse, form, selectedMonth, selectedStaffId, staff]);

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(form.formState.isDirty && showPayrollModal);
  const handleClose = () => { void confirmAndClose(() => { form.reset(EMPTY_PAYROLL_FORM); setShowPayrollModal(false); }); };
  const submit = form.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_PAYROLL_TITLE'), message: t('CONFIRM_PAYROLL_MESSAGE'), confirmText: t('CONFIRM_PAYROLL'), type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= ManagerInfrastructureIdempotency();
    await savePayroll({ ...data, staffId: data.staffId, idempotencyKey: keyRef.current }); form.reset(data);
    keyRef.current = null;
  });
  return { showPayrollModal, staff, saving, form, calcData, submit, handleClose };
}

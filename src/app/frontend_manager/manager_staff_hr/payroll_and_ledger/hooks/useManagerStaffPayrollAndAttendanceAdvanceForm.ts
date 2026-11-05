// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useMemo, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

import { EMPTY_HR_ADVANCE_FORM } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_form_defaults.constants';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';
import { managerHrAdvanceFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_advance_form.schemas';
import { ManagerStaffPayrollAndAttendanceFormatCurrency } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';
import type { ManagerStaffPayrollAndAttendanceAdvanceFormValues } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_payroll_and_attendance_form.types';


/** Coordinates the staff advance payment editor and its critical-action confirmation. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceAdvanceForm.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceFormatters, useManagerStaffPayrollAndAttendanceLogic, ManagerStaffPayrollAndAttendanceAdvanceFormSchema, ManagerStaffPayrollAndAttendanceFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceAdvanceForm owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceAdvanceForm() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();
  const { staff, giveAdvance, saving } = useManagerStaffPayrollAndAttendanceLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<ManagerStaffPayrollAndAttendanceAdvanceFormValues>({ resolver: zodResolver(managerHrAdvanceFormSchema), defaultValues: EMPTY_HR_ADVANCE_FORM });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Balance: ${ManagerStaffPayrollAndAttendanceFormatCurrency(member.advanceSalary || 0, ManagerEnvConfig.currencyCode, locale)}` })), [locale, staff]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => form.reset(EMPTY_HR_ADVANCE_FORM)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: t('CONFIRM_ADVANCE_TITLE'), message: t('CONFIRM_ADVANCE_MESSAGE'), confirmText: t('CONFIRM_PAYMENT'), type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= ManagerInfrastructureIdempotency();
    await giveAdvance({ staffId: values.staffId, amount: ManagerInfrastructureToManagerMinorUnits(values.amount), notes: values.notes || '', paymentMode: values.paymentMode }, keyRef.current);
    form.reset({ ...values, amount: 0, notes: '' });
    keyRef.current = null;
  });
  return { staff, saving, form, selectedStaffId, selectedStaff, staffOptions, submit, handleClose };
}

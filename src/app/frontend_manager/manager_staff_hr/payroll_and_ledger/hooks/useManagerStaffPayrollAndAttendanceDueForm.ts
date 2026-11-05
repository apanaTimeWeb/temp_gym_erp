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

import { EMPTY_HR_DUE_FORM } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_form_defaults.constants';
import { useManagerStaffPayrollAndAttendanceLogic } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendanceLogic';
import { managerHrDueFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_due_form.schemas';
import { ManagerStaffPayrollAndAttendanceFormatCurrency } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceFormatters';
import type { ManagerStaffPayrollAndAttendanceDueFormValues } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_payroll_and_attendance_form.types';


/** Coordinates salary-due settlement and requires explicit confirmation before the mutation. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceDueForm.
 * @dependencies Uses ManagerStaffPayrollAndAttendanceFormatters, useManagerStaffPayrollAndAttendanceLogic, ManagerStaffPayrollAndAttendanceDueFormSchema, ManagerStaffPayrollAndAttendanceFormTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceDueForm owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceDueForm() {
  const t = useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');
  const locale = useLocale();
  const { staff, payDue, saving } = useManagerStaffPayrollAndAttendanceLogic();
  const { confirm } = useConfirm();
  const keyRef = useRef<string | null>(null);
  const form = useForm<ManagerStaffPayrollAndAttendanceDueFormValues>({ resolver: zodResolver(managerHrDueFormSchema), defaultValues: EMPTY_HR_DUE_FORM });
  const selectedStaffId = form.watch('staffId');
  const selectedStaff = useMemo(() => staff.find((member) => String(member.id) === selectedStaffId), [selectedStaffId, staff]);
  const staffWithDues = useMemo(() => staff.filter((member) => (member.currentDue || 0) > 0), [locale, staff]);
  const staffOptions = useMemo(() => staff.map((member) => ({ value: String(member.id), label: `${member.name} (${member.role}) — Due: ${ManagerStaffPayrollAndAttendanceFormatCurrency(member.currentDue || 0, ManagerEnvConfig.currencyCode, locale)}` })), [locale, staff]);
  const handleStaffChange = (value: string | number) => { const id = String(value); const member = staff.find((entry) => String(entry.id) === id); form.setValue('staffId', id, { shouldDirty: true, shouldValidate: true }); form.setValue('amount', member?.currentDue || 0, { shouldDirty: true, shouldValidate: true }); };
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => form.reset(EMPTY_HR_DUE_FORM)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: t('CONFIRM_DUE_PAYMENT_TITLE'), message: t('CONFIRM_DUE_PAYMENT_MESSAGE'), confirmText: t('CONFIRM_PAYMENT'), type: 'warning' });
    if (!confirmed) return;
    keyRef.current ??= ManagerInfrastructureIdempotency();
    await payDue({ staffId: values.staffId, amount: ManagerInfrastructureToManagerMinorUnits(values.amount), notes: values.notes || '', paymentMode: values.paymentMode }, keyRef.current);
    form.reset({ ...values, amount: 0, notes: '' });
    keyRef.current = null;
  });
  return { staff, saving, form, selectedStaffId, selectedStaff, staffWithDues, staffOptions, handleStaffChange, submit, handleClose };
}

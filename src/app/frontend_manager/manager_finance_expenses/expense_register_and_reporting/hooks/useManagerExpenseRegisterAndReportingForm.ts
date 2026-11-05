// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import { EMPTY_EXPENSE_FORM } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_form_defaults.constants';
import { useManagerExpenseRegisterAndReportingLogic } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/hooks/useManagerExpenseRegisterAndReportingLogic';
import { managerExpensesFormSchema } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/schemas/manager_expense_register_and_reporting_form.schemas';
import type { ExpenseFormValues } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting_form.types';


/** Coordinates the Expense editor lifecycle independently of its rendering component. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useManagerExpenseRegisterAndReportingForm.
 * @dependencies Uses useManagerExpenseRegisterAndReportingLogic, ManagerExpenseRegisterAndReportingFormSchema, ManagerExpenseRegisterAndReportingFormTypes, ManagerConfirmProvider.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerExpenseRegisterAndReportingForm owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerExpenseRegisterAndReportingForm() {
  const t = useTranslations('MANAGER_EXPENSE_REGISTER_AND_REPORTING');
  const logic = useManagerExpenseRegisterAndReportingLogic();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ExpenseFormValues>({ resolver: zodResolver(managerExpensesFormSchema), defaultValues: EMPTY_EXPENSE_FORM });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (logic.showModal) form.reset(logic.editData
      ? { ...(logic.editData as ExpenseFormValues), amount: ManagerInfrastructureFromManagerMinorUnits(logic.editData.amount ?? 0) }
      : { ...EMPTY_EXPENSE_FORM, date: new Date().toISOString().split('T')[0] || '' }); }, [form, logic.editData, logic.showModal]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(logic.showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => logic.setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    const confirmed = await confirm({ title: logic.editId ? t('CONFIRM_EXPENSE_UPDATE_TITLE') : t('CONFIRM_EXPENSE_TITLE'), message: logic.editId ? t('CONFIRM_EXPENSE_UPDATE_MESSAGE') : t('CONFIRM_EXPENSE_MESSAGE'), confirmText: logic.editId ? t('CONFIRM_EXPENSE_UPDATE') : t('CONFIRM_EXPENSE_SAVE'), cancelText: t('KEEP_EDITING'), type: 'warning' });
    if (!confirmed) return;
    idempotencyKeyRef.current ??= ManagerInfrastructureIdempotency();
    await logic.saveExpense(values, idempotencyKeyRef.current);
    idempotencyKeyRef.current = null;
  });
  return { ...logic, form, handleClose, submit };
}

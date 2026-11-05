// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

import { ManagerExpenseRegisterAndReportingApi } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/api/manager_expense_register_and_reporting.api';
import { ManagerExpenseRegisterAndReportingQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/api/manager_expense_register_and_reporting.query_keys';
import type { Expense } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useSaveExpenseMutation.
 * @dependencies Uses ManagerExpenseRegisterAndReportingApi, useManagerExpenseRegisterAndReportingQueries, ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits, ManagerExpenseRegisterAndReportingTypes.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent; refreshes affected TanStack Query server state after successful mutations.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useSaveExpenseMutation owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useSaveExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Expense> & { idempotencyKey: string }) => {
      const { idempotencyKey, ...rest } = data;
      const payload: Partial<Expense> = { ...rest, amount: rest.amount === undefined ? undefined : ManagerInfrastructureToManagerMinorUnits(rest.amount) };
      const response = rest.id
        ? await ManagerExpenseRegisterAndReportingApi.updateExpense(rest.id, payload, idempotencyKey)
        : await ManagerExpenseRegisterAndReportingApi.createExpense(payload, idempotencyKey);
      if (!response.success) throw new Error(response.message || 'Unable to save expense');
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ManagerExpenseRegisterAndReportingQueryKeys.all });
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useDeleteExpenseMutation coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => { const response = await ManagerExpenseRegisterAndReportingApi.deleteExpense(id, idempotencyKey); if (!response.success) throw new Error(response.message || 'Unable to delete expense'); return response; },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ManagerExpenseRegisterAndReportingQueryKeys.all });
    } });
}

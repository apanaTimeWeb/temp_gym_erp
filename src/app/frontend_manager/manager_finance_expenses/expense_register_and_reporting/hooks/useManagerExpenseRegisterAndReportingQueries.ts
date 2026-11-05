// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerExpenseRegisterAndReportingApi } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/api/manager_expense_register_and_reporting.api';
import { ManagerExpenseRegisterAndReportingQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/api/manager_expense_register_and_reporting.query_keys';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useExpensesListQuery.
 * @dependencies Uses ManagerExpenseRegisterAndReportingApi.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useExpensesListQuery owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useExpensesListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerExpenseRegisterAndReportingQueryKeys.list(params),
    queryFn: async () => { const response = await ManagerExpenseRegisterAndReportingApi.fetchExpenses(params); if (!response.success) throw new Error(response.message || 'Unable to load expenses'); return response.data; } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useExpensesStatsQuery owns the expenses feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useExpensesStatsQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerExpenseRegisterAndReportingQueryKeys.stats(params),
    queryFn: async () => { const response = await ManagerExpenseRegisterAndReportingApi.fetchExpenseStats(params); if (!response.success) throw new Error(response.message || 'Unable to load expense statistics'); return response.data; } });
}

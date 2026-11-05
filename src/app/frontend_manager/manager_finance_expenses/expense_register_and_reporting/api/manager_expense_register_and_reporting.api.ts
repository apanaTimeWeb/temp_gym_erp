import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_API } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { managerExpenseSchema, managerExpensesListResponseSchema, managerExpenseStatsSchema, managerExpenseDeleteResponseSchema } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/schemas/manager_expense_register_and_reporting.schemas';
import type { Expense, ExpenseStats } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';


/**
 * @description Provides the ManagerExpenseRegisterAndReportingApi implementation for the expenses module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_finance_expenses/manager_expenses_schemas/ManagerExpenseRegisterAndReportingSchema; @/app/frontend_manager/manager_finance_expenses/manager_expenses_url_config; @/app/frontend_manager/manager_finance_expenses/manager_expenses_types/ManagerExpenseRegisterAndReportingTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerExpenseRegisterAndReportingApi = {
  fetchExpenses: async (params?: Record<string, string>): Promise<ApiResponse<{ expenses: Expense[]; total: number; page: number; limit: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE}${query ? `?${query}` : ''}`, { dataSchema: managerExpensesListResponseSchema });
  },
  fetchExpenseById: async (id: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE(id), { dataSchema: managerExpenseSchema });
  },
  fetchExpenseStats: async (params?: Record<string, string>): Promise<ApiResponse<ExpenseStats>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: managerExpenseStatsSchema });
  },
  createExpense: async (body: Partial<Expense>, idempotencyKey: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseSchema });
  },
  updateExpense: async (id: string, body: Partial<Expense>, idempotencyKey: string): Promise<ApiResponse<Expense>> => {
    return apiFetch(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE(id), { method: 'PATCH', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseSchema });
  },
  deleteExpense: async (id: string, idempotencyKey: string): Promise<ApiResponse<{ id: string }>> => {
    return apiFetch(MANAGER_EXPENSE_REGISTER_AND_REPORTING_API.GET_ONE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerExpenseDeleteResponseSchema });
  } };

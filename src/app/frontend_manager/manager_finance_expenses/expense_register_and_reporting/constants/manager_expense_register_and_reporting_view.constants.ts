import type { ManagerExpenseRegisterAndReportingViewId } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';
export const MANAGER_EXPENSE_REGISTER_AND_REPORTING_VIEW_IDS = ['view-expenses', 'add-expense', 'expense-report'] as const satisfies readonly ManagerExpenseRegisterAndReportingViewId[];
export const MANAGER_EXPENSE_REGISTER_AND_REPORTING_DEFAULT_VIEW: ManagerExpenseRegisterAndReportingViewId = 'view-expenses';

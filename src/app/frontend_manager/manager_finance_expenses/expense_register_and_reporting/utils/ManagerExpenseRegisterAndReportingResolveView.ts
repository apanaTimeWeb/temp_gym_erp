// RESPONSIBILITY: Validates and resolves Expenses view identifiers.
import type { ManagerExpenseRegisterAndReportingViewId } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_DEFAULT_VIEW, MANAGER_EXPENSE_REGISTER_AND_REPORTING_VIEW_IDS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_view.constants';

export function resolveManagerExpenseRegisterAndReportingView(value: string | null | undefined): ManagerExpenseRegisterAndReportingViewId {
  return MANAGER_EXPENSE_REGISTER_AND_REPORTING_VIEW_IDS.includes(value as ManagerExpenseRegisterAndReportingViewId) ? value as ManagerExpenseRegisterAndReportingViewId : MANAGER_EXPENSE_REGISTER_AND_REPORTING_DEFAULT_VIEW;
}
